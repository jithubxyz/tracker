import { Request, Response, NextFunction } from 'express';
import { trackers } from './cache';

export async function registerAsTracker(req: Request, res: Response, next: NextFunction) {
	if (req.user) {
		const tracker = trackers.get(req.user.id);
		if (tracker) {
			tracker.address = req.ip;

			trackers.set(tracker.id, tracker);
		} else {
			res.status(403).send({ status: 'missingTracker' });
		}
	}

	res.status(401).send({ status: 'notAuthorized' });
}
