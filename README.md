# Simple_REST_API
Simple_REST_API with Node.js and Express, no DB

# Installation
Install dependencies:
All other dependencies are in package-lock.json, so 'npm install' should do it. Web client used Postman.
```bash
npm install
```
Execute the main file:
```bash
node server.js
```
## Example client requests
* GET localhost:3000/items - get all items from db.
* GET localhost:3000/items/search? - SEARCH query with GET method, available params: title,description,price,stock.
Location data is under construction, might not work properly.
* GET localhost:3000/items/itemID - itemID parameter is required, get single item by ID. 
* POST localhost:3000/items/itemID - itemID parameter is required, create an item in db. 
* PUT localhost:3000/items/itemID - itemID parameter is required, update/modify an item in db.
Item Data ID is not reqired, added and incremented manually.
* DELETE localhost:3000/items/itemID - itemID parameter is required, delete an item from db.
