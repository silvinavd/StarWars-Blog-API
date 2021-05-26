"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var actions = __importStar(require("./actions"));
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
router.post('/:user_id/favourite/:planet_id', utils_1.safe(actions.addPlanet));
exports["default"] = router;
