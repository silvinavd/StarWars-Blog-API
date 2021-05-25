import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { People } from './entities/People'


import { Exception } from './utils'
import { Planets } from './entities/Planets'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getPeople = async (req: Request, res: Response): Promise<Response> =>{
		const people = await getRepository(People).find();
		return res.json(people);
}

//Post people
export const createPeople = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.birth_year) throw new Exception("Please provide a birth_year")
	if(!req.body.gender) throw new Exception("Please provide a gender")
    if(!req.body.height) throw new Exception("Please provide a height")
    if(!req.body.skin_color) throw new Exception("Please provide a skin_color")
	if(!req.body.eye_color) throw new Exception("Please provide an eye_color")


	const newPeople = getRepository(People).create(req.body);  //Creo un planeta
	const results = await getRepository(People).save(newPeople); //Grabo el nuevo planeta 
	return res.json(results);
}

//Post planet

export const createPlanet = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
	if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.climate) throw new Exception("Please provide a climate")
	if(!req.body.diameter) throw new Exception("Please provide a diameter")
    if(!req.body.rotation_period) throw new Exception("Please provide a rotation_period")
    if(!req.body.orbital_period) throw new Exception("Please provide a orbital_period")
	if(!req.body.gravity) throw new Exception("Please provide an gravity")


	const newPlanet = getRepository(Planets).create(req.body);  //Creo un planeta
	const results = await getRepository(People).save(newPlanet); //Grabo el nuevo planeta 
	return res.json(results);
}