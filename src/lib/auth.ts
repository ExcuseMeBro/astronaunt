export type JwtPayload = {
	exp?: number;
	iat?: number;
	nbf?: number;
	iss?: string;
	aud?: string | string[];
	sub?: string;
	[key: string]: unknown;
};

let accessToken: string | null = null;

export const tokenStore = {
	get(): string | null {
		return accessToken;
	},
	set(token: string | null): void {
		accessToken = token;
	},
	clear(): void {
		accessToken = null;
	},
};

export function decodeJwtPayload<T extends JwtPayload = JwtPayload>(token: string): T | null {
	const [, payload] = token.split(".");

	if (!payload) {
		return null;
	}

	try {
		const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
		const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
		const json = globalThis.atob(padded);
		return JSON.parse(json) as T;
	} catch {
		return null;
	}
}

export function isJwtExpired(token: string, skewSeconds = 30): boolean {
	const payload = decodeJwtPayload(token);
	const now = Math.floor(Date.now() / 1000);

	if (!payload?.exp || typeof payload.exp !== "number") {
		return true;
	}

	return payload.exp <= now + skewSeconds;
}

export function isJwtNotBeforeValid(token: string, skewSeconds = 30): boolean {
	const payload = decodeJwtPayload(token);
	const now = Math.floor(Date.now() / 1000);

	if (!payload?.nbf || typeof payload.nbf !== "number") {
		return true;
	}

	return payload.nbf <= now + skewSeconds;
}

export function hasExpectedIssuer(token: string, issuer: string): boolean {
	const payload = decodeJwtPayload(token);
	return payload?.iss === issuer;
}

export function hasExpectedAudience(token: string, audience: string): boolean {
	const payload = decodeJwtPayload(token);
	const aud = payload?.aud;

	if (Array.isArray(aud)) {
		return aud.includes(audience);
	}

	return aud === audience;
}
