-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.

Drop TABLE IF EXISTS TrailerUser CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Item CASCADE;
DROP TABLE IF EXISTS Trailer CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TYPE IF EXISTS userAccess;

CREATE TYPE userAccess AS ENUM ('Admin', 'Site', 'Volunteer');

-- Create the schema.
CREATE TABLE Users (
  username varchar(25) PRIMARY KEY NOT NULL,
  password varchar(50) NOT NULL,
	userType userAccess NOT NULL
	);

CREATE TABLE Events (
	ID SERIAL PRIMARY KEY, 
	name varchar(50),
  time timestamp,
  description text
	);

CREATE TABLE Trailer (
  ID SERIAL PRIMARY KEY, 
	tname varchar(25)
	);

CREATE TABLE Item (
  ID SERIAL PRIMARY KEY, 
  TID SERIAL REFERENCES Trailer(ID),
  iname varchar(25),
  quantity integer,
  notificationlevel integer,
  increment integer
  );

CREATE TABLE TrailerUser (
  TID SERIAL REFERENCES Trailer(ID),
  UID varchar(25) REFERENCES Users(username)
  );

-- Allow users to select data from the tables.
GRANT SELECT ON Users TO PUBLIC;
GRANT SELECT ON Events TO PUBLIC;
GRANT SELECT ON Trailer TO PUBLIC;
GRANT SELECT ON Item TO PUBLIC;
GRANT SELECT ON TrailerUser TO PUBLIC;