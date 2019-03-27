import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

import { Token, Tracker } from './types';
import { JWT_SECRET } from './env';

export const handleError = (err: Error) => {
	console.error(err);
	process.exit(1);
};

export const setupErrorHandlers = () => {
	process.on('uncaughtException', handleError);
	process.on('unhandledRejection', handleError);
};

export function createToken(id: string): Token {
	const payload = { version: '1', id };
	const tokenString = jwt.sign(payload, JWT_SECRET!);
	const hash = createHash('sha512');
	hash.update(tokenString);

	const hashContent = hash.digest('hex');

	return {
		hash: hashContent,
		content: tokenString,
		createdAt: new Date()
	};
}

export function cleanTracker(tracker: Tracker) {
	delete tracker.token;
	return tracker;
}

export function validTracker(tracker: Tracker) {
	return tracker.address !== null;
}

export function getTrackers(map: Map<string, Tracker>, filter?: boolean) {
	return Array.from(map.values())
		.filter(t => filter ? validTracker(t) : true)
		.map(cleanTracker);
}
