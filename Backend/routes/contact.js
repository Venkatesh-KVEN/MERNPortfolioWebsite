import express from 'express';
import { body, validationResult } from 'express-validator';
import sendEmail from '../utils/emailService.js'; // Import your email service

const router = express.Router();

// Validation rules for contact form
const contactValidationRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('lastName is required')
    .isLength({ min: 2, max: 50 }).withMessage('lastName must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('lastName can only contain letters and spaces'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 3, max: 100 }).withMessage('Subject must be between 3 and 100 characters'),
  
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 1000 }).withMessage('Message must be between 10 and 1000 characters')
    .escape(), // Sanitize HTML
];

// Contact form endpoint
router.post('/api/contact', contactValidationRules, async (req, res) => {
  try {
        // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    const { name, lastName, email, subject, message } = req.body;


    // Email to admin/company
    const adminEmailOptions = {
      email: process.env.EMAIL_USER, // Send to your email
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p><strong style="color: #4CAF50;">Name:</strong> ${name}</p>
            <p><strong style="color: #4CAF50;">lastName:</strong> ${lastName}</p>
            <p><strong style="color: #4CAF50;">Email:</strong> ${email}</p>
            <p><strong style="color: #4CAF50;">Subject:</strong> ${subject}</p>
            
            <div style="margin-top: 20px;">
              <strong style="color: #4CAF50;">Message:</strong>
              <p style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4CAF50;">
                ${message.replace(/\n/g, '<br>')}
              </p>
            </div>
            
            <p style="color: #666; font-size: 12px; margin-top: 20px;">
              Sent at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    // Auto-reply to user
    const userEmailOptions = {
      email: email, // Send to the user who filled the form
      subject: 'Thank You for Contacting Us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            Thank You for Reaching Out!
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px;">
            <p>Dear <strong>${name} ${lastName}</strong>,</p>
            
            <p>Thank you for contacting us. We have received your message and will get back to you as soon as possible (usually within 24 hours).</p>
            
            <div style="margin-top: 20px;">
              <p><strong>Your Message Details:</strong></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #4CAF50;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <p style="margin-top: 20px;">Best regards,<br>
            <strong>Your Company Team</strong></p>
          </div>
        </div>
      `
    };

    // Send both emails using your sendEmail function
    await Promise.all([
      sendEmail(adminEmailOptions),
      sendEmail(userEmailOptions)
    ]);

    res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! We\'ll get back to you soon.' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send message. Please try again later.' 
    });
  }
});

export default router;