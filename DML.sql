/* 
 Database queries for the Game Quest Video Catalog Database
 By Jovanny Gochez and Matthew Villa
 
 !colon: character being used to denote the variables that will have data from the backend programming language
 */
/*
 
 Games queries
 
 */
-- -----------------------------------------------------
-- Read Game
-- -----------------------------------------------------
SELECT Games.gameID AS `Game ID`,
    Games.title AS `Title`,
    Games.releaseYear AS `Release Year`,
    CONCAT('$', Games.price) AS `Price`,
    Developers.name as `Developer`,
    Franchises.title as `Franchise`,
FROM Games
    LEFT JOIN Developers ON Developers.developerID = Games.developerID
    LEFT JOIN Franchises ON Franchises.franchiseID = Games.franchiseID
ORDER BY Games.gameID;
-- -----------------------------------------------------
--Create Game
-- -----------------------------------------------------
INSERT INTO Games (
        title,
        releaseYear,
        price,
        developerID,
        franchiseID,
    )
VALUES (
        :gameTitle,
        :gameReleaseYear,
        :price,
        :developer,
        :franchise
    );
-- -----------------------------------------------------
-- Update Game
-- -----------------------------------------------------
UPDATE Games
SET title = :newGameTitle,
    releaseYear = :newGameReleaseYear,
    price = :newPrice,
    developerID = :newDeveloper,
    franchiseID = :newFranchise,
WHERE gameID = :gameIDtoUpdate;
-- -----------------------------------------------------
--Delete Game
-- -----------------------------------------------------
DELETE FROM Games
WHERE gameID = :gameIDToDelete;

/* 
 
 Platforms page queries
 
 */
-- -----------------------------------------------------
--Read Platform
-- -----------------------------------------------------
SELECT platformID,
    name
FROM Platforms
ORDER BY name;
-- -----------------------------------------------------
--Create Platform
-- -----------------------------------------------------
INSERT INTO Platforms (name)
VALUES (:platformName);
-- -----------------------------------------------------
--Update Platform
-- -----------------------------------------------------
UPDATE Platforms
SET platformID = :idOfPlatformToUpdate,
    name = :newName
WHERE platformID = :idOfPlatformToUpdate;
-- -----------------------------------------------------
--Delete Platform 
-- -----------------------------------------------------
DELETE FROM Platforms
WHERE platformID = :platformIDToDelete;
/*
 
 Games-Platforms queries 
 
 */
-- -----------------------------------------------------
--Read Game-Platform 
-- -----------------------------------------------------
SELECT GameHasPlatforms.gameHasPlatformID,
    Games.title as `Game`,
    Platforms.name as `Platform`
FROM GameHasPlatforms
    JOIN Games ON Games.gameID = GameHasPlatforms.gameID
    JOIN Platforms ON Platforms.platformID = GameHasPlatforms.platformID
ORDER BY Games.title;
-- -----------------------------------------------------
--Create Game-Platform 
-- -----------------------------------------------------
INSERT INTO GameHasPlatforms (gameID, platformID)
VALUES (
    :gameID,
    :platformID
    );
-- -----------------------------------------------------
--Update Game-Platform 
-- -----------------------------------------------------
UPDATE GameHasPlatforms
SET gameHasPlatformID = :gameHasPlatformIDToUpdate,
    gameID = :newGameID,
    platformID = :newPlatformID
WHERE gameHasPlatformID = :gameHasPlatformIDToUpdate;
-- -----------------------------------------------------
--Delete Game-Platform 
-- -----------------------------------------------------
DELETE FROM GameHasPlatforms
WHERE gameHasPlatformID = :gameHasPlatformIDToDelete;
/*
 
 Franchises queries
 
 */
-- -----------------------------------------------------
--Read Franchise
-- -----------------------------------------------------
SELECT franchiseID AS `Franchise ID`,
    title AS `Title`
FROM Franchises
ORDER BY title;
-- -----------------------------------------------------
--Create Franchise
-- -----------------------------------------------------
INSERT INTO Franchises (title)
VALUES (:titleOfFranchise);
-- -----------------------------------------------------
--Update Franchise
-- -----------------------------------------------------
UPDATE Franchises
SET franchiseID = :franchiseIDToUpdate,
    title = :newTitle
WHERE franchiseID = :franchiseIDToUpdate;
-- -----------------------------------------------------
--Delete Franchise
-- -----------------------------------------------------
DELETE FROM Franchises
WHERE franchiseID = :franchiseIDToDelete;
/*
 
 Developers Queries
 
 */
-- -----------------------------------------------------
--Read Developer
-- -----------------------------------------------------
SELECT developerID AS `Developer ID`,
    name AS `Name`
FROM Developers
ORDER BY name;
-- -----------------------------------------------------
--Create Developer
-- -----------------------------------------------------
INSERT INTO Developers (name)
VALUES (:nameOfDeveloper);
-- -----------------------------------------------------
--Update Developer
-- -----------------------------------------------------
UPDATE Developer
SET developerID = :developerIDToUpdate,
    name = :newName
WHERE developerID = :developerIDToUpdate;
-- -----------------------------------------------------
--Delete Developer
-- -----------------------------------------------------
DELETE FROM Developers
WHERE developerID = :developerIDToUpdate;