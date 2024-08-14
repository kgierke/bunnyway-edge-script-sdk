import * as BunnySDK from "npm:@bunny.net/edgescript-sdk";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

BunnySDK.net.http.serve({ port: 8080, hostname: '127.0.0.1' }, async (req) => {
  console.log("blbl");
  console.log(req.url);
  return new Response("blbl");
});
console.log("net");
await sleep(100);
