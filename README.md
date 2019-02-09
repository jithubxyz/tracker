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

## license

The JitHub tracker service is licensed under the [MIT License](LICENSE).
