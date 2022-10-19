-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.

DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Trailer;
DROP TABLE IF EXISTS Item;
Drop TABLE IF EXISTS TrailerUser;
DROP TABLE IF EXISTS TrailerItem;
DROP TABLE IF EXISTS Users;

CREATE TYPE userAccess AS ENUM ('Admin', 'Site', 'Volunteer');

-- Create the schema.
CREATE TABLE Users (
  username varchar(25) PRIMARY KEY NOT NULL,
  password varchar(50) NOT NULL,
	userType userAccess NOT NULL
	);

CREATE TABLE Events (
	ID integer PRIMARY KEY, 
	name varchar(50),
  time timestamp,
  description text
	);

CREATE TABLE Trailer (
  ID integer PRIMARY KEY, 
	name varchar(25)
	);

CREATE TABLE Item (
  ID integer PRIMARY KEY, 
  TID integer REFERENCES Trailer(ID),
  name varchar(25),
  quantity integer,
  notificationlevel integer,
  increment integer
  );

CREATE TABLE TrailerUser (
  TID integer REFERENCES Trailer(ID),
  UID varchar(25) REFERENCES Users(username)
  );

-- Allow users to select data from the tables.
GRANT SELECT ON Users TO PUBLIC;
GRANT SELECT ON Events TO PUBLIC;
GRANT SELECT ON Trailer TO PUBLIC;
GRANT SELECT ON Item TO PUBLIC;
GRANT SELECT ON TrailerUser TO PUBLIC;
GRANT SELECT ON TrailerItem TO PUBLIC;