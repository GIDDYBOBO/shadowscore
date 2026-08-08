export interface CursorResult<T> {
  data: T[];
  nextCursor: string | null;
  hasNextPage: boolean;
  totalReturned: number;
}

export class CursorPagination {
  public static encodeCursor(value: { id: string; timestamp: string }): string {
    return Buffer.from(JSON.stringify(value)).toString('base64');
  }

  public static decodeCursor(cursorStr: string): { id: string; timestamp: string } | null {
    try {
      const decoded = Buffer.from(cursorStr, 'base64').toString('utf-8');
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }

  public static paginateArray<T extends { id: string; timestamp: string }>(
    items: T[],
    limit: number = 25,
    cursor?: string
  ): CursorResult<T> {
    let startIndex = 0;
    if (cursor) {
      const decoded = this.decodeCursor(cursor);
      if (decoded) {
        const found = items.findIndex((i) => i.id === decoded.id);
        if (found !== -1) startIndex = found + 1;
      }
    }

    const data = items.slice(startIndex, startIndex + limit);
    const hasNextPage = startIndex + limit < items.length;
    const nextCursor = hasNextPage && data.length > 0
      ? this.encodeCursor({ id: data[data.length - 1].id, timestamp: data[data.length - 1].timestamp })
      : null;

    return {
      data,
      nextCursor,
      hasNextPage,
      totalReturned: data.length
    };
  }
}
