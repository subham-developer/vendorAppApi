import express from 'express';
import { ConvertExcelToPDF } from '../Controller/ConvertExcelToPdf.controller';

const router = express.Router();

router.get('/', ConvertExcelToPDF);

export default router;