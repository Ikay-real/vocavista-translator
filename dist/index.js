"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import noteRoutes from './routes/noteRoutes';
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
//app.use(apiKeyMiddleware);
// app.use('/notes', noteRoutes);
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'index.html'));
});
console.log(path_1.default.join(__dirname, 'public', 'index.html'));
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
