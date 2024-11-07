# @bunny.net/edge-script-sdk
---

The `@bunny.net/edge-script-sdk` library gives you functions and tools you can
leverage to build scripts and middleware. Those functions are optimized to be
able to run in our Bunny.net Network, but you can also use them to build your
scripts and run it locally with `Node` or `Deno`.

## Usage

With `@bunny.net/edgescript-sdk` you can write a script which will work with
Deno, with Node, and within our network. Here is an example with a dynamic http
import you can use with Deno.

```typescript
import * as BunnySDK from "https://esm.sh/@bunny.net/edgescript-sdk@0.11";

console.log("Starting server...");
BunnySDK.net.http.serve(async (req) => {
  console.log(`[INFO]: ${req.method} - ${req.url}`);
  return new Response("Hello bunny!");
});
```
