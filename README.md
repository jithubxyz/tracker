# tracker

This repository contains all sources for the tracker service, which handles the collection of clients connected to the network, as well as other administrative tasks in a centralized manner. It consists of one instance in `ROOT` mode, which will manage a bunch of tracker's in `REGULAR` mode, allowing the setup to scale.

## developing

Once you've got Docker and docker-compose installed, you can simply run

```bash
docker-compose build
docker-compose up (-d)
```

## configuring

### startup modes

- Using the required environment variable `STARTUP_MODE`, the tracker service can be configured to start in either mode, since one tracker deployment supports both modes out of the box so you won't have to pull in multiple trackers

- Supported values are: `ROOT`, `REGULAR`
