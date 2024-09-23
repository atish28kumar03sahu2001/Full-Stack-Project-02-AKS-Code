//backend/routes/index.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import {createPlayer, getPlayers, deletePlayer, patchPlayer} from '../controller/index.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed'));
    }
}).single('playerimage');

router
    .post("/",upload,createPlayer)
    .get("/",getPlayers)
    .delete("/:id",deletePlayer)
    .patch("/:id",upload, patchPlayer);

export const PlayerRouter = router;