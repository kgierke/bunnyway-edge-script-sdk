import * as Tcp from "../../tcp";
import * as Ip from "../../ip";
import { ServeHandler, ServerHandler } from "../../serve";
import * as HonoNode from "@hono/node-server";
import { Hono } from "hono";
import * as SocketAddr from "../../socket_addr";

export function node_serve(listener: Tcp.TcpListener, handler: ServerHandler): ServeHandler {
  const addr = Tcp.unstable_local_addr(listener);
  const port = SocketAddr.port(addr);
  const hostname = Ip.toString(SocketAddr.ip(addr));

  const app = new Hono();
  app.all((c) => {
    return handler(c.req.raw);
  })

  HonoNode.serve({
    fetch: app.fetch, hostname, port
  });
  return ({});
}
