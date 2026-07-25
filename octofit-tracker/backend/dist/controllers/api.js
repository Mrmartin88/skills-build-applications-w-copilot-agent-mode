"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const router = express_1.default.Router();
router.get('/users', async (req, res) => {
    const users = await user_1.default.find().populate('team', 'name');
    res.json({ message: 'Users endpoint', data: users });
});
router.get('/teams', async (req, res) => {
    const teams = await team_1.default.find().populate('members', 'name email');
    res.json({ message: 'Teams endpoint', data: teams });
});
router.get('/activities', async (req, res) => {
    const activities = await activity_1.default.find().populate('user', 'name email');
    res.json({ message: 'Activities endpoint', data: activities });
});
router.get('/leaderboard', async (req, res) => {
    const leaderboard = await leaderboard_1.default.find().populate('user', 'name email');
    res.json({ message: 'Leaderboard endpoint', data: leaderboard });
});
router.get('/workouts', async (req, res) => {
    const workouts = await workout_1.default.find();
    res.json({ message: 'Workouts endpoint', data: workouts });
});
exports.default = router;
