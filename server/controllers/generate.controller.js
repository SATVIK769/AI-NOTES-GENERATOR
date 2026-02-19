import UserModel from "../models/user.model.js";
import Notes from "../models/notes.model.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { generateGeminiResponse } from "../services/gemini.services.js";

export const generateNotes = async(req, res) => {
    try{
        const {
            topic,
            classLevel,
            examType,
            revisionMode = false,
            includeDiagram = false,
            includeChart = false
        } = req.body
        if(!topic){
            return res.status(400).json({message:"Topic is required"})
        }
        const user = await UserModel.findById(req.userId)
        if(!user){
            return res.status(400).json({message:"user is not found"})
        }
        if(user.credits < 10){
            user.isCreditAvailable = false
            await user.save()
            return res.status(403).json({message:"Insufficient credits"});
        }

        const prompt = buildPrompt({
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart
        })
        const aiResponse = await generateGeminiResponse(prompt);


// 🔥 Parse Gemini JSON string
let parsedData;

try {
    parsedData = JSON.parse(aiResponse);
} catch (err) {
    console.error("JSON Parse Failed:", err.message);
    return res.status(500).json({
        error: "Invalid AI response format",
        message: "AI returned invalid JSON format."
    });
}


        const notes = await Notes.create({
            user:user._id,
            topic, classLevel, examType,
            revisionMode, includeDiagram, includeChart, content:parsedData
        })
        user.credits -= 10;
        if(user.credits <= 0) user.isCreditAvailable = false;
        if(!Array.isArray(user.notes)) {
            user.notes = [];
        }
        user.notes.push(notes._id);
        await user.save();

        return res.status(200).json({
            data:parsedData,
            noteId: notes._id,
            creditsLeft: user.credits
        })
    }
    catch(error){
        return res.status(500).json({
            error: "AI generation failed",
            message: error.message
        });
    }
}