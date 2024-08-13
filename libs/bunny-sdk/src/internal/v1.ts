/**
 * @internal
 */
type BunnySDKV1 = {
  serve: (handler: (request: Request) => Response | Promise<Response>) => void,
};

export {
  BunnySDKV1,
}
