# Simple_REST_API
Simple_REST_API with Node.js and Express, no DB.

# Installation
Install dependencies:
All other dependencies are in package-lock.json, so 'npm install' should do it. Web client used Postman. Default port 3000.
```bash
npm install
```
Execute the main file:
```bash
node server.js
```
## Example client requests
| Route  | HTTP Verb  | Description |
| :------------ |:---------------:| :-----|
| /items      | `GET` | get all items from db. |
| /items/search? | `GET`        |   Search query for item params . |
| /items/:itemID      | `GET`        |  get single item by ID.  |
| items/:itemID      | `POST` | create an item in db.  |
| /items/:itemID      | `PUT`        |   update/modify an item in db.  |
| /items/:itemID  | `PATCH`        |  update one or several specific item params.|
| /items/:itemID  | `DELETE`        |  delete an item from db.|

Data items contais additional commented *Location* array that is under construction.
