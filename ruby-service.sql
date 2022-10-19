-- Drop previous versions of the tables if they they exist, in reverse order of foreign keys.
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Trailer;
DROP TABLE IF EXISTS Item;
Drop TABLE IF EXISTS TrailerUser;

-- Create the schema.
CREATE TABLE User (
  username varchar(25) PRIMARY KEY NOT NULL,
  password varchar(50) NOT NULL,
	type varchar(10) NOT NULL
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
  name varchar(25),
  quantity integer,
  notificationlevel integer,
  increment integer
  );

CREATE TABLE TrailerUser (
  TID integer REFERENCES Trailer(ID),
  UID varchar(25) REFERENCES User(username)
  );

CREATE TABLE TrailerItem (
  TID integer REFERENCES Trailer(ID),
  IID varchar(25) REFERENCES Item(ID)
  );

-- Allow users to select data from the tables.
GRANT SELECT ON User TO PUBLIC;
GRANT SELECT ON Events TO PUBLIC;
GRANT SELECT ON Trailer TO PUBLIC;
GRANT SELECT ON Item TO PUBLIC;
GRANT SELECT ON TrailerUser TO PUBLIC;
GRANT SELECT ON TrailerItem TO PUBLIC;

INSERT INTO Trailer VALUES (1, 'Trailer 1');
INSERT INTO Trailer VALUES (2, 'Trailer 2');

INSERT INTO User VALUES ('Site1', 'Site1', 'Site');
INSERT INTO User VALUES ('Volunteer1', 'Volunteer1', 'Volunteer');
INSERT INTO User VALUES ('Admin1', 'Admin1', 'Admin');

INSERT INTO Events VALUES (1, 'Clothes Distribution', '2022-11-28 15:20:00', 'Distribute clothing donations to GR families');
INSERT INTO Events VALUES (2, 'Food Distribution', '2022-12-29 13:40:00', 'Distribute food');

INSERT INTO Item VALUES (1, 'Cups', 300, 50, 25);
INSERT INTO Item VALUES (2, 'Cups', 500, 150, 50);
INSERT INTO Item VALUES (3, 'Spoons', 100, 10, 40);
INSERT INTO Item VALUES (4, 'Forks', 800, 100, 150);
INSERT INTO Item VALUES (5, 'Plates', 200, 75, 40);

INSERT INTO TrailerUser VALUES ('Site1', 1);
INSERT INTO TrailerUser VALUES ('Admin1', 1);
INSERT INTO TrailerUser VALUES ('Admin1', 2);

INSERT INTO TrailerItem VALUES (1, 1);
INSERT INTO TrailerItem VALUES (2, 2);
INSERT INTO TrailerItem VALUES (1, 3);
INSERT INTO TrailerItem VALUES (1, 4);
INSERT INTO TrailerItem VALUES (2, 5);

