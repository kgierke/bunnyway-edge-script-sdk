<div align="center">
  <a href="https://bunny.net">
    <img src="https://github.com/BunnyWay/edge-script-sdk/blob/main/asset/bunny.png?raw=true" width="500" height="auto" alt="Bunny"/>
  </a>
</div>

# bunny.net - Bunny Edge Scripting SDK

Welcome to the Bunny Edge Scripting SDK repository! This library, `@bunny.net/edgescript-sdk`, provides a seamless way to develop and test applications for the Bunny Edge Scripting platform. With this SDK, you can build, debug, and run scripts locally and later deploy them effortlessly to Bunny’s global edge network into a production environment.

Under the hood, Bunny Edge Scripting is built on top of Deno. To provide a seamless integration, Edge Scripting provides a custom runtime that was designed to run scripts interchangibly between a local environment, and across the bunny.net edge network. This SDK replicates a similar environment locally, allowing you to develop and debug your scripts before deploying them.

> Note: The Bunny Runtime attempts to closely match the behavior of Deno and Node runtimes, but certain APIs
> may be different or unavailable due to the unique platform requirements of running applications in a serverless CDN environment.

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

This code sets up a local HTTP server using the Bunny Edge Scripting SDK. You can access the server at 127.0.0.1:8080 and see it log incoming requests in real-time. This setup closely resembles how your script will handle requests on Bunny's edge network.

## Deploying to Bunny Edge
Once you’ve developed and tested your code locally, deploying to Bunny Edge Scripting is simple. Push your code to your Bunny Edge Scripting project’s GitHub repository, and it will automatically be deployed across Bunny’s global CDN.

Once deployed, Bunny’s serve function processes incoming requests via a connected Pull Zone, enabling your application to deliver data at the edge with optimal speed and minimal latency.

## Error Handling and Logging
To assist with debugging and enhance observability, Bunny Edge Scripting includes built-in logging support. Use console.log, console.warn, and console.error statements within your code to track application flow, errors, and other details during local development and edge deployment.

For more examples, refer to the [examples folder](./example/).
