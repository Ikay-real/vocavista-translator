"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import noteRoutes from './routes/noteRoutes';
const path_1 = __importDefault(require("path"));
const translationRoutes_1 = __importDefault(require("./routes/translationRoutes"));
const config_1 = __importDefault(require("./utils/config"));
const usageRoutes_1 = __importDefault(require("./routes/usageRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json()); // Parse JSON bodies
app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'index.html'));
});
console.log(path_1.default.join(__dirname, 'public', 'index.html'));
// Use translation routes
app.use('/', translationRoutes_1.default); // Mount translation routes under the root path
// Use usage routes
app.use('/', usageRoutes_1.default); // Mount usage routes under the root path
// Basic error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Start the server
app.listen(config_1.default.port, () => {
    console.log(`Server running on port ${config_1.default.port}`);
    console.log(`API Key authentication is enabled.`);
    console.log(`Using Gemini Model: ${config_1.default.geminiModel}`);
});
