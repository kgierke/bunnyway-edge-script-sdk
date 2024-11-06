<div align="center">
  <a href="https://bunny.net">
    <img src="https://github.com/BunnyWay/edge-script-sdk/blob/main/docs/images/bunny.png?raw=true" width="500" height="auto" alt="Bunny"/>
  </a>
</div>

# Bunny - edgescript-sdk

This repository contains one library for now: the `@bunny.net/edgescript-sdk`
which is a little lib which intend to help you develop applications running 
over [Bunny](https://bunny.net).

We choose to run Bunny Scripts with a Deno modified runtime that leverage our
networks and products. To be able to also develop locally as if you were inside
the Bunny Network, we are creating a library which will help you leveraging your
prefered Javascript/Typescript environment locally and benefit from the Bunny
Network for your deployed script.

> Even if the Bunny Runtime is very similar to the Deno & Node Runtime, some API
> might differ or not being available due to the fact we leverage our network
> and run scripts in a serverless environment.
>
> We also have a roadmap and some items are just not priorized yet, if you want
> to have those available, reach out to us any times!


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

If you execute this code on a deployed Bunny Script, the serve function will
always be used to allow requests that goes from your PullZone (let's assume you
have `https://domain-test.b-cdn.net` as a PullZone).

In this case, every curl request to `https://domain-test.b-cdn.net` will be
redirect to the associated Bunny Script.

You have a full list of examples in the [example folder](./example/) you can
use.

