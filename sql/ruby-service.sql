-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.

Drop TABLE IF EXISTS TrailerUsers CASCADE;
DROP TABLE IF EXISTS Events CASCADE;
DROP TABLE IF EXISTS Items CASCADE;
DROP TABLE IF EXISTS Trailers CASCADE;
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

CREATE TABLE Trailers (
  ID SERIAL PRIMARY KEY, 
	tname varchar(25)
	);

CREATE TABLE Items (
  ID SERIAL PRIMARY KEY, 
  TID SERIAL REFERENCES Trailer(ID),
  iname varchar(25),
  quantity integer,
  notificationlevel integer,
  increment integer
  );

CREATE TABLE TrailerUsers (
  TID SERIAL REFERENCES Trailer(ID),
  UID varchar(25) REFERENCES User(username)
  );

-- Allow users to select data from the tables.
GRANT SELECT ON Users TO PUBLIC;
GRANT SELECT ON Events TO PUBLIC;
GRANT SELECT ON Trailers TO PUBLIC;
GRANT SELECT ON Items TO PUBLIC;
GRANT SELECT ON TrailerUsers TO PUBLIC;