import { setupErrorHandlers } from './util';
import { StartupMode } from './types';
import { STARTUP_MODE } from './env';

setupErrorHandlers();

(async () => {
	switch (STARTUP_MODE) {
		case StartupMode.ROOT:
			console.log('Starting tracker in ROOT mode');
			// TODO Implement ROOT mode startup
			break;
		case StartupMode.REGULAR:
			console.log('Starting tracker in REGULAR mode');
			// TODO Implement REGULAR mode startup
			break;
		default:
			throw new Error(
				'Unknown startup mode supplied. Supported modes are "ROOT", "REGULAR"'
			);
	}
})();
