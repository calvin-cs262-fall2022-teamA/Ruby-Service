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
// router.get("/trailers", readTrailers);
// router.get("/items", readItems);

// // Notification operations
// router.get("/notifications", readNotifications);

// // Event operations
// router.get("/events", readEvents);

// // User operations
// router.get("/username", readUsername);
// router.get("/usertype", readUserType);

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

// // Returns list of trailer names
// function readTrailers(req, res, next) {
//   db.many("SELECT tname FROM Trailer")
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     })
// }

// // EX input: {trailerName: Trailer 1}
// // output: iname, quantity, notificationlevel, increment
// function readItems(req, res, next) {
//   db.many("SELECT iname, quantity, notificationlevel, increment FROM Item, Trailer WHERE Item.TID = Trailer.ID AND Trailer.tname=${body.trailerName}", req)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     })
// }

// // output: iname, quantity, notificationlevel, increment
// function readNotifications(req, res, next) {
//   db.many("SELECT iname, quantity, notificationlevel, increment FROM Item")
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     })
// }

// function readEvents(req, res, next) {
//   db.many("SELECT name, time, description FROM Events")
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     })
// }

// // EX input: {username: Site1}
// // output: number of users
// function readUsername(req, res, next) {
//   db.oneOrNone("SELECT Count(*) FROM Users WHERE username=${username}", req.body)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     })
// }

// // EX input: {username: Site1, pswd: Site1}
// // output: number of users
// function readUsername(req, res, next) {
//   db.oneOrNone("SELECT userType FROM Users WHERE username=${username} AND password=${pswd}", req.body)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     })
// }

// function readPlayer(req, res, next) {
//   db.oneOrNone('SELECT * FROM Player WHERE id=${id}', req.params)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     });
// }

// function updatePlayer(req, res, next) {
//   db.oneOrNone('UPDATE Player SET email=${body.email}, name=${body.name} WHERE id=${params.id} RETURNING id', req)
//     .then(data => {
//       returnDataOr404(res, data);
//     })
//     .catch(err => {
//       next(err);
//     });
// }

// function createPlayer(req, res, next) {
//   db.one('INSERT INTO Player(email, name) VALUES (${email}, ${name}) RETURNING id', req.body)
//     .then(data => {
//       res.send(data);
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