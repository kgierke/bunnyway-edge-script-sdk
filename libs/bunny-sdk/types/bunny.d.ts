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
  };

  export const v1: BunnySDKV1;

};

