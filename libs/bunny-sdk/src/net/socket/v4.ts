import { IPv4 } from "../ip.ts";

export type SocketAddrV4 = {
  readonly _tag: "SocketAddrV4",
  port: number,
  ip: IPv4,
};

/**
  * Returns the port number associated with this socket address.
  */
export function port(addr: SocketAddrV4): number {
  return addr.port;
}

/**
  * Returns the IP address associated with this socket address.
  */
export function ip(addr: SocketAddrV4): IPv4 {
  return addr.ip;
}
