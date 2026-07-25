"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/database");
const api_1 = __importDefault(require("./controllers/api"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const apiBase = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:8000`;
app.use('/api', api_1.default);
app.get('/', (req, res) => {
    res.json({
        status: 'OctoFit Tracker API',
        env: process.env.NODE_ENV || 'development',
        apiUrl: apiBase,
    });
});
const PORT = Number(process.env.PORT || 8000);
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
