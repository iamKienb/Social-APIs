import express from 'express'
import { getAllProfile, getProfile, removeProfile, updateProfile } from '../controllers/profile.controller';
import { validationResource } from '../middlewares/validationResource';
import { getProfileSchema, updateProfileSchema } from '../dtos/profile.dto';

const profileRoute = express.Router();

profileRoute.get('/:id',validationResource(getProfileSchema) ,getProfile)
profileRoute.get('/', getAllProfile)
profileRoute.put('/:id',validationResource(updateProfileSchema) ,updateProfile);
profileRoute.delete('/:id',validationResource(getProfileSchema), removeProfile);



export = profileRoute;