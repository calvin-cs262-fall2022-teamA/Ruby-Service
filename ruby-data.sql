-- Test data to insert into database
INSERT INTO Trailer VALUES (1, 'Trailer 1');
INSERT INTO Trailer VALUES (2, 'Trailer 2');

INSERT INTO Users VALUES ('Site1', 'Site1', 'Site');
INSERT INTO Users VALUES ('Volunteer1', 'Volunteer1', 'Volunteer');
INSERT INTO Users VALUES ('Admin1', 'Admin1', 'Admin');

INSERT INTO Events VALUES (1, 'Clothes Distribution', '2022-11-28 15:20:00', 'Distribute clothing donations to GR families');
INSERT INTO Events VALUES (2, 'Food Distribution', '2022-12-29 13:40:00', 'Distribute food');

INSERT INTO Item VALUES (1, 1, 'Cups', 300, 50, 25);
INSERT INTO Item VALUES (2, 2, 'Cups', 500, 150, 50);
INSERT INTO Item VALUES (3, 1, 'Spoons', 100, 10, 40);
INSERT INTO Item VALUES (4, 1, 'Forks', 800, 100, 150);
INSERT INTO Item VALUES (5, 2, 'Plates', 200, 75, 40);

INSERT INTO TrailerUser VALUES (1, 'Site1');
INSERT INTO TrailerUser VALUES (1, 'Admin1');
INSERT INTO TrailerUser VALUES (2, 'Admin1');