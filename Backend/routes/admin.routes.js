import express from 'express'
import mongoose from 'mongoose'
import Projects from '../models/Porjects.js'

const router = express.Router()

router.post('/reorder-Projects', async (req, res) => {
  try {

    const { items } = req.body

    const bulkOps = items.map((item, index) => ({
      updateOne: {
        filter: { _id: item.id }, // ✅ safe
       update: { $set: { order: item.order } }
      },
    }))

    const result = await Projects.bulkWrite(bulkOps) // ✅ FIX


    res.json({ success: true })
  } catch (error) {
    console.error('ERROR:', error)
    res.status(500).json({ success: false })
  }
})

export default router