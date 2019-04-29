import { Request, Response, NextFunction } from 'express';
import { trackers } from './cache';

export async function registerAsTracker(req: Request, res: Response, next: NextFunction) {
	if (req.user) {
		const tracker = trackers.get(req.user.id);
		if (tracker) {
			tracker.address = `http://${req.ip}`; // TODO: determine protocol

			trackers.set(tracker.id, tracker);
			next();
			return;
		} else {
			res.status(403).send({ status: 'missingTracker' });
			return;
		}
	}

	res.status(401).send({ status: 'notAuthorized' });
}
