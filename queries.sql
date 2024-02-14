/* 
 Database queries for the Game Quest Video Store Database
 By Jovanny Gochez and Matthew Villa
 
 !colon: character being used to denote the variables that will have data from the backend programming language
 */
/*
 
 Games queries
 
 */
-- -----------------------------------------------------
-- Get all the games in inventory
-- -----------------------------------------------------
SELECT Games.gameID AS `Game ID`,
    Games.title AS `Title`,
    Games.releaseYear AS `Release Year`,
    CONCAT('$', Games.price) AS `Price`,
    Developers.name as `Developer`,
    Franchises.title as `Franchise`,
    Games.activeInventory AS `Active Inventory`
FROM Games
    LEFT JOIN Developers ON Developers.developerID = Games.developerID
    LEFT JOIN Franchises ON Franchises.franchiseID = Games.franchiseID
ORDER BY Games.gameID;
-- -----------------------------------------------------
--Insert a new game
-- -----------------------------------------------------
INSERT INTO Games (
        title,
        releaseYear,
        price,
        developerID,
        franchiseID
    )
VALUES (
        :gameTitle,
        :gameReleaseYear,
        :price,
        :developer,
        :franchise
    );
-- -----------------------------------------------------
-- Update a game, given the id
-- -----------------------------------------------------
UPDATE Games
SET title = :newGameTitle,
    releaseYear = :newGameReleaseYear,
    price = :newPrice,
    developerID = :newDeveloper,
    franchiseID = :newFranchise,
    activeInventory = :newInventoryStatus
WHERE gameID = :gameIDtoUpdate;
-- -----------------------------------------------------
--Delete a game
-- -----------------------------------------------------
DELETE FROM Games
WHERE gameID = :gameIDToDelete;
/*
 
 Genres queries
 
 */
-- -----------------------------------------------------
-- Get all the genres of games
-- -----------------------------------------------------
SELECT genreID,
    name as `Name`
FROM Genres
ORDER BY name;
-- -----------------------------------------------------
--Insert a new Genre
-- -----------------------------------------------------
INSERT INTO Genres (name)
VALUES (:genreName);
-- -----------------------------------------------------
-- Update a genre, given the id
-- -----------------------------------------------------
UPDATE Genres
SET name = :genreName
WHERE genreID = :genreIDtoUpdate;
-- -----------------------------------------------------
--Delete a genre 
-- -----------------------------------------------------
DELETE FROM Genres
WHERE genreID = :genreIDToDelete;
--
/* 
 
 Games-Genres queries
 
 */
-- -----------------------------------------------------
--Get all the games and genre combinations
-- -----------------------------------------------------
SELECT GameHasGenres.gameHasGenreID,
    Games.title as `Game`,
    Genres.name as `Genre`,
    FROM GameHasGenres
    JOIN Games ON Games.gameID = GameHasGenres.gameID
    JOIN Genres ON Genres.genreID = GameHasGenres.genreID
ORDER BY Games.title;
-- -----------------------------------------------------
--Add a new Game-Genre Relationship
-- -----------------------------------------------------
INSERT INTO GameHasGenres (gameID, genreID)
VALUES (:game, :genre,);
-- -----------------------------------------------------
--Update a Game-Genre relationship, given the id
-- -----------------------------------------------------
UPDATE GameHasGenres
SET gameHasGenreID = :gameHasGenreIDToUpdate,
    gameID = :gameID,
    genreID = :genreID
WHERE gameHasGenreID = :gameHasGenreIDToUpdate;
-- -----------------------------------------------------
--Delete a Game-Genre relationship
-- -----------------------------------------------------
DELETE FROM GameHasGenres
WHERE gameHasGenreID = :gameHasGenresIDToDelete;
/* 
 
 Platforms page queries
 
 */
-- -----------------------------------------------------
--Get all the platforms
-- -----------------------------------------------------
SELECT platformID,
    name
FROM Platforms
ORDER BY name;
-- -----------------------------------------------------
--Add a new Platform
-- -----------------------------------------------------
INSERT INTO Platforms (name)
VALUES (:platformName);
-- -----------------------------------------------------
--Update a Platform
-- -----------------------------------------------------
UPDATE Platforms
SET platformID = :idOfPlatformToUpdate,
    name = :newName
WHERE platformID = :idOfPlatformToUpdate;
-- -----------------------------------------------------
--Delete a Platform 
-- -----------------------------------------------------
DELETE FROM Platforms
WHERE platformID = :platformIDToDelete;
/*
 
 Game-Platform queries
 
 */
-- -----------------------------------------------------
--Get all the Game-Platform relationships
-- -----------------------------------------------------
SELECT GameHasPlatforms.gameHasPlatformID,
    Games.title as `Game`,
    Platforms.name as `Platform`
FROM GameHasPlatforms
    JOIN Games ON Games.gameID = GameHasPlatforms.gameID
    JOIN Platforms ON Platforms.platformID = GameHasPlatforms.platformID
ORDER BY Games.title;
-- -----------------------------------------------------
--Add a new Game-Platform relationship
-- -----------------------------------------------------
INSERT INTO GameHasPlatforms (gameID, platformID)
VALUES (:idOfGameToAddPlatform, :idOfPlatformToAddToGame);
-- -----------------------------------------------------
--Update a Game-Platform relationship
-- -----------------------------------------------------
UPDATE GameHasPlatforms
SET gameHasPlatformID = :gameHasPlatformIDToUpdate,
    gameID = :newGameID,
    platformID = :newPlatformID
WHERE gameHasPlatformID = :gameHasPlatformIDToUpdate;
-- -----------------------------------------------------
--Delete a Game-Platform relationship
-- -----------------------------------------------------
DELETE FROM GameHasPlatforms
WHERE gameHasPlatformID = :gameHasPlatformIDToDelete;
/* 
 
 Orders page queries
 
 */
-- -----------------------------------------------------
--Get all the orders
-- -----------------------------------------------------
Select orderID,
    date AS `Date`,
    customerID AS `Customer ID`
FROM Orders;
-- -----------------------------------------------------
--Update an order
-- -----------------------------------------------------
UPDATE Orders
SET orderID = :idOfOrderToUpdate,
    date = :newDate,
    customerID = :idOfCustomerToUpdate
WHERE orderID = :idOfOrderToUpdate;
-- -----------------------------------------------------
--Add a new order
-- -----------------------------------------------------
INSERT INTO Orders (date, customerID)
VALUES (
        :dateOfOrder,
        :idOfCustomerForOrder
    );
-- -----------------------------------------------------
--Delete an Order
-- -----------------------------------------------------
DELETE FROM Orders
WHERE orderID = :orderIDToDelete;
/*
 
 Game-Order queries
 
 */
-- -----------------------------------------------------
--Get all the Game-Order relationships
-- -----------------------------------------------------
SELECT GameHasOrders.gameHasOrderID,
    Games.title AS `Game`,
    Orders.date AS `Order Date`
FROM GameHasOrders
    JOIN Games ON Games.gameID = GameHasOrders.gameID
    JOIN Orders ON Orders.orderID = GameHasOrders.orderID
ORDER BY Games.title;
-- -----------------------------------------------------
--Add a new Game-Order relationship
-- -----------------------------------------------------
INSERT INTO GameHasOrders (gameHasOrderID, gameID, orderID)
VALUES (
        :idOfGameOrder,
        :idOfGameOnOrder,
        :idOfOrderWithGame
    );
-- -----------------------------------------------------
--update a Game-Order relationship
-- -----------------------------------------------------
UPDATE GameHasOrders
SET gameHasOrderID = :idOfGameOrder,
    gameID = :newGameID,
    platformID = :newPlatformID
WHERE gameHasOrderID = :idOfGameOrder;
-- -----------------------------------------------------
--Delete a Game-Order relationship
-- -----------------------------------------------------
DELETE FROM GameHasOrders
WHERE gameHasOrderID = :gameHasOrderIDToDelete;
/* 
 
 Customers queries
 
 */
-- -----------------------------------------------------
--Get all of the customers
-- -----------------------------------------------------
SELECT customerID AS `Customer ID`,
    firstName AS `First Name`,
    lastName AS `Last Name`,
    email AS `Email`,
    rewardPoints AS `Reward Points`,
    activeCustomer AS `Active Customer`
FROM Customers;
-- -----------------------------------------------------
--Add a new customer
-- -----------------------------------------------------
INSERT INTO Customers (
        firstName,
        lastName,
        email,
        rewardPoints
    )
VALUES (
        :firstName,
        :lastName,
        :email,
        :startingRewardPoints
    );
-- -----------------------------------------------------
--Update a customer
-- -----------------------------------------------------
UPDATE Customers
SET customerID = :idOfCustomerToUpdate,
    firstName = :newFirstName,
    lastName = :newLastName,
    email = :newEmail,
    rewardPoints = :newRewardPoints,
    activeCustomer = :newActiveCustomerStatus
WHERE customerID = :idOfCustomerToUpdate;
-- -----------------------------------------------------
--Delete a Customer
-- -----------------------------------------------------
DELETE FROM Customers
WHERE customerID = :customerIDToDelete;
/*
 
 Franchises queries
 
 */
-- -----------------------------------------------------
--Get all of the franchises
-- -----------------------------------------------------
SELECT franchiseID AS `Franchise ID`,
    title AS `Title`
FROM Franchises
ORDER BY title;
-- -----------------------------------------------------
--Add a new Franchise
-- -----------------------------------------------------
INSERT INTO Franchises (title)
VALUES (:titleOfFranchise);
-- -----------------------------------------------------
--Update a Franchise
-- -----------------------------------------------------
UPDATE Franchises
SET franchiseID = :franchiseIDToUpdate,
    title = :newTitle
WHERE franchiseID = :franchiseIDToUpdate;
-- -----------------------------------------------------
--Delete a Franchise
-- -----------------------------------------------------
DELETE FROM Franchises
WHERE franchiseID = :franchiseIDToDelete;
/*
 
 Developers Queries
 
 */
-- -----------------------------------------------------
--Get all of the Developers
-- -----------------------------------------------------
SELECT developerID AS `Developer ID`,
    name AS `Name`
FROM Developers
ORDER BY name;
-- -----------------------------------------------------
--Add a new Developer
-- -----------------------------------------------------
INSERT INTO Developers (name)
VALUES (:nameOfDeveloper);
-- -----------------------------------------------------
--Update a Developer
-- -----------------------------------------------------
UPDATE Developer
SET developerID = :developerIDToUpdate,
    name = :newName
WHERE developerID = :developerIDToUpdate;
-- -----------------------------------------------------
--Delete a Developer
-- -----------------------------------------------------
DELETE FROM Developers
WHERE developerID = :developerIDToUpdate;