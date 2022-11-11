// Based on https://github.com/calvin-cs262-organization/monopoly-service/blob/master/monopolyService.js

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
router.get("/trailers", readTrailers);
router.get("/items", readItems);

router.post("/trailers", createTrailer);
router.post("/items", createItem);
router.post("/trailerusers", createTrailerUser);

// Notification operations
router.get("/notifications", readNotifications);

// Event operations
router.get("/events", readEvents);

// User operations
router.get("/username", readUsername);
router.get("/usertype", readUserType);

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
// EX input: {username: 'site1'}
function readTrailers(req, res, next) {
  db.many("SELECT TID, tname FROM Trailers, TrailerUsers, Users WHERE Trailers.ID = TrailerUsers.TID AND Users.username = TrailerUsers.UID AND username = ${username}", req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

// EX input: {TID: 1}
// output: iname, quantity, notificationlevel, increment
function readItems(req, res, next) {
  db.many("SELECT iname, quantity, notificationlevel, increment FROM Items WHERE Items.TID = ${TID}", req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

// EX input {tname: 'Trailer 3'}
function createTrailer(req, res, next) {
  db.one('INSERT INTO Trailers VALUES (DEFAULT, ${tname}) RETURNING id', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

// EX input {TID: 2, iname: 'Bananas', qty: 50, notif: 10, inc: 5}
function createItem(req, res, next) {
  db.one('INSERT INTO Items VALUES (DEFAULT, ${TID}, ${iname}, ${qty}, ${notif}, ${inc}) RETURNING id', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

// EX input {TID: 2, username: 'Site1'}
function createTrailerUser(req, res, next) {
  db.one('INSERT INTO TrailerUsers VALUES (${TID}, ${username}) RETURNING id', req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      next(err);
    });
}

/********************* NOTIFICATIONS *********************/

// output: iname, quantity, notificationlevel, increment
function readNotifications(req, res, next) {
  db.many("SELECT iname, quantity, notificationlevel, increment FROM Items WHERE quantity < notificationlevel")
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

/********************* Events *********************/

// Get upcoming events
function readEvents(req, res, next) {
  db.many("SELECT name, time, description FROM Events WHERE date(now()) <= date(Events.time)")
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

/********************* USERS *********************/

// EX input: {username: Site1}
// output: number of users
function readUsername(req, res, next) {
  db.oneOrNone("SELECT Count(*) FROM Users WHERE username=${username}", req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

// EX input: {username: Site1, pswd: Site1}
// output: number of users
function readUserType(req, res, next) {
  db.oneOrNone("SELECT userType FROM Users WHERE username=${username} AND password=${pswd}", req.body)
    .then(data => {
      returnDataOr404(res, data);
    })
    .catch(err => {
      next(err);
    })
}

// function updatePlayer(req, res, next) {
//   db.oneOrNone('UPDATE Player SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id', req)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     });
// }

// function deletePlayer(req, res, next) {
//   db.oneOrNone('DELETE FROM Player WHERE id=${id} RETURNING id', req.params)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     });
// }