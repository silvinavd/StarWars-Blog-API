"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.addPlanet = exports.login = exports.getPlanetbyId = exports.getPeoplebyId = exports.getUserbyId = exports.getPlanet = exports.getPeople = exports.getUsers = exports.createPlanet = exports.createPeople = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var People_1 = require("./entities/People");
var utils_1 = require("./utils");
var Planets_1 = require("./entities/Planets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Favs_1 = require("./entities/Favs");
//Create user
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
//Create people
var createPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, data, i, peopleRepo, personaje, newPeople;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = new People_1.People();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < req.body.length)) return [3 /*break*/, 5];
                data.name = req.body[i].name;
                data.birth_year = req.body[i].birth_year;
                data.gender = req.body[i].gender;
                data.height = req.body[i].height;
                data.skin_color = req.body[i].skin_color;
                data.eye_color = req.body[i].eye_color;
                if (!data.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!data.birth_year)
                    throw new utils_1.Exception("Please provide a birth_year");
                if (!data.gender)
                    throw new utils_1.Exception("Please provide a gender");
                if (!data.height)
                    throw new utils_1.Exception("Please provide a height");
                if (!data.skin_color)
                    throw new utils_1.Exception("Please provide a skin_color");
                if (!data.eye_color)
                    throw new utils_1.Exception("Please provide an eye_color");
                console.log(req.body[i].name, "aca");
                peopleRepo = typeorm_1.getRepository(People_1.People);
                return [4 /*yield*/, peopleRepo.findOne({ where: { name: data.name } })];
            case 2:
                personaje = _a.sent();
                if (personaje)
                    throw new utils_1.Exception("Character already exists with this name");
                newPeople = typeorm_1.getRepository(People_1.People).create(data);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(newPeople)];
            case 3:
                results = _a.sent(); //Grabo el nuevo planeta 
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: 
            // important validations to avoid ambiguos errors, the client needs to understand what went wrong
            return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPeople = createPeople;
//Create planet
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, data, i, planetRepo, planet, newPlanet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = new Planets_1.Planets();
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < req.body.length)) return [3 /*break*/, 5];
                data.name = req.body[i].name;
                data.climate = req.body[i].climate;
                data.diameter = req.body[i].diameter;
                data.rotation_period = req.body[i].rotation_period;
                data.orbital_period = req.body[i].orbital_period;
                data.gravity = req.body[i].gravity;
                if (!data.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!data.climate)
                    throw new utils_1.Exception("Please provide a climate");
                if (!data.diameter)
                    throw new utils_1.Exception("Please provide a diameter");
                if (!data.rotation_period)
                    throw new utils_1.Exception("Please provide a rotation period");
                if (!data.orbital_period)
                    throw new utils_1.Exception("Please provide a orbital period");
                if (!data.gravity)
                    throw new utils_1.Exception("Please provide a gravity");
                planetRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetRepo.findOne({ where: { name: data.name } })];
            case 2:
                planet = _a.sent();
                if (planet)
                    throw new utils_1.Exception("Planet already exists with this name");
                newPlanet = typeorm_1.getRepository(Planets_1.Planets).create(data);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanet)];
            case 3:
                results = _a.sent(); //Grabo el nuevo planeta 
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: 
            // important validations to avoid ambiguos errors, the client needs to understand what went wrong
            return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanet = createPlanet;
//Get users
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
//Get people
var getPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).find()];
            case 1:
                people = _a.sent();
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeople = getPeople;
//Get Planet
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planet = _a.sent();
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanet = getPlanet;
//Get user/id
var getUserbyId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                users = _a.sent();
                if (!users) {
                    return [2 /*return*/, res.json({ "message": "Usuario no existe" })];
                }
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUserbyId = getUserbyId;
//Get personaje/id
var getPeoplebyId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.people_id)];
            case 1:
                people = _a.sent();
                if (!people) {
                    return [2 /*return*/, res.json({ "message": "El personaje no existe" })];
                }
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeoplebyId = getPeoplebyId;
//Get planeta/id
var getPlanetbyId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planet_id)];
            case 1:
                planet = _a.sent();
                if (!planet) {
                    return [2 /*return*/, res.json({ "message": "El planeta no existe" })];
                }
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanetbyId = getPlanetbyId;
//Login
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
//Post Favourite Planet
var addPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, planetid, personaje, favorito, newFav, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.user_id)];
            case 1:
                userid = _a.sent();
                if (!userid)
                    throw new utils_1.Exception("Usuario no existe");
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planet_id)];
            case 2:
                planetid = _a.sent();
                if (!planetid)
                    throw new utils_1.Exception("Planeta no existe");
                personaje = new People_1.People();
                favorito = new Favs_1.Favs();
                favorito.planets = planetid;
                favorito.users = userid;
                favorito.people = personaje;
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                console.log(favorito);
                newFav = typeorm_1.getRepository(Favs_1.Favs).create(favorito);
                return [4 /*yield*/, typeorm_1.getRepository(Favs_1.Favs).save(newFav)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.addPlanet = addPlanet;
