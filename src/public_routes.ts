
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser, getPeople, createPeople, createPlanet, getPlanet, login } from './actions';
import * as actions from './actions';



const router = Router();

// signup route, creates a new user in the DB
router.get('/people', safe(getPeople));
router.get('/planet', safe(getPlanet));
router.post('/user', safe(createUser));
router.post('/people', safe(createPeople));
router.post('/planet', safe(createPlanet));
router.post('/login',safe(login))







export default router;
