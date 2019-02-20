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
