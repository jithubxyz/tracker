import express from 'express';
import { randomBytes } from 'crypto';

import { Tracker } from '../types';
import { trackers } from '../cache';

export const internal = express();
export const external = express();

external.get('/trackers', (req, res) => {
	res.json({ trackers });
});

// Internal Routes

internal.get('/trackers', (req, res) => {
	res.json({ trackers: Array.from(trackers.values()) });
});

internal.post('/trackers', express.json(), (req, res) => {
	const id = randomBytes(16).toString('hex');

	const tracker: Tracker = {
		id,
		name: req.body.name,
		address: req.ip
	};

	trackers.set(id, tracker);
	console.log(`Added tracker ${id} to trackers`, tracker);

	res.json({ id });
});

export const start = (internalPort: number, externalPort: number) => {
	internal.listen(internalPort);
	external.listen(externalPort);
};
