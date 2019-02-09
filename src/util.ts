export const handleError = (err: Error) => {
	console.error(err);
	process.exit(1);
};

export const setupErrorHandlers = () => {
	process.on('uncaughtException', handleError);
	process.on('unhandledRejection', handleError);
};
