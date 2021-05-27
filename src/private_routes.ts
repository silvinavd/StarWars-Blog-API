/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'


// declare a new router to include all the endpoints
const router = Router();

//middleware de verificación
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
     const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    
    next()
}

router.get('/user',verifyToken, safe(actions.getUsers));
router.get('/user/:user_id', verifyToken, safe(actions.getUserbyId));
router.post('/:user_id/favourite/:planet_id', verifyToken, safe(actions.addPlanet));
router.post('/:user_id/favourite/people/:people_id', verifyToken, safe(actions.addPeople));
router.get('/:user_id/favourite', verifyToken, safe(actions.getFavourite));
router.delete('/:user_id/favourite/:planet_id', safe(actions.deletePlanet));
router.delete('/:user_id/favourite/people/:people_id', verifyToken, safe(actions.deletePeople));







export default router;