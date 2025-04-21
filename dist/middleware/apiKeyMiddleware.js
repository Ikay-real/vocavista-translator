"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyMiddleware = void 0;
const config_1 = __importDefault(require("../utils/config"));
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== config_1.default.apiKey) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing API key' });
    }
    next();
};
exports.apiKeyMiddleware = apiKeyMiddleware;
