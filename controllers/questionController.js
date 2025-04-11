const Question = require('../models/Question');
const Option = require('../models/Option');

module.exports.create = async (req, res) => {
    try {
        const question = await Question.create({ title: req.body.title });
        res.status(200).json({ message: 'Question created', question });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create question' });
    }
};

module.exports.getQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('options');
        const formattedOptions = question.options.map(option => ({
            _id: option._id,
            text: option.text,
            votes: option.votes,
            link_to_vote: `http://localhost:9000/options/${option._id}/add_vote`
        }));
        res.status(200).json({ id: question._id, title: question.title, options: formattedOptions });
    } catch (err) {
        res.status(500).json({ error: 'Failed to get question' });
    }
};

module.exports.deleteQuestion = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) return res.status(404).json({ error: 'Question not found' });

        await Option.deleteMany({ _id: { $in: question.options } });
        await question.deleteOne();

        res.status(200).json({ message: 'Question and its options deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete question' });
    }
};