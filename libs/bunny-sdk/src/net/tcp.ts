import { internal_getPlatform } from "../platform.ts";
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
  * Format the associated [TcpListener] to a String
  */
export function toString(tcp: TcpListener): string {
  switch (tcp.addr._tag) {
    case "SocketAddrV4":
      return `${SocketAddr.ip(tcp.addr).join('.')}:${SocketAddr.port(tcp.addr)}`;
    case "NoAddr":
      return "No addr associated to this listener. You should be running in a controlled environment.";
  }
}

/**
  * Create a new [TcpListener].
  */
export function unstable_new(): TcpListener {
  const platform = internal_getPlatform();
  switch (platform.runtime) {
    case "bunny": {
      return ({
        _tag: "TcpListener",
        addr: {
          _tag: "NoAddr"
        }
      });
    }
    default:
      return ({
        _tag: 'TcpListener',
        addr: {
          _tag: "SocketAddrV4",
          port: 8080,
          ip: [127, 0, 0, 1],
        },
      });

  }
}

