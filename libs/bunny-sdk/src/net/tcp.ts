import * as SocketAddr from "./socket_addr.ts";

export type TcpListener = {
  /**
   * Prevent the construction
   * @internal
   */
  readonly _tag: 'TcpListener';
  addr: SocketAddr.SocketAddr;
}

export function isTcpListener(value: unknown): value is TcpListener {
  return value instanceof Object && value["_tag"] === "TcpListener";
}

/**
  * Returns the local socket address of this listener.
  */
export function unstable_local_addr(tcp: TcpListener): SocketAddr.SocketAddr {
  return tcp.addr;
}

/**
  * Create a new [TcpListener].
  */
export function unstable_new(): TcpListener {
  return ({
    _tag: 'TcpListener',
    addr: {
      _tag: "SocketAddrV4",
      port: 8080,
      ip: [127, 0, 0, 1],
    },
  })
}

