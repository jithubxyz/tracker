export enum StartupMode {
	ROOT = 'ROOT',
	REGULAR = 'REGULAR'
}

interface Connectable {
	id: string;
	address: string;
}

export interface Tracker extends Connectable {
	name: string;
}

export interface Client extends Connectable {
	walletId: string;
	lastHeartbeat: number;
}

export interface Token {
	hash: string;
	content: string;
	createdAt: Date;

	trackerId: string | null;
}
