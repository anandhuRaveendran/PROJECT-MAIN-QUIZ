const express = require("express");
const router = express.Router();
const quizes = require('../Models/Quizes');
const results = require("../Models/QuizResults");
const verifyToken = require("../middleware/authMiddleware");

router.get("/get-quiz/:joinID", async (req, res) => {
    try {
        const id = req.params.joinID;
        const quizdata = await quizes.findOne({ joinid: id,active:'true' });
        res.json(quizdata);
    } catch (error) {
        console.error('Failed to get quiz:', error);
        res.status(500).json({ error: 'Failed to get quiz' });
    }
});

router.get("/home", async (req, res) => {
    try {
        const quiz_mainlist = await quizes.find({ isPrivate: false, active: true });
        res.json(quiz_mainlist);
    } catch (error) {
        console.error('Failed to get quizzes:', error);
        res.status(500).json({ error: 'Failed to get quizzes' });
    }
});

router.post('/save-result', async (req, res) => {
    try {
        const data = req.body;
        data.qna = JSON.stringify(data.qna);

        const result_details = await results.create(data);
        res.status(200).json({ message: 'Result saved successfully' });
    } catch (error) {
        console.error('Failed to save result:', error);
        res.status(500).json({ error: 'Failed to save result' });
    }
});

router.get("/quiz/:id", async (req, res) => {
    try {
        const quizId = req.params.id;
        const details = await quizes.findOne({ quizid: quizId , active:'true'}, { _id: 0 });
        res.json(details);
    } catch (error) {
        console.error('Failed to get quiz details:', error);
        res.status(500).json({ error: 'Failed to get quiz details' });
    }
});

router.get("/joinquiz", async (req, res) => {
    try {
        const joinId = req.body.joinid;
        const details = await quizes.findOne({ joinid: joinId }, { _id: 0 });
        res.json(details);
    } catch (error) {
        console.error('Failed to join quiz:', error);
        res.status(500).json({ error: 'Failed to join quiz' });
    }
});

router.get('/leaderboard', async (req, res) => {
    try {
        const leaderboard = await results.find().sort({ marksObtained: -1 }); // Sorting by marksObtained in descending order
        res.json(leaderboard);
    } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        res.status(500).json({ message: 'Error fetching leaderboard data', error });
    }
});

router.post("/addQuiz", async (req, res) => {
    try {
        req.body.thumbnail = null;
        const data = req.body;
        const result = await quizes.create(data);
        res.status(201).json(result);
    } catch (error) {
        console.error('Failed to add quiz:', error);
        res.status(500).json({ error: 'Failed to add quiz' });
    }
});

router.put("/updateStatus", async (req, res) => {
    try {
        const creator = { '_id': req.body.id };
        const data = { 'active': req.body.active };

        const result = await quizes.findOneAndUpdate(creator, data);
        res.status(201).json(result);
    } catch (error) {
        console.error('Failed to update status:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});

router.get("/myquizes", verifyToken, async (req, res) => {
    try {
        const user_quizez = await quizes.find({ creator: req.useremail });
        res.json(user_quizez);
    } catch (error) {
        console.error('Failed to get user quizzes:', error);
        res.status(400).json({ error: 'Failed to get user quizzes' });
    }
});

router.get("/quizdetails/:id", async (req, res) => {
    try {
        const quizid = req.params.id;
        const user_quizez = await results.find({ quizid: quizid });
        res.json(user_quizez);

    } catch (error) {
        console.error('Failed to get quiz details:', error);
        res.status(500).json({ error: 'Failed to get quiz details' });
    }
});

router.get("/results", verifyToken, async (req, res) => {
    try {
        const quiz_history = await results.find({ useremail: req.useremail });
        res.json(quiz_history);
    } catch (error) {
        console.error('Failed to get results:', error);
        res.status(500).json({ error: 'Failed to get results' });
    }
});

router.delete('/delete/:quiz_id',verifyToken, async (req, res) => {
    try {
        const id = { '_id': req.params.quiz_id };
        const result = await quizes.findOneAndDelete(id);
        res.status(201).json();
    } catch (error) {
        console.error('Failed to delete quiz:', error);
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
});

module.exports = router;
