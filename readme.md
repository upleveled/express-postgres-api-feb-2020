# Express PostgreSQL API

- [Express](https://nextjs.org/)
- [Postgres](https://github.com/porsager/postgres)
- [Ley](https://github.com/lukeed/ley) for database migrations
- [Jest](https://jestjs.io/en/) for unit tests
- [Cypress](https://www.cypress.io/) for end to end test

## Setup

Copy the `.env.example` file to `.env` and add the database connection information.

You'll also need PostgreSQL for this.

### PostgreSQL Installation instructions

Follow the instructions from [the PostgreSQL step in UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/windows.md#user-content-postgresql).

Run the following queries inside of `psql` to set up the database and the user:

```sql
CREATE DATABASE express;
CREATE USER express WITH ENCRYPTED PASSWORD 'express';
GRANT ALL PRIVILEGES ON DATABASE express TO express;
SET ROLE express;
\connect express;
```
