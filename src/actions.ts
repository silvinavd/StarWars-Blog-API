import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { People } from './entities/People'
import { Exception } from './utils'
import { Planets } from './entities/Planets'
import jwt from 'jsonwebtoken'



export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if (!req.body.first_name) throw new Exception("Please provide a first_name")
    if (!req.body.last_name) throw new Exception("Please provide a last_name")
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find();
    return res.json(users);
}

export const getPeople = async (req: Request, res: Response): Promise<Response> => {
    const people = await getRepository(People).find();
    return res.json(people);
}

//Post people
export const createPeople = async (req: Request, res: Response): Promise<Response> => {
    // body = [{},{},{},{}]
    // body[i].name
    let results: any;
    const data = new People()
    for (let i = 0; i < req.body.length; i++) {
        data.name = req.body[i].name
        data.birth_year = req.body[i].birth_year
        data.gender = req.body[i].gender
        data.height = req.body[i].height
        data.skin_color = req.body[i].skin_color
        data.eye_color = req.body[i].eye_color

        if (!data.name) throw new Exception("Please provide a name")
        if (!data.birth_year) throw new Exception("Please provide a birth_year")
        if (!data.gender) throw new Exception("Please provide a gender")
        if (!data.height) throw new Exception("Please provide a height")
        if (!data.skin_color) throw new Exception("Please provide a skin_color")
        if (!data.eye_color) throw new Exception("Please provide an eye_color")

        console.log(req.body[i].name, "aca");


        const peopleRepo = getRepository(People)
        const personaje = await peopleRepo.findOne({ where: { name: data.name } })
        if (personaje) throw new Exception("Character already exists with this name")

        const newPeople = getRepository(People).create(data);  //Creo un planeta
        results = await getRepository(People).save(newPeople); //Grabo el nuevo planeta 
    }

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    return res.json(results);
}

//Post planet

// important validations to avoid ambiguos errors, the client needs to understand what went wrong
// if (!req.body.name) throw new Exception("Please provide a name")
// if (!req.body.climate) throw new Exception("Please provide a climate")
// if (!req.body.diameter) throw new Exception("Please provide a diameter")
// if (!req.body.rotation_period) throw new Exception("Please provide a rotation_period")
// if (!req.body.orbital_period) throw new Exception("Please provide a orbital_period")
// if (!req.body.gravity) throw new Exception("Please provide an gravity")
export const createPlanet = async (req: Request, res: Response): Promise<Response> => {

    let results: any;
    const data = new Planets()
    for (let i = 0; i < req.body.length; i++) {
        data.name = req.body[i].name
        data.climate = req.body[i].climate
        data.diameter = req.body[i].diameter
        data.rotation_period = req.body[i].rotation_period
        data.orbital_period = req.body[i].orbital_period
        data.gravity = req.body[i].gravity

        if (!data.name) throw new Exception("Please provide a name")
        if (!data.climate) throw new Exception("Please provide a climate")
        if (!data.diameter) throw new Exception("Please provide a diameter")
        if (!data.rotation_period) throw new Exception("Please provide a rotation period")
        if (!data.orbital_period) throw new Exception("Please provide a orbital period")
        if (!data.gravity) throw new Exception("Please provide a gravity")


        const planetRepo = getRepository(Planets)
        const planet = await planetRepo.findOne({ where: { name: data.name } })
        if (planet) throw new Exception("Planet already exists with this name")

        const newPlanet = getRepository(Planets).create(data);  //Creo un planeta
        results = await getRepository(Planets).save(newPlanet); //Grabo el nuevo planeta 
    }

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
    return res.json(results);
}

//Get Planet
export const getPlanet = async (req: Request, res: Response): Promise<Response> => {
    const planet = await getRepository(Planets).find();
    return res.json(planet);
}

//Login

export const login = async (req: Request, res: Response): Promise<Response> =>{
		
	if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
	if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

	const userRepo = await getRepository(Users)

	// We need to validate that a user with this email and password exists in the DB
	const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password }})
	if(!user) throw new Exception("Invalid email or password", 401)

	// this is the most important line in this function, it create a JWT token
	const token = jwt.sign({ user }, process.env.JWT_KEY as string);
	
	// return the user and the recently created token to the client
	return res.json({ user, token });
}

//Get user/id

export const getUserbyId = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).findOne(req.params.user_id);
    if (!users) {
        return res.json({ "message": "Usuario no existe" })
    }
    return res.json(users);
}

//Get personaje/id

export const getPeoplebyId = async (req: Request, res: Response): Promise<Response> => {
    const people = await getRepository(People).findOne(req.params.people_id);
    if (!people) {
        return res.json({ "message": "El personaje no existe" })
    }
    return res.json(people);
}

//Get planeta/id

export const getPlanetbyId = async (req: Request, res: Response): Promise<Response> => {
    const planet = await getRepository(Planets).findOne(req.params.planet_id);
    if (!planet) {
        return res.json({ "message": "El planeta no existe" })
    }
    return res.json(planet);
}
