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

function is_port_and_hostname(value: unknown): value is { port: number; hostname: string; } {
  if (typeof value === "object" && value !== null) {
    const port = value["port"];
    return port !== undefined && typeof port === "number" && value["hostname"] !== undefined;
  }

  return false;
}

function serve(handler: ServerHandler): ServeHandler;
function serve(listener: { port: number; hostname: string; }, handler: ServerHandler): ServeHandler;
function serve(listener: TcpListener, handler: ServerHandler): ServeHandler;
function serve(listener: ServerHandler | { port: number; hostname: string; } | TcpListener, handler?: ServerHandler): ServeHandler {
  let raw_handler: ServerHandler | undefined;
  let raw_listener: TcpListener;

  if (is_port_and_hostname(listener)) {
    const addr = SocketAddr.v4.tryFromString(`${listener.hostname}:${listener.port}`);
    if (addr instanceof Error) {
      throw addr;
    }
    raw_listener = Tcp.bind(addr);
    raw_handler = handler;
  } else if (Tcp.isTcpListener(listener)) {
    raw_handler = handler;
    raw_listener = listener;
  } else {
    raw_handler = listener;
    raw_listener = Tcp.unstable_new();
  }

  if (raw_handler === undefined) {
    throw new Error("An issue happened.");
  }

  const platform = internal_getPlatform();

  switch (platform.runtime) {
    case "bunny": {
      Bunny.v1.serve(raw_handler);
      return {};
    }
    case "node": {
      return NodeImpl.node_serve(raw_listener, raw_handler);
    }

    case "deno": {
      const addr = Tcp.unstable_local_addr(raw_listener);

      if (!SocketAddr.isV4(addr)) {
        throw new Error("An issue happened with the addr.");
      }

      const port = SocketAddr.v4.port(addr);
      const hostname = Ip.toString(SocketAddr.v4.ip(addr));

      Deno.serve({ port, hostname }, raw_handler);
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
