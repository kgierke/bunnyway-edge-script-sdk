<div align="center">
  <a href="https://bunny.net">
    <img src="https://github.com/BunnyWay/edge-script-sdk/blob/main/asset/bunny.png?raw=true" width="500" height="auto" alt="Bunny"/>
  </a>
</div>

# Bunny.net - edgescript-sdk

This repository contains SDK to enable local development of Bunny.net Edge Scripting: `@bunny.net/edgescript-sdk`

Bunny.net Edge Scripting is built with a custom Deno runtime that runs on the Bunny.net Edge Scripting. 
This SDK provides similar environment to Bunny.net Edge Scripting locally, 
so that you can run and debug scripts in your local environment before publishing them.

> Even if the Bunny Runtime is very similar to the Deno & Node Runtime, some API
> might differ or not being available due to the fact we leverage our CDN
> and run scripts in a serverless environment.
>

## Usage

With `@bunny.net/edgescript-sdk` you can write a script which will work with
Deno, with Node, and within our network.

```typescript
import * as BunnySDK from "@bunny.net/edgescript-sdk";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

console.log("Starting server...");

BunnySDK.net.http.serve({ port: 8080, hostname: '127.0.0.1' }, async (req) => {
  console.log(`[INFO]: ${req.method} - ${req.url}`);
  await sleep(1);
  return new Response("blbl");
});
```

If you execute this code on a deployed Bunny.net Edge Scripting script, the serve function will
be used to execute requests on a connected PullZone.

Full list of examples is in the [example folder](./example/).
