export enum StartupMode {
	ROOT = 'ROOT',
	REGULAR = 'REGULAR'
}

interface Connectable {
	id: string;
	address: string | null;
	lastHeartbeat: number | null;
}

export interface Tracker extends Connectable {
	name: string;
	token: Token;
}

export interface Client extends Connectable {
	walletId: string;
}

export interface Token {
	hash: string;
	content: string;
	createdAt: Date;
}

interface TokenContent {
	id: string;
	version: string;
}

declare global {
	namespace Express {
			export interface Request {
					user?: TokenContent;
			}
	}
}
