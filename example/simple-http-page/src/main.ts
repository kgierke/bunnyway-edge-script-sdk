import * as BunnySDK from "@bunny.net/edgescript-sdk";

console.log("Starting server...");
BunnySDK.net.http.serve({ port: 8080, hostname: '127.0.0.1' }, async (_) => {
  return new Response("blbl");
});
