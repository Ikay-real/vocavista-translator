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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNoteById = exports.getNotes = void 0;
const note_1 = __importDefault(require("../models/note"));
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield note_1.default.find();
        res.status(200).json({
            status: 'success',
            message: 'Notes fetched successfully',
            data: notes
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
});
exports.getNotes = getNotes;
const getNoteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findById(req.params.id);
        if (!note)
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        res.status(200).json({
            status: 'success',
            message: 'Note fetched successfully',
            data: note
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
});
exports.getNoteById = getNoteById;
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const newNote = new note_1.default({
            title,
            content
        });
        yield newNote.save();
        res.status(201).json({
            status: 'success',
            message: 'Note created successfully',
            data: newNote
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
});
exports.createNote = createNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const note = yield note_1.default.findByIdAndUpdate(req.params.id, { title, content, updatedAt: new Date() }, { new: true });
        if (!note)
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        res.status(200).json({
            status: 'success',
            message: 'Note updated successfully',
            data: note
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield note_1.default.findByIdAndDelete(req.params.id);
        if (!note)
            return res.status(404).json({ status: 'error', message: 'Note not found' });
        res.status(204).json({
            status: 'success',
            message: 'Note deleted successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
});
exports.deleteNote = deleteNote;
