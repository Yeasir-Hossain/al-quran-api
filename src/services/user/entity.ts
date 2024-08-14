import bcrypt from "bcrypt";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { create, find, findOne, remove, update } from "../../db/operations";
import { Req } from "../../utils/types";
import User from "./model";

// Allowed parameters to create a new user
const CREATE_ALLOWED = new Set(["name", "userName", "email", "password", "avatar", "role", "phone", "status"]);

// Allowed query parameters to query documents
const ALLOWED_QUERY = new Set(["name", "userName", "email", "phone", "status", "page", "limit", "paginate"]);

/**
 * Creates a new user in the database.
 *
 * @param {Req} req - Express Request object containing user data in req.body
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response with status and message indicating success or failure of user creation
 */
export const createUser = async (req: Req, res: Response): Promise<Response> => {
  try {
    const isValid = Object.keys(req.body).every(k => CREATE_ALLOWED.has(k));
    if (!isValid) return res.status(400).send({ status: 400, message: "Invalid Fields provided" });
    if (!req.body.email || !req.body.password) return res.status(400).send({ status: 400, message: "Email and Password must be provided" });
    const isExist = await findOne({ table: User, key: { email: req.body.email } });
    if (isExist) return res.status(409).send({ status: 409, message: "User already exists with the same email." });
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await create({ table: User, key: { ...req.body } });
    if (!user) return res.status(503).send({ status: 503, message: "Failed to create user.Please try again." });
    return res.status(201).send({ status: 201, message: "User created successfully", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Handles user login and authentication.
 *
 * @param {Req} req - Express Request object containing user credentials in req.body
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response with status and message indicating success or failure of login attempt
 */
export const login = async (req: Req, res: Response): Promise<Response> => {
  console.log(req.body, "login ");

  try {
    if (!req.body.email || !req.body.password) return res.status(400).send({ status: 400, message: "Email and Password must be provided" });
    const user = await findOne({ table: User, key: { email: req.body.email } });

    if (!user) return res.status(404).send({ status: 404, message: "User not found" });
    if (user.status !== "active") return res.status(401).send({ status: 401, message: "Unauthorized, User is not active" });
    const isMatch = await bcrypt.compare(req.body.password, user?.password);
    if (!isMatch) return res.status(400).send({ status: 400, message: "Invalid Credentials" });
    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY!);
    res.cookie("boat", token, {
      httpOnly: true,
      secure: process.env.MODE === "development" ? false : true,
      sameSite: process.env.MODE === "development" ? "none" : "strict",
      priority: "high",
      domain: process.env.OWN_DOMAIN!,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    });
    return res.status(200).send({ status: 200, message: "Login successful", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Handles user logout by clearing session cookies.
 *
 * @param {Req} req - Express Request object containing user session information
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response indicating success or failure of logout attempt
 */
export const logout = async (req: Req, res: Response): Promise<Response> => {
  try {
    if (!req.user) return res.status(401).send({ status: 401, message: "Unauthorized" });
    res.clearCookie(process.env.COOKIE_KEY!, {
      httpOnly: true,
      secure: process.env.MODE === "development" ? false : true,
      sameSite: process.env.MODE === "development" ? "none" : "strict",
      priority: "high",
      domain: process.env.OWN_DOMAIN!,
      expires: new Date(Date.now())
    });
    return res.status(200).send({ status: 200, message: "Logged Out Successfull" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Something went wrong");
  }
};

/**
 * Retrieves information about the currently authenticated user.
 *
 * @param {Req} req - Express Request object containing user session information
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response containing user data if authenticated, otherwise Unauthorized or Internal Server Error
 */
export const me = async (req: Req, res: Response): Promise<Response> => {
  try {
    if (!req.user) return res.status(401).send({ status: 401, message: "Unauthorized" });
    return res.status(200).send({ status: 200, message: "User retrieved successfully", data: req.user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Updates user information.
 *
 * @param {Req} req - Express Request object containing user ID in params and updated data in body
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response indicating success or failure of user update operation
 */
export const updateUser = async (req: Req, res: Response): Promise<Response> => {
  try {
    const isValid = Object.keys(req.body).every(k => CREATE_ALLOWED.has(k));
    if (!isValid) return res.status(400).send({ status: 400, message: "Invalid Fields provided" });
    const { id } = req.params;
    if (id === "undefined" || !id || id.trim().length === 0) return res.status(400).send({ status: 400, message: "ID is required" });
    const user = await findOne({ table: User, key: { id } });
    if (!user) return res.status(404).send({ status: 404, message: "User not found" });
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await update({ table: User, key: { id, body: req.body } });
    if (!updatedUser) return res.status(409).send({ status: 409, message: "Failed to update user,try again later" });
    return res.status(200).send({ status: 200, message: "User updated successfully", data: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Updates the profile of the authenticated user.
 *
 * @param {Req} req - Express Request object containing authenticated user info and updated data in body
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response indicating success or failure of profile update operation
 */
export const updateOwn = async (req: Req, res: Response): Promise<Response> => {
  try {
    const isValid = Object.keys(req.body).every(k => CREATE_ALLOWED.has(k));
    if (!isValid) return res.status(400).send({ status: 400, message: "Invalid Fields provided" });
    if (!req.user) return res.status(404).send({ status: 401, message: "Unauthorized" });
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const updatedUser = await update({ table: User, key: { id: req.user.id, body: req.body } });
    if (!updatedUser) return res.status(409).send({ status: 409, message: "Failed to update profile,try again later" });
    return res.status(200).send({ status: 200, message: "User Profile updated successfully", data: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Retrieves a list of users based on specified query parameters.
 *
 * @param {Req} req - Express Request object containing query parameters
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response containing retrieved users or error message
 */
export const getAllUsers = async (req: Req, res: Response): Promise<Response> => {
  try {
    const isValidQuery = Object.keys(req.query).every(k => ALLOWED_QUERY.has(k));
    if (!isValidQuery) return res.status(400).send({ status: 400, message: "Query Validation Failed" });
    const users = await find({ table: User, key: { query: req.query, allowedQuery: ALLOWED_QUERY } });
    return res.status(200).send({ status: 200, message: "Users retrieved successfully", data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Retrieves a single user based on the provided ID.
 *
 * @param {Req} req - Express Request object containing user ID in params
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response containing retrieved user or error message
 */
export const getOneUser = async (req: Req, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    if (id === "undefined" || !id || id.trim().length === 0) return res.status(400).send({ status: 400, message: "ID is required" });
    const user = await findOne({ table: User, key: { id } });
    if (!user) return res.status(404).send({ status: 404, message: "User not found" });
    return res.status(200).send({ status: 200, message: "User retrieved successfully", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};

/**
 * Deletes a user based on the provided ID.
 *
 * @param {Req} req - Express Request object containing user ID in params
 * @param {Response} res - Express Response object to send the HTTP response
 * @returns {Promise<Response>} HTTP response confirming user deletion or error message
 */
export const deleteUser = async (req: Req, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    if (id === "undefined" || !id || id.trim().length === 0) return res.status(400).send({ status: 400, message: "ID is required" });
    const user = await findOne({ table: User, key: { id } });
    if (!user) return res.status(404).send({ status: 404, message: "User Doesn't exist" });
    await remove({ table: User, key: { id } });
    return res.status(200).send({ status: 200, message: "User Deleted Successfully", data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
};
