import express from 'express'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Resume from '../models/Resume.js'

const router = express.Router()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ✅ DOWNLOAD API (SAFE)
router.get('/download/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    const filePath = path.join(
      __dirname,
      '..',
      'public',
      'uploads',
      'resumes',
      resume.resumeKey
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileName = resume.originalName || resume.resumeKey;

    // ✅ FIXED HEADER
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`
    );

    res.setHeader('Content-Type', resume.mimeType);

    return res.sendFile(filePath);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne().sort({ createdAt: -1 })

    if (!resume) {
      return res.status(404).json({ message: 'No resume found' })
    }

    res.json(resume)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router