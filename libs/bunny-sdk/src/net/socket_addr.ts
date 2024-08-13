import { IPv4 } from "./ip";

export type SocketAddr = {
  readonly _tag: "SocketAddrV4",
  port: number,
  ip: IPv4,
};

/**
  * Returns the port number associated with this socket address.
  */
export function port(addr: SocketAddr): number {
  return addr.port;
}

/**
  * Returns the IP address associated with this socket address.
  */
export function ip(addr: SocketAddr): IPv4 {
  return addr.ip;
}
