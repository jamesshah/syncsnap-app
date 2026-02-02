import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import {
  api_keys_table,
  projects_table,
  type ApiKey,
} from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from "node:crypto";
import { env } from "~/env";

/**
 * Decrypts an encrypted API key
 * @param encryptedData - Format: "iv:encryptedData:authTag" (all base64 encoded)
 * @returns The decrypted API key, or null if decryption fails
 */
function decryptApiKey(encryptedData: string): string | null {
  try {
    // Parse the encrypted data format: iv:encryptedData:authTag
    const parts = encryptedData.split(":");
    if (parts.length !== 3) {
      // Might be an old hash format, return null to indicate decryption failed
      return null;
    }

    const [ivBase64, encryptedBase64, authTagBase64] = parts;

    // Ensure all parts exist
    if (!ivBase64 || !encryptedBase64 || !authTagBase64) {
      return null;
    }

    // Decode from base64
    const iv = Buffer.from(ivBase64, "base64");
    const encrypted = Buffer.from(encryptedBase64, "base64");
    const authTag = Buffer.from(authTagBase64, "base64");

    // Derive the same 32-byte key from the encryption key
    const encryptionKey = createHash("sha256")
      .update(String(env.ENCRYPTION_KEY))
      .digest();

    // Create decipher and decrypt
    const decipher = createDecipheriv("aes-256-gcm", encryptionKey, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted, undefined, "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch {
    // Decryption failed (might be old hash format or corrupted data)
    return null;
  }
}

export const apiKeysRouter = createTRPCRouter({
  createApiKey: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation<string>(async ({ ctx, input }) => {
      const { userId } = ctx.auth;

      const { name, projectId } = input;

      const project = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.userId, userId),
            eq(projects_table.publicId, projectId),
          ),
        );

      if (!project || project.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const { encryptedData } = createAndEncryptApiKey();
      const newApiKeyId = nanoid(10);

      // create a new api key
      await ctx.db.insert(api_keys_table).values({
        id: newApiKeyId,
        name,
        projectId,
        privateKey: encryptedData,
      });

      return newApiKeyId;
    }),

  getApiKeysByProjectId: protectedProcedure
    .input(z.string())
    .query<ApiKey[]>(async ({ ctx, input }) => {
      const projectId = input;

      const apiKeys = await ctx.db
        .select()
        .from(api_keys_table)
        .where(
          and(
            eq(api_keys_table.projectId, projectId),
            eq(api_keys_table.isDeleted, false),
          ),
        );

      if (!apiKeys) {
        return [];
      }

      // Decrypt the private keys
      return apiKeys.map((key) => {
        const decryptedKey = decryptApiKey(key.privateKey);
        return {
          ...key,
          privateKey: decryptedKey ?? key.privateKey, // Fallback to original if decryption fails
        };
      });
    }),

  rollApiKey: protectedProcedure
    .input(
      z.object({
        apiKeyId: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation<string>(async ({ ctx, input }) => {
      const { userId } = ctx.auth;

      const project = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.userId, userId),
            eq(projects_table.publicId, input.projectId),
          ),
        );

      if (!project || project.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      const [existingKey] = await ctx.db
        .select()
        .from(api_keys_table)
        .where(
          and(
            eq(api_keys_table.id, input.apiKeyId),
            eq(api_keys_table.projectId, input.projectId),
            eq(api_keys_table.isDeleted, false),
          ),
        );

      if (!existingKey) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "API key not found",
        });
      }

      const { secretKey, encryptedData } = createAndEncryptApiKey();

      await ctx.db
        .update(api_keys_table)
        .set({
          privateKey: encryptedData,
          updatedAt: new Date(),
        })
        .where(eq(api_keys_table.id, input.apiKeyId));

      return secretKey;
    }),

  deleteApiKey: protectedProcedure
    .input(
      z.object({
        apiKeyId: z.string(),
        projectId: z.string(),
      }),
    )
    .mutation<void>(async ({ ctx, input }) => {
      const { userId } = ctx.auth;

      const project = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.userId, userId),
            eq(projects_table.publicId, input.projectId),
          ),
        );

      if (!project || project.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      await ctx.db
        .update(api_keys_table)
        .set({
          isDeleted: true,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(api_keys_table.id, input.apiKeyId),
            eq(api_keys_table.projectId, input.projectId),
          ),
        );
    }),
});

/**
 * Creates a new API key and encrypts it for storage.
 * @returns Object with the plain secret key (for one-time display) and encrypted data (for DB storage)
 */
function createAndEncryptApiKey(): {
  secretKey: string;
  encryptedData: string;
} {
  const secretKey = `sk_live_${nanoid(32)}`;

  const encryptionKey = createHash("sha256")
    .update(String(env.ENCRYPTION_KEY))
    .digest();
  const iv = randomBytes(16);

  const cipher = createCipheriv("aes-256-gcm", encryptionKey, iv);
  let encryptedSecretKey = cipher.update(secretKey, "utf8", "base64");
  encryptedSecretKey += cipher.final("base64");
  const authTag = cipher.getAuthTag();

  const encryptedData = `${iv.toString("base64")}:${encryptedSecretKey}:${authTag.toString("base64")}`;

  return { secretKey, encryptedData };
}
