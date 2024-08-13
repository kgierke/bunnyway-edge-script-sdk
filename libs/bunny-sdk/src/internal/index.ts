import { BunnySDKV1 } from './v1';

/**
 * The global BunnySDK available
 * @internal
 */
declare global {
  const Bunny: {
    v1: BunnySDKV1,
  }
};
