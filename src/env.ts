const missingEnvError = (name: string) =>
	new Error(`Missing env variable ${name}`);

export const STARTUP_MODE = process.env.STARTUP_MODE;
if (!STARTUP_MODE) {
	throw missingEnvError('STARTUP_MODE');
}
