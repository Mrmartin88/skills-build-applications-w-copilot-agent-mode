"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/users', (req, res) => {
    res.json({ message: 'Users endpoint', data: [] });
});
router.get('/teams', (req, res) => {
    res.json({ message: 'Teams endpoint', data: [] });
});
router.get('/activities', (req, res) => {
    res.json({ message: 'Activities endpoint', data: [] });
});
router.get('/leaderboard', (req, res) => {
    res.json({ message: 'Leaderboard endpoint', data: [] });
});
router.get('/workouts', (req, res) => {
    res.json({ message: 'Workouts endpoint', data: [] });
});
exports.default = router;
