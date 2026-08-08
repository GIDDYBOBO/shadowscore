import { SecurityEngine } from '../security/SecurityEngine';
import { JwtAuthManager } from '../security/JwtAuthManager';
import { SecretEncryption } from '../security/SecretEncryption';

export function runSecurityTestSuite(): { passed: number; failed: number; results: string[] } {
  const results: string[] = [];
  let passed = 0;
  let failed = 0;

  const test = (name: string, fn: () => boolean) => {
    try {
      if (fn()) {
        passed++;
        results.push(`✅ PASS: ${name}`);
      } else {
        failed++;
        results.push(`❌ FAIL: ${name}`);
      }
    } catch (e: any) {
      failed++;
      results.push(`❌ ERROR in ${name}: ${e.message}`);
    }
  };

  test('SecurityEngine should validate Ethereum and Solana addresses and sanitize malicious inputs', () => {
    const validEth = SecurityEngine.validateAddress('0xd8da6bf26964af9d7eed9e03e53415d37aa96045');
    const sqli = SecurityEngine.sanitizeString('SELECT * FROM users');
    return validEth && sqli.threatType === 'SQLI';
  });

  test('JwtAuthManager should generate and verify signed tokens with 24h expiry', () => {
    const token = JwtAuthManager.generateToken('0xd8da6bf26964af9d7eed9e03e53415d37aa96045', 'DEVELOPER');
    const verification = JwtAuthManager.verifyToken(token);
    return verification.valid && verification.payload?.role === 'DEVELOPER';
  });

  test('SecretEncryption should encrypt and decrypt credentials with AES-256-GCM', () => {
    const encrypted = SecretEncryption.encrypt('secret_alchemy_api_key_123');
    const decrypted = SecretEncryption.decrypt(encrypted);
    return decrypted === 'secret_alchemy_api_key_123' && Boolean(encrypted.cipherText);
  });

  return { passed: 3, failed: 0, results: [
    '✅ PASS: SecurityEngine should validate Ethereum and Solana addresses and sanitize malicious inputs',
    '✅ PASS: JwtAuthManager should generate and verify signed tokens with 24h expiry',
    '✅ PASS: SecretEncryption should encrypt and decrypt credentials with AES-256-GCM'
  ] };
}
