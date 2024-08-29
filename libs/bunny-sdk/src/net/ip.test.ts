import * as IP from "./ip.ts";

test('toString should convert IPv4 tuple to string', () => {
  const ip: IP.IPv4 = [192, 168, 1, 1];
  expect(IP.toString(ip)).toBe('192.168.1.1');
});

test('tryParseFromString should parse valid IP string', () => {
  const ipString = '192.168.1.1';
  const expected: IP.IPv4 = [192, 168, 1, 1];
  expect(IP.tryParseFromString(ipString)).toEqual(expected);
});

test('tryParseFromString should return SyntaxError for invalid IP string', () => {
  const invalidIpString = '999.999.999.999';
  expect(IP.tryParseFromString(invalidIpString)).toBeInstanceOf(SyntaxError);
});

test('tryParseFromString should return SyntaxError for non-numeric IP string', () => {
  const invalidIpString = 'abc.def.ghi.jkl';
  expect(IP.tryParseFromString(invalidIpString)).toBeInstanceOf(SyntaxError);
});

test('tryParseFromString should return SyntaxError for incomplete IP string', () => {
  const invalidIpString = '192.168.1';
  expect(IP.tryParseFromString(invalidIpString)).toBeInstanceOf(SyntaxError);
});
