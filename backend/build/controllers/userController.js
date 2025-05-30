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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = require("../models/userModel");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.User.find().select("-password -confirmed_password");
        if (!users || users.length === 0) {
            res.status(404).json({ message: "No users found." });
            return;
        }
        res.json(users);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //change this to get userId from the logged in information
        const user = yield userModel_1.User.findById(req.params.userId);
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        res.json(user);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, confirmed_password } = req.body;
        const userExists = yield userModel_1.User.findOne({ email: email });
        if (userExists) {
            res.status(400).json({ message: "User already exists." });
            return;
        }
        const newUser = new userModel_1.User({ name, email, password, confirmed_password });
        yield newUser.save();
        res.status(201).json({ message: "New user created." });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Change to the userId is fetched from logged in user
        const user = yield userModel_1.User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({ message: "User updated" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Change to logged in userId
        const user = yield userModel_1.User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({ message: "User deleted succesfully." });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
            return;
        }
    }
});
exports.deleteUser = deleteUser;
