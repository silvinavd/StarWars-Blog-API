"use strict";
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
// signup route, creates a new user in the DB
router.get('/people', utils_1.safe(actions_1.getPeople));
router.get('/planet', utils_1.safe(actions_1.getPlanet));
router.post('/user', utils_1.safe(actions_1.createUser));
router.post('/people', utils_1.safe(actions_1.createPeople));
router.post('/planet', utils_1.safe(actions_1.createPlanet));
router.post('/login', utils_1.safe(actions_1.login));
router.get('/people/:people_id', utils_1.safe(actions_1.getPeoplebyId));
router.get('/planet/:planet_id', utils_1.safe(actions_1.getPlanetbyId));
router.post('/:user_id/favourite/:planet_id', utils_1.safe(actions_1.addPlanet));
exports["default"] = router;
