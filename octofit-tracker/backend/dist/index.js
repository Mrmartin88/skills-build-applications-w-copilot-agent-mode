"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("./config/database");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.json({ status: 'OctoFit Tracker API', env: process.env.NODE_ENV || 'development' });
});
const PORT = Number(process.env.PORT || 8000);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
