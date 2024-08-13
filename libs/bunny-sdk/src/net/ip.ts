type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>> | T

export type IPv4 = [Range<0, 255>, Range<0, 255>, Range<0, 255>, Range<0, 255>];

export function toString(ip: IPv4): string {
  return `${ip[0]}.${ip[1]}.${ip[2]}.${ip[3]}`;
}
