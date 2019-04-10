import fetch from 'node-fetch';
import { HEARTBEAT_INTERVAL, TOKEN } from './env';

export async function connectToRoot(rootUrl: string) {
	await sendHeartbeat(rootUrl);
	setInterval(() => sendHeartbeat(rootUrl), HEARTBEAT_INTERVAL);
}

function sendHeartbeat(rootUrl: string) {
	return fetch(`${rootUrl}/heartbeat`, {
		method: 'POST',
		headers: { Authorization: `Bearer ${TOKEN}` }
	}).then(r => r.json());
}
