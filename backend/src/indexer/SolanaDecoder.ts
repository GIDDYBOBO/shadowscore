export interface DecodedSolanaInstruction {
  program: string;
  type: 'SPL_TRANSFER' | 'RAYDIUM_SWAP' | 'METAPLEX_NFT' | 'SYSTEM_TRANSFER' | 'UNKNOWN';
  details: any;
}

export const SOLANA_PROGRAMS = {
  SYSTEM_PROGRAM: '11111111111111111111111111111111',
  TOKEN_PROGRAM: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  RAYDIUM_V4: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8',
  METAPLEX_TOKEN_METADATA: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
};

export class SolanaDecoder {
  public static decodeTransaction(tx: any): DecodedSolanaInstruction[] {
    const instructions: DecodedSolanaInstruction[] = [];
    if (!tx || !tx.transaction || !tx.transaction.message) return instructions;

    const accountKeys = tx.transaction.message.accountKeys || [];
    const rawInstructions = tx.transaction.message.instructions || [];

    for (const inst of rawInstructions) {
      const programId = typeof inst.programIdIndex === 'number' ? accountKeys[inst.programIdIndex] : inst.programId;

      // 1. Raydium Swap
      if (programId === SOLANA_PROGRAMS.RAYDIUM_V4) {
        instructions.push({
          program: 'Raydium Liquidity Pool V4',
          type: 'RAYDIUM_SWAP',
          details: {
            programId,
            poolAddress: accountKeys[inst.accounts?.[1]] || 'Raydium Pool',
            signer: accountKeys[inst.accounts?.[0]] || 'Solana Trader'
          }
        });
      }
      // 2. SPL Token Program
      else if (programId === SOLANA_PROGRAMS.TOKEN_PROGRAM) {
        instructions.push({
          program: 'SPL Token Program',
          type: 'SPL_TRANSFER',
          details: {
            sourceAccount: accountKeys[inst.accounts?.[0]],
            destAccount: accountKeys[inst.accounts?.[1]],
            owner: accountKeys[inst.accounts?.[2]]
          }
        });
      }
      // 3. Metaplex Token Metadata
      else if (programId === SOLANA_PROGRAMS.METAPLEX_TOKEN_METADATA) {
        instructions.push({
          program: 'Metaplex NFT Program',
          type: 'METAPLEX_NFT',
          details: {
            mintAddress: accountKeys[inst.accounts?.[1]]
          }
        });
      }
      // 4. Native SOL transfer
      else if (programId === SOLANA_PROGRAMS.SYSTEM_PROGRAM) {
        instructions.push({
          program: 'System Program',
          type: 'SYSTEM_TRANSFER',
          details: {
            from: accountKeys[inst.accounts?.[0]],
            to: accountKeys[inst.accounts?.[1]]
          }
        });
      }
    }

    return instructions;
  }
}
