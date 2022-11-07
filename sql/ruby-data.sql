-- Test data to insert into database
INSERT INTO Trailer VALUES (DEFAULT, 'Trailer 1');
INSERT INTO Trailer VALUES (DEFAULT, 'Trailer 2');

-- Temporary clear text passwords, will be updated
INSERT INTO User VALUES ('Site1', 'Site1', 'Site');
INSERT INTO User VALUES ('Volunteer1', 'Volunteer1', 'Volunteer');
INSERT INTO User VALUES ('Admin1', 'Admin1', 'Admin');

INSERT INTO Event VALUES (DEFAULT, 'Clothes Distribution', '2022-11-28 15:20:00', 'Distribute clothing donations to GR families');
INSERT INTO Event VALUES (DEFAULT, 'Food Distribution', '2022-12-29 13:40:00', 'Distribute food');

INSERT INTO Item VALUES (DEFAULT, 1, 'Cups', 300, 50, 25);
INSERT INTO Item VALUES (DEFAULT, 2, 'Cups', 100, 150, 50);
INSERT INTO Item VALUES (DEFAULT, 1, 'Spoons', 100, 10, 40);
INSERT INTO Item VALUES (DEFAULT, 1, 'Forks', 800, 100, 150);
INSERT INTO Item VALUES (DEFAULT, 2, 'Plates', 200, 75, 40);

INSERT INTO TrailerUser VALUES (1, 'Site1');
INSERT INTO TrailerUser VALUES (1, 'Admin1');
INSERT INTO TrailerUser VALUES (2, 'Admin1');