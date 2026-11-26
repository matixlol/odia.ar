import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const env = import.meta.env;

export const bucketName = env.AWS_S3_BUCKET_NAME;

export const storageConfigured = Boolean(
  env.AWS_ENDPOINT_URL &&
    env.AWS_ACCESS_KEY_ID &&
    env.AWS_SECRET_ACCESS_KEY &&
    bucketName,
);

export const storage = new S3Client({
  endpoint: env.AWS_ENDPOINT_URL,
  region: env.AWS_DEFAULT_REGION || "auto",
  forcePathStyle: env.AWS_S3_URL_STYLE === "path",
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID || "missing",
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || "missing",
  },
});

export async function listFiles() {
  const result = await storage.send(
    new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: "uploads/",
      MaxKeys: 100,
    }),
  );

  return (result.Contents ?? [])
    .filter(
      (file): file is typeof file & { Key: string } => Boolean(file.Key),
    )
    .sort(
      (a, b) =>
        (b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0),
    );
}

export async function createUploadUrl(
  key: string,
  contentType: string,
) {
  return getSignedUrl(
    storage,
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 10 * 60 },
  );
}

export async function createDownloadUrl(key: string) {
  return getSignedUrl(
    storage,
    new GetObjectCommand({ Bucket: bucketName, Key: key }),
    { expiresIn: 60 * 60 },
  );
}

export async function deleteFile(key: string) {
  await storage.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
}

export function publicFilePath(key: string) {
  return `/files/${key.split("/").map(encodeURIComponent).join("/")}`;
}
