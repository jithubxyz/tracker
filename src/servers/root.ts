import express from 'express';
import { randomBytes } from 'crypto';
import expressJwt from 'express-jwt';

import { Tracker } from '../types';
import { trackers } from '../cache';
import { createToken, getTrackers } from '../util';
import { JWT_SECRET } from '../env';

export const internal = express();
export const external = express();
export const admin = express();

external.get('/trackers', (req, res) => {
	res.json({ trackers: getTrackers(trackers, true) });
});

// Internal Routes

internal.get('/trackers', expressJwt({ secret: JWT_SECRET! }), (req, res) => {
	res.json({ trackers: getTrackers(trackers, true) });
});

// Admin Routes

admin.post('/trackers', express.json(), async (req, res) => {
	const { name } = req.body;
	const id = randomBytes(16).toString('hex');

	const token = createToken(id);

	const tracker: Tracker = {
		id,
		name,
		token,
		address: null
	};

	trackers.set(id, tracker);
	console.log(`Added tracker ${id} to trackers`, tracker);

	res.json(tracker);
});

admin.delete('/trackers/:trackerId', async (req, res) => {
	const { trackerId } = req.params;
	trackers.delete(trackerId);

	res.json({ status: 'success' });
});

admin.get('/trackers', async (req, res) => {
	res.json({ trackers: getTrackers(trackers) });
});

export const start = (
	internalPort: number,
	externalPort: number,
	adminPort: number
) => {
	internal.listen(internalPort);
	external.listen(externalPort);
	admin.listen(adminPort);
};
