-- Test data to insert into database
-- Trailers (ID, tname);
INSERT INTO Trailers VALUES (DEFAULT, 'Trailer 1');
INSERT INTO Trailers VALUES (DEFAULT, 'Trailer 2');

-- Temporary clear text passwords, will be updated
-- Users (username, password, userType);
INSERT INTO Users VALUES ('Site1', '$2a$10$eJFQzk1zl6FoX4.E31XdZeFo5YSl5SsdmlEISNZORwZ7Pm2lgl6ru', 'Site');
INSERT INTO Users VALUES ('Volunteer1', '$2a$10$eJFQzk1zl6FoX4.E31XdZe9CniJn4Lw7F9dhJD55LaOn9wyzf3QSG', 'Volunteer');
INSERT INTO Users VALUES ('Admin1', '$2a$10$eJFQzk1zl6FoX4.E31XdZeDL3epOW9bCw5CvrxX32qVd7h0TsAaXm', 'Admin');

-- Events (ID, name, time, description);
INSERT INTO Events VALUES (DEFAULT, 'Clothes Distribution', '2022-11-28 15:20:00', 'Distribute clothing donations to GR families');
INSERT INTO Events VALUES (DEFAULT, 'Food Distribution', '2022-12-29 13:40:00', 'Distribute food');

-- Items (ID, TID, iname, quantity, notificationlevel, increment);
INSERT INTO Items VALUES (DEFAULT, 1, 'Cups', 300, 50, 25);
INSERT INTO Items VALUES (DEFAULT, 2, 'Cups', 100, 150, 50);
INSERT INTO Items VALUES (DEFAULT, 1, 'Spoons', 100, 10, 40);
INSERT INTO Items VALUES (DEFAULT, 1, 'Forks', 800, 100, 150);
INSERT INTO Items VALUES (DEFAULT, 2, 'Plates', 200, 75, 40);

-- TrailerUsers (TID, UID);
INSERT INTO TrailerUsers VALUES (1, 'Site1');
INSERT INTO TrailerUsers VALUES (1, 'Admin1');
INSERT INTO TrailerUsers VALUES (2, 'Admin1');