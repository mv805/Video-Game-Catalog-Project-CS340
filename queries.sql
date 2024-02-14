/* 
 Database queries for the Game Quest Video Store Database
 By Jovanny Gochez and Matthew Villa
 
 !colon: character being used to denote the variables that will have data from the backend programming language
 */
/* 
 Games and Genres page queries
 */
--
-- get all the games in inventory for reference for the genres game page
SELECT Games.gameID,
    Games.title,
    Games.releaseYear,
    Games.price,
    Developers.name as Developer,
    Franchises.title as Franchise,
    FROM Games
    LEFT JOIN Developers ON Developers.developerID = Games.developerID
    LEFT JOIN Franchises ON Franchises.franchiseID = Games.franchiseID
ORDER BY Games.gameID;
--
-- Get all the genres of games
SELECT genreID,
    name as Name
FROM Genres
ORDER BY genreID;
--
--Get all the games and genre combinations
SELECT GameHasGenres.gameHasGenresID,
    Games.title as Game,
    Genres.name as Genre,
    FROM GameHasGenres
    JOIN Games ON Games.gameID = GameHasGenres.gameID
    JOIN Genres ON Genres.genreID = GameHasGenres.genreID
ORDER BY Games.title;
--
--Insert a new game
INSERT INTO Games (
        title,
        releaseYear,
        price,
        developerID,
        franchiseID,
        activeInventory
    )
VALUES (
        :gameTitle,
        :gameReleaseYear,
        :price,
        :developer,
        :franchise,
        :startingInventory
    );
--
--Insert a new Genre
INSERT INTO Genres (name)
VALUES (:genreName);
--
--Add a new game-genre Relationship
INSERT INTO GameHasGenres (gameID, genreID)
VALUES (:game, :genre,);
--
-- Update a game, given the id
UPDATE Games
SET title = :gameTitle,
    releaseYear = :gameReleaseYear,
    price = :price,
    developerID = :developer,
    franchiseID = :franchise,
    activeInventory = :newInventory
WHERE gameID = :gameIDtoUpdate;
--
-- Update a genre, given the id
UPDATE Genres
SET name = :genreName
WHERE genreID = :genreIDtoUpdate;
--
-- Update a game-genre relationship, given the id
UPDATE GameHasGenres
SET gameID = :gameID,
    genreID = :genreID
WHERE gameHasGenresID = :gameGenreIDtoUpdate;
--
--Delete a game
DELETE FROM Games
WHERE gameID = :idOfGameToDelete;
--
--Delete a game-genre relationship
DELETE FROM GameHasGenres
WHERE gameID = :idOfGameAndGenreToDelete;
--Delete a genre 
DELETE FROM Genres
WHERE genreID = :idOfGenreToDelete;
/* 
 Platforms page queries
 */
--Get all the platforms
SELECT *
FROM Platforms
ORDER BY name;
--
--Get all the game-platform relationships
SELECT PlatformHasGames.platformHasGamesID,
    Games.title as Game,
    Platforms.name as Platform
FROM PlatformHasGames
    JOIN Games ON Games.gameID = PlatformHasGames.gameID
    JOIN Platforms ON Platforms.platformID = PlatformHasGames.platformID
ORDER BY Games.title;
--
--Add a new Platform
INSERT INTO Platforms (name)
VALUES (:platformName);
--
--Add a new game-platform relationship
INSERT INTO PlatformHasGames (gameID, platformID)
VALUES (:idOfGameToAddPlatform, :idOfPlatformToAddToGame);
--
--update a Platform
UPDATE Platforms
SET platformID = :idOfPlatformToUpdate,
    name = :newName
WHERE platformID = :idOfPlatformToUpdate;
--
--update a game-Platform relationship
UPDATE PlatformHasGames
SET platformHasGamesID = :idOfPlatformHasGameToUpdate,
    gameID = :newGameID,
    platformID = :newPlatformID
WHERE platformHasGamesID = :idOfPlatformHasGameToUpdate;
/* 
 Orders page queries
 */
--
--Get all the orders
SELECT *
FROM Orders
ORDER BY orderID;
--
--Get all the game-order relationships
SELECT OrderHasGames.orderHasGamesID,
    Games.title AS Game,
    Orders.date AS `Order Date`
FROM OrderHasGames
    JOIN Games ON Games.gameID = OrderHasGames.gameID
    JOIN Orders ON Orders.orderID = OrderHasGames.orderID
ORDER BY Games.title --
    --Add a new game-order relationship
INSERT INTO OrderHasGames (orderHasGamesID, gameID, orderID)
VALUES (
        :idOfGameOrder,
        :idOfGameOnOrder,
        :idOfOrderWithGame
    );
--
--update a game-order relationship
UPDATE OrderHasGames
SET orderHasGamesID = :idOfGameOrder,
    gameID = :newGameID,
    platformID = :newPlatformID
WHERE platformHasGamesID = :idOfPlatformHasGameToUpdate;
--
--Update an order
UPDATE Orders
SET orderID = :idOfOrderToUpdate,
    date = :newDate,
    customerID = :idOfCustomerToUpdate
WHERE orderID = :idOfOrderToUpdate;
/* 
 Customers page queries
 */
--get all of the customers
SELECT customerID AS `Customer ID`,
    firstName AS `First Name`,
    lastName AS `Last Name`,
    email AS `Email`,
    rewardPoints AS `Rewards Points`,
    CASE
        WHEN activeCustomer = 1 THEN 'Yes'
        WHEN activeCustomer = 0 THEN 'No'
    END AS `Active Customer`
FROM Customers;
--
--Get all the orders
Select orderID,
    date AS `Date`,
    customerID AS `Customer ID`
FROM Orders;
--
--Add a new customer
INSERT INTO Customers (
        firstName,
        lastName,
        email
    )
VALUES (
        :firstName,
        :lastName,
        :email,
    );
--
--Add a new order
INSERT INTO Orders (date, customerID)
VALUES (
        :date,
        :idOfCustomerForOrder
    );
--
--Update a customer
UPDATE Customers
SET customerID = :idOfCustomerToUpdate,
    firstName = :newFirstName,
    lastName = :newLastName,
    email = :newEmail,
    rewardPoints = :newRewardPoints,
    activeCustomer = :newActiveCustomerStatus
WHERE customerID = :idOfCustomerToUpdate;