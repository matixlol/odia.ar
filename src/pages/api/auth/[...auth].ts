import { Auth } from "@auth/core";
import type { APIRoute } from "astro";
import { authConfig } from "../../../lib/auth";

export const prerender = false;
export const ALL: APIRoute = ({ request }) => Auth(request, authConfig);
