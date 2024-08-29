import * as IP from "../ip.ts";

export type SocketAddrV4 = {
  readonly _tag: "SocketAddrV4",
  port: number,
  ip: IP.IPv4,
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
export function ip(addr: SocketAddrV4): IP.IPv4 {
  return addr.ip;
}

/**
 * Try to parse a SocketAddrV4
 */
export function tryFromString(value: string): SocketAddrV4 | SyntaxError {
  const parts = value.split(':');

  if (parts.length !== 2) {
    return new SyntaxError('Invalid SocketAddrV4 address');
  }

  const ip = IP.tryParseFromString(parts[0]);
  if (ip instanceof SyntaxError) {
    return ip;
  }
  const port = Number(parts[1]);
  if (isNaN(port) || port < 0 || port > 65535) {
    return new SyntaxError('Invalid Port');
  }

  return ({
    _tag: "SocketAddrV4",
    port,
    ip,
  })
}
