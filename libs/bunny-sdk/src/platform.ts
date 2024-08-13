// Adapted from https://github.com/openai/openai-deno-build/blob/ea31e868608f359c6a948f456efea2b28df6e775/core.ts#L1087

type PlatformName =
  | "MacOS"
  | "Linux"
  | "Windows"
  | "FreeBSD"
  | "OpenBSD"
  | "iOS"
  | "Android"
  | `Other:${string}`
  | "Unknown";

// Defined by `build` step.
declare const VERSION: string;


type Platform = {
  /**
   * @internal
   */
  readonly _tag: "_Platform";
  name: PlatformName;
  version: string;
  runtime: "bunny" | "node" | "deno" | "unknown";
  runtime_version: string;
};

const normalizePlatform = (platform: string): PlatformName => {
  // Node platforms:
  // - https://nodejs.org/api/process.html#processplatform
  // Deno platforms:
  // - https://doc.deno.land/deno/stable/~/Deno.build
  // - https://github.com/denoland/deno/issues/14799

  platform = platform.toLowerCase();

  if (platform.includes("ios")) return "iOS";
  if (platform === "android") return "Android";
  if (platform === "darwin") return "MacOS";
  if (platform === "win32") return "Windows";
  if (platform === "freebsd") return "FreeBSD";
  if (platform === "openbsd") return "OpenBSD";
  if (platform === "linux") return "Linux";
  if (platform) return `Other:${platform}`;
  return "Unknown";
};

const internal_getPlatform = (): Platform => {
  // Check if Bunny
  if (typeof Bunny !== "undefined") {
    return {
      _tag: "_Platform",
      version: VERSION,
      name: "Unknown",
      runtime: "bunny",
      runtime_version: "unknown",
    };
  }

  // Check if Deno
  if (typeof Deno !== "undefined" && Deno.build != null) {
    return {
      _tag: "_Platform",
      version: VERSION,
      name: normalizePlatform(Deno.build.os),
      runtime: "deno",
      runtime_version: typeof Deno.version === "string"
        ? Deno.version
        : Deno.version?.deno ?? "unknown",
    };
  }
  // Check if Node.js
  if (
    Object.prototype.toString.call(
      typeof process !== "undefined" ? process : 0,
    ) === "[object process]"
  ) {
    return {
      _tag: "_Platform",
      version: VERSION,
      name: normalizePlatform(process.platform),
      runtime: "node",
      runtime_version: process.version,
    };
  }

  return {
    _tag: "_Platform",
    version: VERSION,
    name: "Unknown",
    runtime: "unknown",
    runtime_version: "unknown",
  };
};

export {
  internal_getPlatform,
  Platform,
};
