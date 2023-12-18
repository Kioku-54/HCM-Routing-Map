#!/bin/bash

echo "======================================="
echo "Initialises the postgres database running inside a docker container for django app."

echo "STEPS:"
echo "1. set environnement variable"
echo "2. create db users"
echo "3. create db"
echo "4. create extension postgis + schema"
echo "5. grant - revoke privileges"
echo "======================================="
echo " "

echo "-------- 1. set environnement variables --------"

set -e
DB_NAME=kioku
RW_ROLE=readwrite

echo "-------------- 2. create db users --------------"

psql -v ON_ERROR_STOP=1<<-EOSQL

	-- create admin role (running Django migrations and test suite).
    CREATE USER $ADMIN_USER WITH PASSWORD '$ADMIN_USER_PWD' NOSUPERUSER CREATEDB CREATEROLE INHERIT;
	
	-- create app role (read write on database tables).
	CREATE USER $APP_USER WITH PASSWORD '$APP_USER_PWD';
EOSQL

echo "----------------- 3. create db -----------------"

createdb $DB_NAME --owner=$ADMIN_USER

echo "----- 4. create extension postgis + schema -----"

psql -v ON_ERROR_STOP=1 --dbname "$DB_NAME" <<-EOSQL

	-- create postgis extension
	CREATE EXTENSION postgis;
	
	-- create app schema
	CREATE SCHEMA $SCHEMA AUTHORIZATION $ADMIN_USER;
EOSQL

echo "--------- 5. grant - revoke privileges ---------"

psql -v ON_ERROR_STOP=1 --username "$ADMIN_USER" --dbname "$DB_NAME" <<-EOSQL

	-- lock down permissions on public schema
    -- this prevents any user from creating objects unless given permission
    REVOKE CREATE ON SCHEMA public FROM PUBLIC;

    -- prevent *any* connection to the new database unless explicitly given
    REVOKE ALL ON DATABASE $DB_NAME FROM PUBLIC;

    -- admin user must have full access to the 'public' schema because that is where new db tables for the test suite db will be created
    ALTER ROLE $ADMIN_USER SET SEARCH_PATH TO $SCHEMA, public;

    -- app user must only be allowed to query the application schema    
    ALTER ROLE $APP_USER SET SEARCH_PATH TO $SCHEMA, public;

    -- create a role which has read / write access to the database
    CREATE ROLE $RW_ROLE;
    GRANT CONNECT ON DATABASE $DB_NAME TO $RW_ROLE;
    GRANT USAGE ON SCHEMA $SCHEMA TO $RW_ROLE;
    GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA $SCHEMA TO $RW_ROLE;
    GRANT USAGE ON ALL SEQUENCES IN SCHEMA $SCHEMA TO $RW_ROLE;

    -- grant role privileges to each user
    GRANT $RW_ROLE TO $ADMIN_USER;
    GRANT $RW_ROLE TO $APP_USER;

    -- alter privileges so that the RW Role will be able to access tables created in future (by the admin user)
    ALTER DEFAULT PRIVILEGES FOR USER $ADMIN_USER GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO $RW_ROLE;
    ALTER DEFAULT PRIVILEGES FOR USER $ADMIN_USER GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO $RW_ROLE;
EOSQL

echo "======================================="
echo "Database initialized..."
echo "======================================="