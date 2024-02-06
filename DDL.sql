/*
DDL and DML for teh 'Game Quest' Video game store database system

by Jovanny Gochez and Matt Villa

Code was generated by MySQL workbench and modified by the team members.
*/

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
-- -----------------------------------------------------
-- Table Developers
-- -----------------------------------------------------
DROP TABLE IF EXISTS Developers;
CREATE TABLE IF NOT EXISTS Developers (
    developerID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (developerID)
);
-- -----------------------------------------------------
-- Table Franchises
-- -----------------------------------------------------
DROP TABLE IF EXISTS Franchises;
CREATE TABLE IF NOT EXISTS Franchises (
    franchiseID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (franchiseID)
);
-- -----------------------------------------------------
-- Table Games
-- -----------------------------------------------------
DROP TABLE IF EXISTS Games;
CREATE TABLE IF NOT EXISTS Games (
    gameID INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NOT NULL,
    releaseYear VARCHAR(45) NOT NULL,
    price DECIMAL(19, 2) NOT NULL,
    developerID INT NULL,
    franchiseID INT NULL,
    activeInventory TINYINT DEFAULT 1,
    PRIMARY KEY (gameID),
    UNIQUE (title, releaseYear),
    -- The developer and franchise are not critical info, so if those entries are deleted from the other tables, it will simply be set to null here.
    FOREIGN KEY (developerID) REFERENCES Developers(developerID) ON DELETE SET NULL,
    FOREIGN KEY (franchiseID) REFERENCES Franchises(franchiseID) ON DELETE SET NULL
);
-- -----------------------------------------------------
-- Table Genres
-- -----------------------------------------------------
DROP TABLE IF EXISTS Genres;
CREATE TABLE IF NOT EXISTS Genres (
    genreID INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (genreID)
);
-- -----------------------------------------------------
-- Table Customers
-- -----------------------------------------------------
DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS Customers (
    customerID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(45) NULL,
    lastName VARCHAR(45) NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    rewardPoints INT NOT NULL DEFAULT 0,
    activeCustomer TINYINT NOT NULL DEFAULT 1,
    PRIMARY KEY (customerID)
);
-- -----------------------------------------------------
-- Table Orders
-- -----------------------------------------------------
DROP TABLE IF EXISTS Orders;
CREATE TABLE IF NOT EXISTS Orders (
    orderID INT NOT NULL AUTO_INCREMENT,
    date DATETIME NOT NULL,
    customerID INT NULL,
    PRIMARY KEY (orderID),
    -- From the application, the customers will only be able to be deleted if its not associated with an order, but if its not then it can be deleted. The entire order should not be deleted if a customer is deleted administratively, so the entry will just be set to null in that case.
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE SET NULL
);
-- -----------------------------------------------------
-- Table Platforms
-- -----------------------------------------------------
DROP TABLE IF EXISTS Platforms;
CREATE TABLE IF NOT EXISTS Platforms (
    platformID INT NOT NULL,
    name VARCHAR(45) NOT NULL UNIQUE,
    PRIMARY KEY (platformID)
);
-- -----------------------------------------------------
-- Table OrderHasGames
-- -----------------------------------------------------
DROP TABLE IF EXISTS OrderHasGames;
CREATE TABLE IF NOT EXISTS OrderHasGames (
    orderHasGamesID INT NOT NULL AUTO_INCREMENT,
    gameID INT NOT NULL,
    orderID INT NOT NULL,
    PRIMARY KEY (orderHasGamesID),
    -- The application logic will not allow deletion of orders since they are important historical transactions. If a game is associated with an order, it will also not be allowed to be deleted, but can be marked 'inactive'. This is needed to preserve transaction history. However if for admin reasons, the games or orders are desired to be deleted, it will clean up the records here in the junction table.
    FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table PlatformHasGames
-- -----------------------------------------------------
DROP TABLE IF EXISTS PlatformHasGames;
CREATE TABLE IF NOT EXISTS PlatformHasGames (
    platformHasGamesID INT NOT NULL AUTO_INCREMENT,
    gameID INT NOT NULL,
    platformID INT NOT NULL,
    PRIMARY KEY (platformHasGamesID),
    UNIQUE(gameID, platformID),
    -- deleting a game or platform should delete its entry in this junction table
    FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    FOREIGN KEY (platformID) REFERENCES Platforms(platformID) ON DELETE CASCADE
);
-- -----------------------------------------------------
-- Table GameHasGenres
-- -----------------------------------------------------
DROP TABLE IF EXISTS GameHasGenres;
CREATE TABLE IF NOT EXISTS GameHasGenres (
    gameHasGenresID INT NOT NULL AUTO_INCREMENT,
    gameID INT NOT NULL,
    genreID INT NOT NULL,
    PRIMARY KEY (gameHasGenresID),
    UNIQUE (gameID, genreID),
    -- deleting a game or genre should delete its entry in this junction table
    FOREIGN KEY (gameID) REFERENCES Games(gameID) ON DELETE CASCADE,
    FOREIGN KEY (genreID) REFERENCES Genres(genreID) ON DELETE CASCADE
);


-- Developers and Franchise data needs to be loaded first
-- -----------------------------------------------------
-- Data for table Developers
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Developers (developerID, name)
VALUES (1, 'Activision Blizzard');
INSERT INTO Developers (developerID, name)
VALUES (2, 'Epic Games');
INSERT INTO Developers (developerID, name)
VALUES (3, 'Electronic Arts');
INSERT INTO Developers (developerID, name)
VALUES (4, 'Rockstar Games');
INSERT INTO Developers (developerID, name)
VALUES (5, 'Nintendo');
INSERT INTO Developers (developerID, name)
VALUES (6, 'DMA Design');
INSERT INTO Developers (developerID, name)
VALUES (7, 'ConcernedApe');
COMMIT;
-- -----------------------------------------------------
-- Data for table Franchises
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Franchises (franchiseID, title)
VALUES (1, 'Halo');
INSERT INTO Franchises (franchiseID, title)
VALUES (2, 'Zelda');
INSERT INTO Franchises (franchiseID, title)
VALUES (3, 'Grand Theft Auto');
INSERT INTO Franchises (franchiseID, title)
VALUES (4, 'Mario');
INSERT INTO Franchises (franchiseID, title)
VALUES (5, 'Pokemon');
COMMIT;
-- -----------------------------------------------------
-- Data for table Games
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Games (
        gameID,
        title,
        releaseYear,
        price,
        developerID,
        franchiseID
    )
VALUES (1, 'Super Mario World', '1990', 10.00, 5, 4);
INSERT INTO Games (
        gameID,
        title,
        releaseYear,
        price,
        developerID,
        franchiseID
    )
VALUES (2, 'Grand Theft Auto', '1997', 10.00, 6, 3);
INSERT INTO Games (
        gameID,
        title,
        releaseYear,
        price,
        developerID,
        franchiseID
    )
VALUES (3, 'Stardew Valley', '2016', 39.99, 7, NULL);
INSERT INTO Games (
        gameID,
        title,
        releaseYear,
        price,
        developerID,
        franchiseID
    )
VALUES (4, 'Tennis For Two', '1958', 500.00, NULL, NULL);
INSERT INTO Games (
        gameID,
        title,
        releaseYear,
        price,
        developerID,
        franchiseID
    )
VALUES (5, 'Super Mario RPG', '2023', 59.99, 5, 4);
COMMIT;
-- -----------------------------------------------------
-- Data for table Genres
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Genres (genreID, name)
VALUES (1, 'Roleplaying');
INSERT INTO Genres (genreID, name)
VALUES (2, 'First Person Shooter');
INSERT INTO Genres (genreID, name)
VALUES (3, 'Platformer');
INSERT INTO Genres (genreID, name)
VALUES (4, 'Action');
INSERT INTO Genres (genreID, name)
VALUES (5, 'Fighting');
INSERT INTO Genres (genreID, name)
VALUES (6, 'Survival');
INSERT INTO Genres (genreID, name)
VALUES (7, 'Crafting');
INSERT INTO Genres (genreID, name)
VALUES (8, 'Sports');
INSERT INTO Genres (genreID, name)
VALUES (9, 'Farming');
COMMIT;
-- -----------------------------------------------------
-- Data for table Customers
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Customers (
        customerID,
        firstName,
        lastName,
        email,
        rewardPoints
    )
VALUES (1, 'Jackie', 'Harell', 'jh@amazon.com', 58);
INSERT INTO Customers (
        customerID,
        firstName,
        lastName,
        email,
        rewardPoints
    )
VALUES (
        2,
        'Nigel',
        'Thornberry',
        'nicktoons@yahoo.com',
        12
    );
COMMIT;
-- -----------------------------------------------------
-- Data for table Orders
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Orders (orderID, date, customerID)
VALUES (1, '2021-10-01', 1);
INSERT INTO Orders (orderID, date, customerID)
VALUES (2, '2021-09-11', NULL);
INSERT INTO Orders (orderID, date, customerID)
VALUES (3, '2021-08-21', NULL);
INSERT INTO Orders (orderID, date, customerID)
VALUES (4, '2022-01-13', NULL);
INSERT INTO Orders (orderID, date, customerID)
VALUES (5, '2022-01-25', NULL);
INSERT INTO Orders (orderID, date, customerID)
VALUES (6, '2022-06-05', NULL);
INSERT INTO Orders (orderID, date, customerID)
VALUES (7, '2022-07-14', 2);
COMMIT;
-- -----------------------------------------------------
-- Data for table Platforms
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO Platforms (platformID, name)
VALUES (1, 'PC');
INSERT INTO Platforms (platformID, name)
VALUES (2, 'Oscilloscope');
INSERT INTO Platforms (platformID, name)
VALUES (3, 'Super Nintendo');
INSERT INTO Platforms (platformID, name)
VALUES (4, 'Nintendo Switch');
INSERT INTO Platforms (platformID, name)
VALUES (5, 'Playstation 5');
INSERT INTO Platforms (platformID, name)
VALUES (6, 'Xbox 360');
INSERT INTO Platforms (platformID, name)
VALUES (7, 'Xbox Series X');
COMMIT;
-- -----------------------------------------------------
-- Data for table OrderHasGames
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (1, 1, 1);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (2, 2, 1);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (3, 4, 2);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (4, 1, 3);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (5, 2, 4);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (6, 3, 4);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (7, 4, 4);
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (8, 4, 4);
COMMIT;
-- -----------------------------------------------------
-- Data for table PlatformHasGames
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (1, 4, 2);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (2, 3, 1);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (3, 3, 4);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (4, 3, 7);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (5, 3, 5);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (6, 1, 3);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (7, 1, 4);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (8, 2, 1);
INSERT INTO PlatformHasGames (platformHasGamesID, gameID, platformID)
VALUES (9, 5, 4);
COMMIT;
-- -----------------------------------------------------
-- Data for table GameHasGenres
-- -----------------------------------------------------
START TRANSACTION;
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (1, 1, 3);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (2, 1, 4);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (3, 2, 4);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (4, 3, 7);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (5, 3, 9);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (6, 4, 8);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (7, 5, 1);
INSERT INTO GameHasGenres (gameHasGenresID, gameID, genreID)
VALUES (8, 5, 4);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;