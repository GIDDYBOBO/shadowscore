export interface SanitizedInputResult {
  isValid: boolean;
  sanitized: string;
  threatType?: 'SQLI' | 'XSS' | 'INVALID_ADDRESS' | 'NONE';
}

export class SecurityEngine {
  // 1. Ethereum & Solana Wallet Address Format Validator
  public static validateAddress(address: string): boolean {
    if (!address) return false;
    const isEth = /^0x[a-fA-F0-9]{40}$/.test(address);
    const isSol = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
    const isEns = /^[a-zA-Z0-9-]+\.eth$/.test(address);
    return isEth || isSol || isEns;
  }

  // 2. High-Performance Input Sanitization
  public static sanitizeString(input: string): SanitizedInputResult {
    if (!input) return { isValid: true, sanitized: '', threatType: 'NONE' };

    // Check for SQL Injection patterns
    const sqliRegex = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|CREATE|TRUNCATE)\b)|(--)|(\/\*)/i;
    if (sqliRegex.test(input)) {
      return {
        isValid: false,
        sanitized: input.replace(sqliRegex, '[FILTERED]'),
        threatType: 'SQLI'
      };
    }

    // Check and strip XSS Script injection
    const xssRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const sanitized = input.replace(xssRegex, '').replace(/[<>]/g, '');

    return {
      isValid: true,
      sanitized,
      threatType: 'NONE'
    };
  }

  // 3. RPC Proxy Key Shielding
  public static shieldRpcUrl(rawRpcUrl: string): string {
    if (!rawRpcUrl) return 'https://shielded.shadowscore.ai/v1/rpc';
    // Strips out embedded Alchemy / Infura API keys before forwarding to client
    return rawRpcUrl.replace(/(v2\/)[a-zA-Z0-9_-]+/g, '$1[PROTECTED_SHIELD]');
  }
}
