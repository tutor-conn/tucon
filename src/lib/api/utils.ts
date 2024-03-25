import { getSiteUrl } from "../utils";

export class TuconApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function isObjectWithDescriptionProperty(
  value: unknown,
): value is { description: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "description" in value &&
    typeof value.description === "string"
  );
}

async function parseResponse(response: Response) {
  if (response.headers.get("Content-Type") === "application/json") {
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    if (isObjectWithDescriptionProperty(data)) {
      throw new TuconApiError(response.status, data.description);
    }

    throw new TuconApiError(response.status, response.statusText);
  }

  const data = await response.text();

  if (response.ok) {
    return data;
  }

  throw new TuconApiError(response.status, data);
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: Record<string, unknown>;
}

export interface RequestOptionsBodyRequired extends RequestOptions {
  body: Record<string, unknown>;
}

export async function apiRequest(endpoint: string, options: RequestOptions) {
  const { body, ...otherOptions } = options;

  const requestInit: RequestInit = { ...otherOptions };

  // NOTE: Cloudflare Workers do not support 'credentials' option
  // See https://github.com/cloudflare/workers-sdk/issues/2514
  if (typeof window !== "undefined") {
    requestInit.credentials = "include";
  }

  if (body) {
    requestInit.headers = {
      ...requestInit.headers,
      "Content-Type": "application/json",
    };
    requestInit.body = JSON.stringify(body);
  }

  // NOTE: Requests to /api/* are proxied by Next.js via "rewrites" in next.config.mjs
  // to the API server
  const response = await fetch(`${getSiteUrl()}/api${endpoint}`, requestInit);
  const parsedResponse = await parseResponse(response);
  return parsedResponse;
}
