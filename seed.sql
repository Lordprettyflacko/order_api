TRUNCATE TABLE store, employee RESTART IDENTITY;

INSERT INTO store (name, location) VALUES ('Blockbuster', 'Alameda');
INSERT INTO store (name, location) VALUES ('Gamestop', 'Pasadena');


INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('simon', 'manager','full-time', 1);
INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('monica', 'manager','part-time', 1);
INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('joe', 'Clerk','full-time', 1);
INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('angela', 'clerk','part-time', 1);

INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('steven', 'manager','full-time', 2);
INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('brandon', 'manager','part-time', 2);
INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('joanne', 'Clerk','full-time', 2);
INSERT INTO employee (name, position, full_or_part, store_id) VALUES ('angelo', 'clerk','part-time', 2);


