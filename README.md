# tracker

This repository contains all sources for the tracker service, which handles the collection of clients connected to the network, as well as other administrative tasks in a centralized manner. It consists of one instance in `ROOT` mode, which will manage a bunch of trackers in `REGULAR` mode, allowing the setup to scale. Consuming open APIs exposed by the trackers, clients are able to retrieve network information, including a list of all regular trackers to connect to.

## developing

Once you've got Docker and docker-compose installed, you can simply run

```bash
docker-compose build
docker-compose up (-d)
```

## configuring

Tracker instances are configured by supplying specific environment variables, most of which are listed below. In addition to the tracker-specific env variables you can also optimize behaviour in terms of performance by using Node.js-specific variables like `NODE_ENV` in production environments.

### startup modes

- Using the required environment variable `STARTUP_MODE`, the tracker service can be configured to start in either mode, since one tracker deployment supports both modes out of the box so you won't have to pull in multiple trackers

- Supported values are: `ROOT`, `REGULAR`

## API
The tracker provides two sets of endpoints: *internal* and *external*. Internal endpoints should only be exposed internally to other trackers. The external endpoint needs to be publicly accessible. `ROOT`-only: *admin* endpoint should not be exposed and is for internal consumption only.
### `ROOT` Mode
#### External
- `/trackers` (GET): Provides a list of registered trackers.

#### Internal
- `/trackers` (GET): Same as External. Provides a list of registered trackers.
- `/trackers` (POST): Registers sender as a tracker.

#### Admin
- `/tokens` (GET): Provides a list of generated (and valid) tokens.
- `/tokens` (POST): Generates a new token.
- `/tokens` (DELETE): Removes a token.

- `/trackers` (DELETE): Removes a tracker from the list.

### `REGULAR` Mode
#### External
- `/clients` (GET): Provides a list of registered clients.
- `/clients` (POST): Registers sender as a client.
- `/clients` (PUT): Updates heartbeat information of client.

## license

The JitHub tracker service is licensed under the [MIT License](LICENSE).
