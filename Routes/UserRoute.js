import express, { Router } from 'express';
const router = express.Router();
import { addUser, getUser, getUserById, updateUserById, deleteUserById } from '../Controller/User.controller';


router.get('/get-userById/:user_id', getUserById);
router.get('/get-user', getUser);
router.post('/add-user', addUser);
router.put('/update-userById/:user_id', updateUserById);
router.delete('/delete-userById/:user_id', deleteUserById);

export default router;
