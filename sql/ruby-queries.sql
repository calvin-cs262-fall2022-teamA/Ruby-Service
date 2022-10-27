-- Trailer
-- Get all Trailer names
SELECT name
  FROM Trailer;

-- Get all Items in a Trailer, sort alphabetically
SELECT *
  FROM Item, Trailer
  WHERE Item.TID = Trailer.ID
    AND Trailer.tname = 'Trailer 1' -- Hardcoded Example

-- Get all items below below min quantity
SELECT * 
  FROM Item
  WHERE Item.quantity < Item.notificationlevel

-- Add Item
INSERT INTO Item
  VALUES (DEFAULT, 2, 'Bananas', 50, 10, 5) -- Hardcoded Example
  -- RETURNING *;

-- Add Trailer
INSERT INTO Trailer
  VALUES (DEFAULT, 'Trailer 3') -- Hardcoded Example
  -- RETURNING *;

-- Set Item values
UPDATE Item SET quantity = 70 WHERE ID = 6;

-- Set Trailer name
UPDATE Trailer SET tname = 'Trailer 3 - Renamed' WHERE ID = 3;

-- Remove Item
DELETE FROM Item
  WHERE ID = 6 -- Hardcoded Example
  RETURNING *;

-- Remove Trailer
DELETE FROM Trailer
  WHERE ID = 3 -- Hardcoded Example
  RETURNING *;

-- Login
-- Get number of users with name and password
SELECT userType
  FROM Users
  WHERE Users.username = 'Site1' -- Hardcoded Example 
    AND Users.password = 'Site1' -- Hardcoded Example 

-- Get number of users with username
SELECT COUNT(*)
  FROM Users
  WHERE Users.username = 'Site1' -- Hardcoded Example

-- Add user
INSERT INTO Users
  VALUES ('Volunteer2', 'Volunteer2', 'Volunteer') -- Hardcoded Example

-- Currently no mechanism to recover password - potential feature
-- Set user password

-- Remove user -- Delete references first
DELETE FROM TrailerUser
  WHERE UID = 'Volunteer2' -- Hardcoded Example
  RETURNING *;
DELETE FROM Users
  WHERE username = 'Volunteer2' -- Hardcoded Example
  RETURNING *;


-- Events
-- Get All events
SELECT *
  FROM Events

-- Get All upcoming events
SELECT * 
  FROM Events
  WHERE date(now()) <= date(Events.time)

-- Add Event
INSERT INTO Events
  VALUES (DEFAULT, 'Banquet', NOW(), 'Celebration!') -- Hardcoded Example

-- Set Event information
UPDATE Events SET name = 'Fall Banquet' WHERE ID = 3; -- Hardcoded Example

-- Remove Event
DELETE FROM Events
  WHERE ID = 3 -- Hardcoded Example
  RETURNING *;