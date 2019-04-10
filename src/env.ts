import { StartupMode } from './types';

const missingEnvError = (name: string) =>
	new Error(`Missing env variable ${name}`);

export const STARTUP_MODE = process.env.STARTUP_MODE;
if (!STARTUP_MODE) {
	throw missingEnvError('STARTUP_MODE');
}

export const INTERNAL_PORT = parseInt(process.env.INTERNAL_PORT!, 10) || 5000;
export const EXTERNAL_PORT = parseInt(process.env.EXTERNAL_PORT!, 10) || 4000;
export const ADMIN_PORT = parseInt(process.env.ADMIN_PORT!, 10) || 6000;

export const ROOT_URL = process.env.ROOT_URL || 'http://localhost:5000';
export const HEARTBEAT_INTERVAL = parseInt(process.env.HEARTBEAT_INTERVAL!, 10) || 10000;

export const TOKEN = process.env.TOKEN;
if (!TOKEN && STARTUP_MODE === StartupMode.REGULAR) {
	throw missingEnvError('TOKEN');
}

export const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && STARTUP_MODE === StartupMode.ROOT) {
	throw missingEnvError('JWT_SECRET');
}
