/**
 * Networking Primitives for the IP Address.
 *
 * @packageDocumentation
 */

export type Enumerate<N extends number, Acc extends number[] = []> =
  Acc["length"] extends N ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

export type Range<F extends number, T extends number> =
  | Exclude<Enumerate<T>, Enumerate<F>>
  | T;

/**
 * An IPv4 Address
 */
export type IPv4 = [Range<0, 255>, Range<0, 255>, Range<0, 255>, Range<0, 255>];

export function toString(ip: IPv4): string {
  return `${ip[0]}.${ip[1]}.${ip[2]}.${ip[3]}`;
}

/**
 * Try to parse na IP
 */
export function tryParseFromString(ip: string): IPv4 | SyntaxError {
  const parts = ip.split(".").map(Number);
  if (
    parts.length !== 4 ||
    parts.some((part) => isNaN(part) || part < 0 || part > 255)
  ) {
    return new SyntaxError("Invalid IP address");
  }
  return [parts[0], parts[1], parts[2], parts[3]] as IPv4;
}
