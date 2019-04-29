import express from 'express';
import { randomBytes } from 'crypto';

import { Client } from '../types';
import { clients } from '../cache';

export const external = express();

external.get('/', (req, res) => {
	res.json({ message: 'uwu' });
});

external.get('/clients', (req, res) => {
	res.json({
		clients: Array.from(clients.values()).map(c => {
			delete c.id;
			return c;
		})
	});
});

external.post('/clients', express.json(), (req, res) => {
	const id = randomBytes(16).toString('hex');

	const client: Client = {
		id,
		walletId: req.body.walletId,
		address: `http://${req.ip}`, // TODO: determine protocol
		lastHeartbeat: Date.now()
	};

	clients.set(id, client);

	res.json({ id });
});

external.put('/clients', express.json(), (req, res) => {
	const { id } = req.body;

	const client = clients.get(id);
	if (client) {
		clients.set(id, { ...client, lastHeartbeat: Date.now() });
	}

	res.json({ time: Date.now() });
});

external.post('/heartbeat', express.json(), (req, res) => {
	const { id } = req.body;

	const client = clients.get(id);

	if (!client) {
		res.sendStatus(404);
		return;
	}

	client.lastHeartbeat = Date.now();

	clients.set(id, client);

	res.json({ id });
});

export const start = (externalPort: number) => {
	external.listen(externalPort);
	console.log(`Listening on EXTERNAL=${externalPort}`);
};
