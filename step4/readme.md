# Project Step 4
Follow these instructions to get the app going. 

## Background
The design utilizes MVC pattern, model, view, controller. There is the main app file which refers to the routes folder. The routes contains the index which contains the directory of all the paths. Each path corresponds to a controller and related function for each page. The controllers control logic of dealing with the requests and responses. They may call to the Models for data. The models are what access the DB. 

We implemented the **Franchise** page fully with CRUD operations for completion of step 4 of the project. 

## Prerequisites

- Node.js (v21.6.2 or later): Not sure if this is required but what I have. I installed it on the webserver as well so it will run from the url when needed.

## Installation

Instructions for setting up the project. Should be the Mac commands:

1. Clone the repository:
    ```bash
    git clone https://github.com/mv805/Video-Game-Catalog-Project-CS340.git
    ```
2. Navigate to the project directory:
    ```bash
    cd step4
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Create .env file:
    ```bash
    touch .env
5. Open .env file and enter your details as required. Make sure the .env file is in the git ignore. There is a .env.example for use as format.


## Running the Application
Run from the console in the root folder
```bash
npm start
