<div align="center">
  <a href="https://bunny.net">
    <img src="https://github.com/BunnyWay/edge-script-sdk/blob/main/asset/bunny.png?raw=true" width="500" height="auto" alt="Bunny"/>
  </a>
</div>

# bunny.net - EdgeScript SDK

This repository contains the SDK for local development of bunny.net Edge Scripting `@bunny.net/edgescript-sdk`

Bunny.net Edge Scripting uses a custom Deno runtime, designed to run scripts across the bunny.net edge network. 
This SDK replicates a similar environment locally, allowing you to develop and debug your scripts before deploying them.

> Note: While the Bunny Runtime shares many similarities with Deno and Node runtimes,
> certain APIs may differ or be unavailable due to the unique characteristics of
> running scripts in a serverless CDN environment.
>

## Usage

With @bunny.net/edgescript-sdk, you can create scripts that run seamlessly on Deno,
Node, and within the bunny.net network.

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

When executed on a deployed bunny.net Edge Scripting script, the serve function processes incoming 
requests through a connected PullZone.

For more examples, refer to the [examples folder](./example/).
