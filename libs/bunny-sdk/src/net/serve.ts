import { internal_getPlatform } from "../platform.ts";
import * as NodeImpl from "./_impl/node/serve.ts";
import { TcpListener } from "./tcp.ts";
import * as Tcp from "./tcp.ts";
import * as Ip from "./ip.ts";
import * as SocketAddr from './socket_addr.ts';

/**
 * A handler for HTTP Requests.
 * Consumes a request and return a response.
 */
type ServerHandler = (request: Request) => Response | Promise<Response>;

type ServeHandler = {} & unknown;

/**
 * Serves HTTP requests on the given [TcpListener]
 */
function serve(listener: { port: number; hostname: string; }, handler: ServerHandler): ServeHandler;
function serve(listener: TcpListener, handler: ServerHandler): ServeHandler;
function serve(listener: TcpListener | { port: number; hostname: string; }, handler: ServerHandler): ServeHandler {
  const platform = internal_getPlatform();

  const listenerUnion = Tcp.isTcpListener(listener) ? listener : Tcp.unstable_new();

  switch (platform.runtime) {
    case "bunny": {
      Bunny.v1.serve(handler);
      return {};
    }
    case "node": {
      return NodeImpl.node_serve(listenerUnion, handler);
    }

    case "deno": {
      const addr = Tcp.unstable_local_addr(listenerUnion);

      if (!SocketAddr.isV4(addr)) {
        throw new Error("An issue happened with the addr.");
      }

      const port = SocketAddr.v4.port(addr);
      const hostname = Ip.toString(SocketAddr.v4.ip(addr));

      Deno.serve({ port, hostname }, handler);
      return {};
    }
    case "unknown": {
      return {};
    }
  }
}

export {
  serve,
  ServeHandler,
  ServerHandler,
}
