import { setupErrorHandlers } from './util';
import { StartupMode } from './types';
import { STARTUP_MODE, INTERNAL_PORT, EXTERNAL_PORT } from './env';

import { start as startRoot } from './servers/root';
import { start as startRegular } from './servers/regular';

setupErrorHandlers();

(async () => {
	switch (STARTUP_MODE) {
		case StartupMode.ROOT:
			console.log('Starting tracker in ROOT mode');
			startRoot(INTERNAL_PORT, EXTERNAL_PORT);
			break;
		case StartupMode.REGULAR:
			console.log('Starting tracker in REGULAR mode');
			startRegular(EXTERNAL_PORT);
			break;
		default:
			throw new Error(
				'Unknown startup mode supplied. Supported modes are "ROOT", "REGULAR"'
			);
	}
})();
