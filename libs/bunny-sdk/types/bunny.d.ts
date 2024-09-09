/**
 * The global BunnySDK available
 * @internal
 */
declare namespace Bunny {
  type BunnySDKV1 = {
    /**
    * Serve function
    */
    serve: (handler: (request: Request) => Response | Promise<Response>) => void,
    /**
    * Serve PullZone function, to leverage middlewares
    */
    registerMiddlewares: (middlewares: {
      onOriginRequest: Array<(
        ctx: { request: Request },
      ) => Promise<Request> | Promise<Response>>
      onOriginResponse: Array<(
        ctx: { response: Response },
      ) => Promise<Request> | Promise<Response>>
    }) => void,
  };

  export const v1: BunnySDKV1;

};

