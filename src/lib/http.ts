import { isJwtExpired, tokenStore } from "./auth";

export type ApiClientOptions = {
	baseUrl?: string;
	getAccessToken?: () => Promise<string | null> | string | null;
	onUnauthorized?: () => Promise<void> | void;
	defaultHeaders?: HeadersInit;
};

export type ApiRequestOptions = Omit<RequestInit, "body"> & {
	auth?: boolean;
	body?: BodyInit | Record<string, unknown> | unknown[] | null;
};

export class ApiError<T = unknown> extends Error {
	readonly status: number;
	readonly data: T | null;

	constructor(message: string, status: number, data: T | null = null) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.data = data;
	}
}

const DEFAULT_API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export function createApiClient(options: ApiClientOptions = {}) {
	const baseUrl = options.baseUrl ?? DEFAULT_API_BASE_URL;
	const getAccessToken = options.getAccessToken ?? tokenStore.get;

	async function request<T>(path: string, requestOptions: ApiRequestOptions = {}): Promise<T> {
		const { auth = true, body, headers, ...init } = requestOptions;
		const url = buildUrl(baseUrl, path);
		const requestHeaders = new Headers(options.defaultHeaders);
		const token = auth ? await getAccessToken() : null;

		requestHeaders.set("Accept", "application/json");

		if (body && !(body instanceof FormData) && !requestHeaders.has("Content-Type")) {
			requestHeaders.set("Content-Type", "application/json");
		}

		for (const [key, value] of new Headers(headers)) {
			requestHeaders.set(key, value);
		}

		if (token && !isJwtExpired(token)) {
			requestHeaders.set("Authorization", `Bearer ${token}`);
		}

		const response = await fetch(url, {
			...init,
			headers: requestHeaders,
			body: serializeBody(body),
		});

		if (response.status === 401) {
			await options.onUnauthorized?.();
		}

		if (!response.ok) {
			throw new ApiError(
				response.statusText || "Request failed",
				response.status,
				await readJson(response),
			);
		}

		if (response.status === 204) {
			return undefined as T;
		}

		return (await readJson(response)) as T;
	}

	return {
		get: <T>(path: string, init?: ApiRequestOptions) =>
			request<T>(path, { ...init, method: "GET" }),
		post: <T>(path: string, body?: ApiRequestOptions["body"], init?: ApiRequestOptions) =>
			request<T>(path, { ...init, method: "POST", body }),
		put: <T>(path: string, body?: ApiRequestOptions["body"], init?: ApiRequestOptions) =>
			request<T>(path, { ...init, method: "PUT", body }),
		patch: <T>(path: string, body?: ApiRequestOptions["body"], init?: ApiRequestOptions) =>
			request<T>(path, { ...init, method: "PATCH", body }),
		delete: <T>(path: string, init?: ApiRequestOptions) =>
			request<T>(path, { ...init, method: "DELETE" }),
		request,
	};
}

export const api = createApiClient();

function buildUrl(baseUrl: string, path: string): string {
	if (/^https?:\/\//.test(path)) {
		return path;
	}

	return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

function serializeBody(body: ApiRequestOptions["body"]): BodyInit | null | undefined {
	if (!body || body instanceof FormData || typeof body === "string" || body instanceof Blob) {
		return body as BodyInit | null | undefined;
	}

	return JSON.stringify(body);
}

async function readJson(response: Response): Promise<unknown> {
	const contentType = response.headers.get("Content-Type") ?? "";

	if (!contentType.includes("application/json")) {
		return null;
	}

	return response.json();
}
