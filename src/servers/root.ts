import express from 'express';
import { randomBytes } from 'crypto';
import expressJwt from 'express-jwt';
import cors from 'cors';

import { Tracker } from '../types';
import { trackers } from '../cache';
import { createToken, getTrackers } from '../util';
import { JWT_SECRET } from '../env';
import { registerAsTracker } from '../middleware';

export const internal = express();
export const external = express();
export const admin = express();

internal.use(cors({ origin: '*', allowedHeaders: '*' }));
external.use(cors({ origin: '*', allowedHeaders: '*' }));
admin.use(cors({ origin: '*', allowedHeaders: '*' }));

external.get('/trackers', (req, res) => {
	res.json({ trackers: getTrackers(trackers, true) });
});

// Internal Routes

internal.get('/trackers', expressJwt({ secret: JWT_SECRET || 'jit!' }), (req, res) => {
	res.json({ trackers: getTrackers(trackers, true) });
});

internal.post(
	'/heartbeat',
	expressJwt({ secret: JWT_SECRET || 'jit!' }),
	registerAsTracker,
	(req, res) => {
		if (!req.user) {
			return res.status(401).json({});
		}

		const tracker = trackers.get(req.user.id);
		if (!tracker) {
			return res.status(404).json({});
		}

		tracker.lastHeartbeat = Date.now();

		trackers.set(tracker.id, tracker);

		res.json({ status: 'Ok' });
	}
);

// Admin Routes

admin.post('/trackers', express.json(), async (req, res) => {
	const { name } = req.body;
	const id = randomBytes(16).toString('hex');

	const token = createToken(id);

	const tracker: Tracker = {
		id,
		name,
		token,
		address: null,
		lastHeartbeat: null
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

export const start = (internalPort: number, externalPort: number, adminPort: number) => {
	internal.listen(internalPort);
	external.listen(externalPort);
	admin.listen(adminPort);
	console.log(
		`Listening on INTERNAL=${internalPort}; EXTERNAL=${externalPort}; ADMIN=${adminPort}`
	);
};
