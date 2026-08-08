import { EvmDecoder, TOPIC0_MAP } from '../indexer/EvmDecoder';
import { SolanaDecoder, SOLANA_PROGRAMS } from '../indexer/SolanaDecoder';
import { pgDatabase } from '../services/pgDatabaseService';

export function runIndexerTestSuite(): { passed: number; failed: number; results: string[] } {
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

  // Test 1: Decode ERC20 Transfer
  test('EvmDecoder should decode ERC20 Transfer event', () => {
    const mockLog = {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', // USDC
      topics: [
        TOPIC0_MAP.ERC20_TRANSFER,
        '0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
        '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d'
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000005f5e100' // 100 USDC (6 decimals)
    };

    const decoded = EvmDecoder.decodeLog(mockLog);
    return decoded.eventType === 'TOKEN_TRANSFER' && decoded.details.tokenAddress === mockLog.address;
  });

  // Test 2: Decode ERC721 NFT Transfer
  test('EvmDecoder should decode ERC721 NFT Transfer event', () => {
    const mockNftLog = {
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', // BAYC
      topics: [
        TOPIC0_MAP.ERC721_TRANSFER,
        '0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
        '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d',
        '0x00000000000000000000000000000000000000000000000000000000000004d2' // Token #1234
      ],
      data: '0x'
    };

    const decoded = EvmDecoder.decodeLog(mockNftLog);
    return decoded.eventType === 'NFT_TRANSFER' && decoded.details.tokenId === '1234';
  });

  // Test 3: Decode Unlimited ERC20 Approval
  test('EvmDecoder should detect and flag unlimited spender approval', () => {
    const mockApprovalLog = {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
      topics: [
        TOPIC0_MAP.ERC20_APPROVAL,
        '0x000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7',
        '0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d'
      ],
      data: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' // Max Uint256
    };

    const decoded = EvmDecoder.decodeLog(mockApprovalLog);
    return decoded.eventType === 'APPROVAL' && decoded.details.isUnlimited === true && decoded.details.riskScore >= 70;
  });

  // Test 4: Decode Solana Raydium Swap
  test('SolanaDecoder should decode Raydium Pool instructions', () => {
    const mockSolanaTx = {
      transaction: {
        message: {
          accountKeys: [
            'Trader1111111111111111111111111111111111111',
            'Pool222222222222222222222222222222222222222',
            SOLANA_PROGRAMS.RAYDIUM_V4
          ],
          instructions: [
            {
              programIdIndex: 2,
              accounts: [0, 1]
            }
          ]
        }
      }
    };

    const decoded = SolanaDecoder.decodeTransaction(mockSolanaTx);
    return decoded.length === 1 && decoded[0].type === 'RAYDIUM_SWAP';
  });

  // Test 5: PostgreSQL Database Persistence
  test('pgDatabase should persist and retrieve indexed blocks correctly', () => {
    const blockNum = Math.floor(Math.random() * 1000000);
    pgDatabase.saveBlock({
      id: `test-blk-${blockNum}`,
      chainId: '1',
      chainName: 'Ethereum',
      blockNumber: blockNum,
      blockHash: `0xhash-${blockNum}`,
      timestamp: new Date().toLocaleTimeString(),
      txCount: 150,
      gasUsedGwei: 15.2
    });

    const blocks = pgDatabase.getLatestBlocks(5);
    return blocks.some(b => b.blockNumber === blockNum);
  });

  return { passed, failed, results };
}
