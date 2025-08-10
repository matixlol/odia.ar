import type { RenderFunctionInput } from "astro-opengraph-images";
import { readFileSync } from "fs";
const { twj } = await import("tw-to-css");
import React from "react";

// from https://fullstackheroes.com/resources/vercel-og-templates/branded-logo/
export async function brandedLogo({
  title,
}: RenderFunctionInput): Promise<React.ReactNode> {
  return Promise.resolve(
    <div
      style={{
        ...twj("h-full w-full flex items-start justify-start"),
        ...{
          background: "#403136",
        },
      }}
    >
      <div style={twj("flex items-start justify-start h-full")}>
        <div style={twj("flex flex-col justify-between w-full h-full p-20")}>
          {/* Replace with your own logo */}
          <div style={twj("flex items-center")}>
            <img
              src={`data:image/png;base64,${readFileSync(
                "src/assets/isotipo.png",
                "base64"
              )}`}
              style={twj("w-48 h-48 object-contain")}
              alt="Observatorio de Derecho Informático Argentino"
            />
            <h1 style={twj("text-[60px] text-white font-bold text-left")}>
              O.D.I.A.
            </h1>
          </div>

          <h1 style={twj("text-[60px] text-white font-bold text-left")}>
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
