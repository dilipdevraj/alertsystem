
CREATE DATABASE Driver_Info;
USE PDLab; -- Ensure you're using the correct database


CREATE TABLE driversV4 (
    id int PRIMARY KEY,
    name VARCHAR(255),
    age int,
    experience int,
    rating int,
    image MEDIUMBLOB
);
-- Replace the image data with your actual image data or use LOAD_FILE() if loading from file
INSERT INTO driversV4 VALUES (1, 'Ankubbt Samal', 24, 2, 9, NULL); -- Insert image data as needed or use NULL if not available
INSERT INTO driversV4 VALUES (2, 'Bnkiuhiuit Samal', 24, 2, 10, NULL);
INSERT INTO driversV4 VALUES (3, 'Cnkit Samhal', 24, 2, 6, NULL);
INSERT INTO driversV4 VALUES (4, 'Dnkit Samuihual', 24, 2, 9, NULL);
INSERT INTO driversV4 VALUES (5, 'Enkit Samuihual', 41, 10, 9, NULL);
INSERT INTO driversV4 VALUES (6, 'Fnkit Pamuuhal', 38, 3, 8, NULL);
DELETE FROM driversV4 WHERE id = 6;

select * from driversV4;
update driversV4 set age = 38 where id = 4;
UPDATE driversV4 SET image = LOAD_FILE('/home/virlin/Desktop/PD_Lab/28_03/Front_End/driver1.jpg') WHERE id = 1;

UPDATE `PDLab`.`driversV4`
SET `image` = LOAD_FILE('/home/virlin/Desktop/PD_Lab/28_03/Front_End/driver2.jpg')
WHERE `id` = 2;

ALTER TABLE driversV4 ADD COLUMN violations INT DEFAULT 0;
ALTER TABLE driversV4 ADD COLUMN ranking INT DEFAULT 0;

