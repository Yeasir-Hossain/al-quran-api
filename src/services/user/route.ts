import { Router } from "express";
import auth from "../../middleware/auth";
import checkRole from "../../middleware/checkRole";
import { createUser, deleteUser, getAllUsers, getOneUser, login, logout, me, updateOwn, updateUser } from "./entity";

const router: Router = Router();


/**
* POST /user/create
* @description This route is used to create a new user.
* @response {Object} 201 - the new user object.
*/
router.post('/user/create', auth, checkRole(['admin']), createUser);


/**
* POST /user/login
* @description This route is used to login a user.
* @response {Object} 200 - the user object.
*/
router.post('/user/login', login);


/**
* POST /user/logout
* @description This route is used to logout a user.
* @response {Object} 200 - the message "Logged out successfully".
*/
router.post('/user/logout', auth, logout);


/**
* GET /user/me
* @description This route is used to get the authenticated user.
* @response {Object} 200 - the user object
*/
router.get('/user/me', auth, me);


/**
* PATCH /user/me
* @description This route is used to update the authenticated user.
* @response {Object} 200 - the updated user object
*/
router.patch('/user/me', auth, checkRole(['admin']), updateOwn);


/**
* PATCH /user/update/:id
* @description This route is used to update a user.
* @response {Object} 200 - the updated user object
*/
router.patch('/user/update/:id', auth, checkRole(['admin']), updateUser);


/**
* GET /user/all
* @description This route is used to get all the users.
* @response {Object} 200 - the users
*/
router.get('/user/all', auth, checkRole(['admin']), getAllUsers);


/**
* GET /user/:id
* @description This route is used to get a single user.
* @response {Object} 200 - the user object
*/
router.get('/user/:id', auth, checkRole(['admin']), getOneUser);


/**
* DELETE /user/delete/:id
* @description This route is used to delete a user.
* @response {Object} 200 - the deleted user object
*/
router.delete('/user/delete/:id', auth, checkRole(['admin']), deleteUser);

export default router;