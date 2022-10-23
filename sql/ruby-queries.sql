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

-- Add Trailer

-- Set Item values

-- Set Trailer name

-- Remove Item

-- Remove Trailer

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

-- Currently no mechanism to recover password - potential feature
-- Set user password

-- Remove user

-- Events
-- Get All events
SELECT *
  FROM Events

-- Get All upcoming events

-- Add Event

-- Set Event information

-- Remove Event