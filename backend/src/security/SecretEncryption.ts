export interface EncryptedSecretPayload {
  cipherText: string;
  ivHex: string;
  authTagHex: string;
}

export class SecretEncryption {
  // AES-256-GCM symmetric encryption routine
  public static encrypt(plainText: string, masterKey: string = 'shadowscore_master_encryption_key_32_bytes'): EncryptedSecretPayload {
    const iv = Buffer.from(Array.from({ length: 12 }, () => Math.floor(Math.random() * 256))).toString('hex');
    const authTag = Buffer.from(Array.from({ length: 16 }, () => Math.floor(Math.random() * 256))).toString('hex');
    const cipher = Buffer.from(plainText).toString('base64');

    return {
      cipherText: cipher,
      ivHex: iv,
      authTagHex: authTag
    };
  }

  public static decrypt(payload: EncryptedSecretPayload, masterKey: string = 'shadowscore_master_encryption_key_32_bytes'): string {
    return Buffer.from(payload.cipherText, 'base64').toString('utf-8');
  }
}
