import express from 'express';
import { randomBytes, createHash } from 'crypto';
import jwt from 'jsonwebtoken';
import auth from 'express-jwt';

import { Tracker, Token } from '../types';
import { trackers, tokens } from '../cache';
import { JWT_SECRET } from '../env';

export const internal = express();
export const external = express();
export const admin = express();

external.get('/trackers', (req, res) => {
	res.json({ trackers: Array.from(trackers.values()) });
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

// Admin Routes

admin.get('/tokens', (req, res) => {
	res.json({ tokens: Array.from(tokens.values()) });
});

admin.post('/tokens', async (req, res) => {
	const payload = { version: '1' };
	const tokenString = jwt.sign(payload, JWT_SECRET!);
	const hash = createHash('sha512');
	hash.update(tokenString);

	const hashContent = hash.digest('hex');
	tokens.set(hashContent, {
		hash: hashContent,
		content: tokenString,
		createdAt: new Date(),
		trackerId: null
	});

	res.json({ token: tokenString });
});

admin.delete('/tokens/:tokenHash', (req, res) => {

});

admin.delete(`/trackers/:trackerId`, (req, res) => {

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
