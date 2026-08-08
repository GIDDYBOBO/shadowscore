// Topic0 Signatures for EVM Log Parsing
export const TOPIC0_MAP = {
  ERC20_TRANSFER: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  ERC20_APPROVAL: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
  ERC721_TRANSFER: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
  ERC1155_TRANSFER_SINGLE: '0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62',
  UNISWAP_V3_SWAP: '0xc42079f94a6350d7e6235f29174924f9d5fb2dfc5b2b1e1873737ec37ecb7e35',
  UNISWAP_V2_SWAP: '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
  UNISWAP_V3_MINT: '0x7a530802941e48c4fb64bd372c14c380b234ea0d1abb33d217e3a95568e9c64e',
  STARGATE_SWAP_REMOTE: '0x34660fc8af304464529f48619fa20a64349df7e543802b9f334d3b1e63f7ebd0'
};

export interface DecodedEvmLog {
  eventType: 'TOKEN_TRANSFER' | 'APPROVAL' | 'NFT_TRANSFER' | 'DEX_SWAP' | 'LIQUIDITY_ADD' | 'BRIDGE_TX' | 'UNKNOWN';
  details: any;
}

export class EvmDecoder {
  public static decodeLog(log: { address: string; topics: string[]; data: string }): DecodedEvmLog {
    if (!log.topics || log.topics.length === 0) {
      return { eventType: 'UNKNOWN', details: null };
    }

    const topic0 = log.topics[0].toLowerCase();

    // 1. ERC-20 / ERC-721 Transfer
    if (topic0 === TOPIC0_MAP.ERC20_TRANSFER) {
      if (log.topics.length === 4) {
        // ERC-721 Transfer (from, to, tokenId are 3 indexed topics)
        const from = this.cleanAddress(log.topics[1]);
        const to = this.cleanAddress(log.topics[2]);
        const tokenId = BigInt(log.topics[3]).toString();
        return {
          eventType: 'NFT_TRANSFER',
          details: { contractAddress: log.address, from, to, tokenId, tokenType: 'ERC721' }
        };
      } else if (log.topics.length === 3) {
        // ERC-20 Transfer (from, to indexed, value in data)
        const from = this.cleanAddress(log.topics[1]);
        const to = this.cleanAddress(log.topics[2]);
        const rawAmount = log.data && log.data !== '0x' ? BigInt(log.data).toString() : '0';
        return {
          eventType: 'TOKEN_TRANSFER',
          details: { tokenAddress: log.address, from, to, rawAmount }
        };
      }
    }

    // 2. ERC-20 Approval Event
    if (topic0 === TOPIC0_MAP.ERC20_APPROVAL) {
      const owner = this.cleanAddress(log.topics[1]);
      const spender = this.cleanAddress(log.topics[2]);
      const rawAmount = log.data && log.data !== '0x' ? BigInt(log.data).toString() : '0';
      const isUnlimited = BigInt(rawAmount) >= BigInt('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff') / 2n;

      return {
        eventType: 'APPROVAL',
        details: {
          tokenAddress: log.address,
          owner,
          spender,
          allowanceAmount: isUnlimited ? 'UNLIMITED' : rawAmount,
          isUnlimited,
          riskScore: isUnlimited ? 75 : 15
        }
      };
    }

    // 3. Uniswap V3 / Aerodrome Swap Event
    if (topic0 === TOPIC0_MAP.UNISWAP_V3_SWAP) {
      const sender = this.cleanAddress(log.topics[1]);
      const recipient = this.cleanAddress(log.topics[2]);
      return {
        eventType: 'DEX_SWAP',
        details: {
          dexName: 'Uniswap v3',
          poolAddress: log.address,
          sender,
          recipient
        }
      };
    }

    // 4. Stargate Cross-Chain Bridge Event
    if (topic0 === TOPIC0_MAP.STARGATE_SWAP_REMOTE) {
      return {
        eventType: 'BRIDGE_TX',
        details: {
          bridgeName: 'Stargate v2',
          contractAddress: log.address
        }
      };
    }

    return { eventType: 'UNKNOWN', details: null };
  }

  private static cleanAddress(topic: string): string {
    if (!topic || topic.length < 66) return '0x0000000000000000000000000000000000000000';
    return '0x' + topic.slice(26).toLowerCase();
  }
}
