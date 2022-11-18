// Based on https://github.com/calvin-cs262-organization/monopoly-service/blob/master/monopolyService.js
// JS application to run the data service on Heroku and access the database

// Set up the database connection.
const pgp = require('pg-promise')();
const db = pgp({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_USER,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Configure the server and its routes.

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = express.Router();
router.use(express.json());

router.get("/", readHelloMessage);

// Item operations
router.get("/traileritems/:username", readTrailerItems);

router.post("/trailers", createTrailer);
router.post("/items", createItem);
router.post("/trailerusers", createTrailerUser);

router.put("/items", updateItem);
router.delete("/items", deleteItem);

// Notification operations
router.get("/notifications", readNotifications);

// Event operations
router.get("/events", readEvents);

// User operations
router.get("/users/:username", readUsername);
router.get("/users/:username/:pswd", readUserType);

router.post("/users", createUser);
router.delete("/users", deleteUser);

app.use(router);
app.use(errorHandler);
app.listen(port, () => console.log(`Listening on port ${port}`));

// Implement the CRUD operations.

function errorHandler(err, req, res) {
  if (app.get('env') === "development") {
    console.log(err);
  }
  res.sendStatus(err.status || 500);
}

function returnDataOr404(res, data) {
  if (data == null) {
    res.sendStatus(404);
  } else {
    res.send(data);
  }
}

function readHelloMessage(req, res) {
  res.send('Hello, Be A Ruby service!');
}

/********************* ITEMS *********************/

// Returns list of trailers for a username
// EX
// - local: http://localhost:5000/traileritems/Admin1
// - service: https://be-a-ruby.herokuapp.com/trailers/Admin1
function readTrailerItems(req, res, next) {
  db.multi('\
    SELECT TID, tname FROM Trailers, TrailerUsers, Users \
      WHERE Trailers.ID = TrailerUsers.TID \
        AND Users.username = TrailerUsers.UID \
        AND username = ${username}; \
    SELECT Items.ID, tname, Items.TID, iname, quantity, notificationlevel, increment \
      FROM Items, Users, Trailers, TrailerUsers \
      WHERE Items.TID = TrailerUsers.TID \
        AND Users.username = TrailerUsers.UID \
        AND Trailers.ID = TrailerUsers.TID \
        AND username = ${username};', req.params)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/trailers', {
   method: 'POST', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({tname:'Trailer 3'})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function createTrailer(req, res, next) {
  db.one('INSERT INTO Trailers VALUES (DEFAULT, ${tname}) RETURNING id', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/items', {
   method: 'POST', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({TID: 2, iname: 'Bananas', qty: 50, notif: 10, inc: 5})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function createItem(req, res, next) {
  db.one('INSERT INTO Items VALUES (DEFAULT, ${TID}, ${iname}, ${qty}, ${notif}, ${inc}) RETURNING id', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/trailerusers', {
   method: 'POST', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({TID: 3, username: 'Admin1'})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function createTrailerUser(req, res, next) {
  db.one('INSERT INTO TrailerUsers VALUES (${TID}, ${username}) RETURNING TID', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/items', {
   method: 'PUT', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({ID: 6, name: 'Banana', quantity: '50', notificationlevel: '10', increment: '5'})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function updateItem(req, res, next) {
  db.oneOrNone('UPDATE Items SET iname=${name}, quantity=${quantity}, notificationlevel=${notificationlevel}, increment=${increment} WHERE ID=${ID} RETURNING ID', req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/items', {
   method: 'DELETE', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({ID: 6})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function deleteItem(req, res, next) {
  // Delete references
  db.oneOrNone('DELETE FROM Items WHERE ID = ${ID} RETURNING ID', req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    });
}

/********************* NOTIFICATIONS *********************/

// EX
// - local: http://localhost:5000/notifications
// - service: https://be-a-ruby.herokuapp.com/notifications
// output: iname, quantity, notificationlevel, increment
function readNotifications(req, res, next) {
  db.many('SELECT iname, quantity, notificationlevel, increment FROM Items WHERE quantity < notificationlevel')
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

/********************* Events *********************/

// Get upcoming events
// EX
// - local: http://localhost:5000/events
// - service: https://be-a-ruby.herokuapp.com/events
function readEvents(req, res, next) {
  db.many('SELECT name, time, description FROM Events WHERE date(now()) <= date(Events.time)')
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

/********************* USERS *********************/

// EX
// - local: http://localhost:5000/users/Site0 => 0
// - service: https://be-a-ruby.herokuapp.com/users/Site1 => 1
// output: number of users
function readUsername(req, res, next) {
  db.oneOrNone('SELECT Count(*) FROM Users WHERE username=${username}', req.params)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

// output: usertype if found /users/:username/:password
// EX
// - local: http://localhost:5000/users/Site1/Site1 => {usertype: "Site"}
// - service: https://be-a-ruby.herokuapp.com/users/Site0/Site0 => {usertype: "NULL"}
function readUserType(req, res, next) {
  db.oneOrNone('SELECT (SELECT userType FROM Users WHERE username=${username} AND password=${pswd}) as usertype', req.params)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    })
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/users', {
   method: 'POST', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({username: 'Site2', pswd: 'Site2', type: 'Site'})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function createUser(req, res, next) {
  db.one('INSERT INTO Users VALUES (${username}, ${pswd}, ${type}) RETURNING userType', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next
  await fetch('http://localhost:5000/users', {
   method: 'DELETE', 
   headers: {'Content-Type': 'application/json'}, 
   body: JSON.stringify({username: 'Site2'})
  }).then((response) => response.json())
  .then((data) => {console.log(data)})
  .catch((error) => {console.log(error)}) 
 
 */
function deleteUser(req, res, next) {
  // Delete references
  db.multi('DELETE FROM TrailerUsers WHERE UID = ${username};DELETE FROM Users WHERE username=${username} Returning username', req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    });
}