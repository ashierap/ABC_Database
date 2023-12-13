DROP DATABASE IF EXISTS game;
CREATE DATABASE game;
USE game;


CREATE TABLE PlayerInfo (
    playerId INT NOT NULL AUTO_INCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    userName TEXT NOT NULL,
    PRIMARY KEY (playerId)
);



CREATE TABLE GameType (
    gameId INT NOT NULL AUTO_INCREMENT,
    gameName TEXT NOT NULL,
    highestScore INT NOT NULL,
    playerId INT NOT NULL,
    PRIMARY KEY (gameId),
    FOREIGN KEY (playerId) REFERENCES PlayerInfo(playerId)
);


CREATE TABLE Product (
    productId INT NOT NULL AUTO_INCREMENT,
    productName TEXT NOT NULL,
    productAmount INT NOT NULL,
    productPrice INT NOT NULL,  
    PRIMARY KEY (productId) 
  );

CREATE TABLE Discount (
    discountId INT NOT NULL AUTO_INCREMENT,
    discountAmount INT NOT NULL,  
    discountName TEXT NOT NULL,
    PRIMARY KEY (discountId),
);



-- Insert data into Discount table
INSERT INTO Discount (discountAmount, discountName) VALUES (5, '5% OFF');
INSERT INTO Discount (discountAmount, discountName) VALUES (10, '10% OFF');
INSERT INTO Discount (discountAmount, discountName) VALUES (20, '20% OFF');
INSERT INTO Discount (discountAmount, discountName) VALUES (50, '50% OFF');

-- Insert data into PlayerInfo table
INSERT INTO PlayerInfo (FirstName, LastName, userName) VALUES ('Thelonious', 'Monk', 'MONKEY_MAN');
INSERT INTO PlayerInfo (FirstName, LastName, userName) VALUES ('Sonny', 'Rollins', 'ROLLIN_STONED');
INSERT INTO PlayerInfo (FirstName, LastName, userName) VALUES ('Steve', 'Lehman', 'STEVE_JOBS');
INSERT INTO PlayerInfo (FirstName, LastName, userName) VALUES ('Cameron', 'Brown', 'KING_MAC');


-- Insert data into GameType table
INSERT INTO GameType (gameName, highestScore, playerId) VALUES ('RPSLS', 4, 4);
INSERT INTO GameType (gameName, highestScore, playerId) VALUES ('Snake', 720, 4);
INSERT INTO GameType (gameName, highestScore, playerId) VALUES ('Adventure', 20, 4);
INSERT INTO GameType (gameName, highestScore, playerId) VALUES ('Boxing', 10, 4);

-- Insert data into Product table
INSERT INTO Product (productName, productAmount, productPrice) VALUES ('Bucket_Hat', 22, 32);
INSERT INTO Product (productName, productAmount, productPrice) VALUES ('Fanny_Pack', 12, 32);
INSERT INTO Product (productName, productAmount, productPrice) VALUES ('HighRoller_Shades', 25, 70);
INSERT INTO Product (productName, productAmount, productPrice) VALUES ('Vision_Shades', 18, 50);












/*
CREATE VIEW 
pianoplayers AS 
SELECT FirstName, LastName FROM musicians 
JOIN instrumentsplayed ON musicians.Id = instrumentsplayed.Musician
WHERE instrumentsplayed.Instrument = 'Piano';

INSERT INTO musicians (Id, FirstName, LastName, Born) VALUES (4, 'Art', 'Tatum', 1909);
INSERT INTO instrumentsplayed (Id, Musician, Instrument) VALUES (5, 4, 'Piano');

update instrumentsplayed set Instrument='drums' where Id=5;

ALTER TABLE musicians MODIFY COLUMN Id INT NOT NULL AUTO_INCREMENT;

INSERT INTO musicians (FirstName, LastName, Born) VALUES ('Bill', 'Evans', 1908);


DELIMITER $$
CREATE PROCEDURE saxes()
BEGIN

  SELECT FirstName, LastName FROM musicians
  JOIN instrumentsplayed ON musicians.Id = instrumentsplayed.Musician
  WHERE instrumentsplayed.Instrument = 'Saxophone';

  
END
$$
DELIMITER ;

 

*/