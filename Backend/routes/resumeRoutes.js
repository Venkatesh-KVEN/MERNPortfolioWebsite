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
    const resume = await Resume.findById(req.params.id)

    console.log("👉 Resume:", resume)

    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' })
    }

    const fileName = resume.resumeKey

    console.log("👉 fileName:", fileName)

    if (!fileName) {
      return res.status(400).json({ message: 'File not stored in DB' })
    }

    const filePath = path.join(
      __dirname,
      '..',
      'public',
      'uploads',
      'resumes',
      fileName
    )

    console.log("👉 filePath:", filePath)

    // ✅ Check file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: 'File not found on server',
        path: filePath
      })
    }

    res.download(filePath)

  } catch (err) {
    console.error("❌ DOWNLOAD ERROR:", err)
    res.status(500).json({ error: err.message })
  }
})

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