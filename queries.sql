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