import express, { Request, Response } from 'express';
import { parseCV } from '../services/cvParser';

const router = express.Router();

const handleChat =  async(req: Request, res: Response): Promise<any> => {
    try{
        const {question} = req.body;
    
        if(!question) {
            return res.status(400).json({error: 'Question is required!'})
        }

        const que = question.toLowerCase();
        const cvText = await parseCV();
        const lowerCaseCvText = cvText.toLowerCase();

        let ans = "Sorry I couldn't understand your question :(";

        if (que.includes('last role') || que.includes('recent job')){
            if (lowerCaseCvText.includes('ifs r&d international')) {
            ans = 'Your most recent job is Undergraduate Trainee (Application Framework) at IFS R&D International (Pvt) Ltd.';
            } 
            else if (lowerCaseCvText.includes('techylo solutions')) {
                ans = 'Your most recent job is Technical Writer at Techylo Solutions.';
            } 
            else {
                ans = "I couldn't find your recent job.";
            }
        }

        else if (que.includes('where') && que.includes('work')) {
            const companies: string[] = [];

            if (lowerCaseCvText.includes('ifs r&d international')) companies.push('IFS R&D International (Pvt) Ltd');
            if (lowerCaseCvText.includes('techylo solutions')) companies.push('Techylo Solutions');
            if (lowerCaseCvText.includes('medcube')) companies.push('MedCube Pvt Ltd');

            ans = companies.length > 0
                ? `You have worked at: ${companies.join(', ')}`
                : "I couldn't find any companies in your resume";
        }

        else if (que.includes('skills') || que.includes('technologies')) {
            if (lowerCaseCvText.includes('java') || lowerCaseCvText.includes('plsql')) {
                ans = 'Your skills include Java, PLSQL, and Oracle.';
            } 
            else {
                ans = "I couldn't find your technical skills";
            }
        }

        else {
            ans = `I couldn't understand your question. Please ask another question.`;
        }

    res.json({ans});
    }
    
    catch (err) {
        console.error("Error in processing answer: ", err);
        res.status(500).json({err: 'Server is down'})
    }
}

router.post('/', handleChat);
export default router;