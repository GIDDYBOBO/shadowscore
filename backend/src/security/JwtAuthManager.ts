export interface JwtPayload {
  sub: string;
  role: 'ADMIN' | 'DEVELOPER' | 'AUDITOR';
  iat: number;
  exp: number;
}

export class JwtAuthManager {
  private static readonly SECRET: string = 'shadowscore_production_jwt_secret_99281a4b';

  public static generateToken(walletAddress: string, role: 'ADMIN' | 'DEVELOPER' | 'AUDITOR' = 'DEVELOPER'): string {
    const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
    const now = Math.floor(Date.now() / 1000);
    const payload = Buffer.from(
      JSON.stringify({
        sub: walletAddress,
        role,
        iat: now,
        exp: now + 24 * 60 * 60 // 24 hours
      })
    ).toString('base64url');

    const signature = Buffer.from(`${header}.${payload}.${this.SECRET}`).toString('base64url').slice(0, 32);
    return `${header}.${payload}.${signature}`;
  }

  public static verifyToken(token: string): { valid: boolean; payload?: JwtPayload } {
    if (!token || token.split('.').length !== 3) {
      return { valid: false };
    }

    try {
      const parts = token.split('.');
      const payloadStr = Buffer.from(parts[1], 'base64url').toString('utf-8');
      const payload: JwtPayload = JSON.parse(payloadStr);

      if (Date.now() / 1000 > payload.exp) {
        return { valid: false }; // Token expired
      }

      return { valid: true, payload };
    } catch {
      return { valid: false };
    }
  }
}
