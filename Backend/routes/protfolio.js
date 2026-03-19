import { Router } from "express";
import { Intro } from "../models/intro.js";
import { About } from "../models/about.js";
import { Skills } from "../models/skills.js";
import Projects from "../models/Porjects.js";

import { Contact } from "../models/contact.js";
import { Message } from "../models/message.js";
import { SocialLink } from "../models/SocialLinks.js";
import { CoreSkills } from "../models/coreSkills.js";
import User from "../models/User.js";
import { ContactInfo } from "../models/contactInfo.js";


const router = Router();

router.get("/get-protfolio-data", async (req, res) => {
    try {
        const intro = await Intro.findOne();
        const about = await About.findOne();
        const skills = await Skills.find();
        const projects = await Projects.find();
        const contact = await Contact.findOne();
        const contactInfo=await ContactInfo.findOne();
        const user = await User.findOne();
        const message = await Message.find();
        const socialLink = await SocialLink.find();
        const coreSkills = await CoreSkills.find();
        res.send({ intro, about, skills, projects, contact, contactInfo, user, message, socialLink, coreSkills });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;