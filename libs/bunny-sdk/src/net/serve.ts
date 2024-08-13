import { internal_getPlatform } from "../platform";
import * as NodeImpl from "./_impl/node/serve";
import { TcpListener } from "./tcp";
import * as Tcp from "./tcp";
import * as Ip from "./ip";
import * as SocketAddr from './socket_addr';

/**
 * A handler for HTTP Requests.
 * Consumes a request and return a response.
 */
type ServerHandler = (request: Request) => Response | Promise<Response>;

type ServeHandler = {};

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
      const port = SocketAddr.port(addr);
      const hostname = Ip.toString(SocketAddr.ip(addr));

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
