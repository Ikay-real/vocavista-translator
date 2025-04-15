import { Request, Response } from 'express';
import Note from '../models/note';

export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find();
        res.status(200).json({
            status: 'success',
            message: 'Notes fetched successfully',
            data: notes
        });
    } catch (error:any) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
};

export const getNoteById = async (req: Request, res: Response) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ status: 'error', message: 'Note not found' });
        res.status(200).json({
            status: 'success',
            message: 'Note fetched successfully',
            data: note
        });
    } catch (error:any) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
};

export const createNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({
            title,
            content
        });
        await newNote.save();
        res.status(201).json({
            status: 'success',
            message: 'Note created successfully',
            data: newNote
        });
    } catch (error:any) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
};

export const updateNote = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content, updatedAt: new Date() },
            { new: true }
        );
        if (!note) return res.status(404).json({ status: 'error', message: 'Note not found' });
        res.status(200).json({
            status: 'success',
            message: 'Note updated successfully',
            data: note
        });
    } catch (error:any) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
};

export const deleteNote = async (req: Request, res: Response) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ status: 'error', message: 'Note not found' });
        res.status(204).json({
            status: 'success',
            message: 'Note deleted successfully'
        });
    } catch (error:any) {
        res.status(500).json({
            status: 'error',
            message: 'Server error',
            error: error.message
        });
    }
};