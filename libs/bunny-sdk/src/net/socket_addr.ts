import * as v4 from './socket/v4.ts';

export * as v4 from './socket/v4.ts';

export type NoAddr = {
  readonly _tag: "NoAddr",
};

export type SocketAddr = v4.SocketAddrV4 | NoAddr;

/**
 * Tell if it's a v4 [SocketAddr].
 */
export function isV4(value: SocketAddr): value is v4.SocketAddrV4 {
  return value._tag === "SocketAddrV4";
}

export type SocketAddrError = InvalidAddr;

const addr_symbol: symbol = Symbol("invalidAddr");
export class InvalidAddr extends Error {
  _guard: typeof addr_symbol = addr_symbol;

  constructor(message: string) {
    super(message);
    this.name = "InvalidAddr";
  }

  override toString() {
    return `${this.name}: ${this.message}`;
  }
}
