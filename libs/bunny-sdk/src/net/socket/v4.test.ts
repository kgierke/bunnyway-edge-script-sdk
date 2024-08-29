import { SocketAddrV4, port, tryFromString, ip } from './v4.ts';

describe('SocketAddrV4', () => {
  describe('port', () => {
    it('should return the port number', () => {
      const addr: SocketAddrV4 = { _tag: "SocketAddrV4", port: 8080, ip: [127, 0, 0, 1] };
      expect(port(addr)).toBe(8080);
    });
  });

  describe('ip', () => {
    it('should return the IP address', () => {
      const addr: SocketAddrV4 = { _tag: "SocketAddrV4", port: 8080, ip: [127, 0, 0, 1] };
      expect(ip(addr)).toStrictEqual([127, 0, 0, 1]);
    });
  });

  describe('tryFromString', () => {
    it('should parse a valid SocketAddrV4 string', () => {
      const result = tryFromString("127.0.0.1:8080");
      expect(result).toEqual({ _tag: "SocketAddrV4", port: 8080, ip: [127, 0, 0, 1] });
    });

    it('should return a SyntaxError for an invalid IP', () => {
      const result = tryFromString("invalid_ip:8080");
      expect(result).toBeInstanceOf(SyntaxError);
      expect((result as SyntaxError).message).toBe('Invalid IP address');
    });

    it('should return a SyntaxError for an invalid port', () => {
      const result = tryFromString("127.0.0.1:invalid_port");
      expect(result).toBeInstanceOf(SyntaxError);
      expect((result as SyntaxError).message).toBe('Invalid Port');
    });

    it('should return a SyntaxError for a port out of range', () => {
      const result = tryFromString("127.0.0.1:70000");
      expect(result).toBeInstanceOf(SyntaxError);
      expect((result as SyntaxError).message).toBe('Invalid Port');
    });

    it('should return a SyntaxError for an invalid format', () => {
      const result = tryFromString("127.0.0.1-8080");
      expect(result).toBeInstanceOf(SyntaxError);
      expect((result as SyntaxError).message).toBe('Invalid SocketAddrV4 address');
    });
  });
});
