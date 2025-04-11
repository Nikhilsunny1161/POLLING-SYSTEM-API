const Option = require('../models/Option');
const Question = require('../models/Question');

module.exports.addOption = async (req, res) => {
    try {
        const question = await Question.findById(req.params.questionId);
        if (!question) return res.status(404).json({ error: 'Question not found' });

        const option = await Option.create({
            text: req.body.text,
            question: question._id
        });

        question.options.push(option._id);
        await question.save();

        res.status(200).json({
            message: 'Option added successfully',
            option: {
                _id: option._id,
                text: option.text,
                votes: option.votes,
                link_to_vote: `http://localhost:9000/options/${option._id}/add_vote`
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error adding option' });
    }
};

module.exports.addVote = async (req, res) => {
    try {
        const option = await Option.findById(req.params.id);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        option.votes++;
        await option.save();

        res.status(200).json({ message: 'Vote added successfully', votes: option.votes });
    } catch (error) {
        res.status(500).json({ error: 'Error adding vote' });
    }
};

module.exports.deleteOption = async (req, res) => {
    try {
        const option = await Option.findById(req.params.id);
        if (!option) return res.status(404).json({ error: 'Option not found' });

        if (option.votes > 0) {
            return res.status(403).json({ message: 'Cannot delete option with votes' });
        }

        await Question.findByIdAndUpdate(option.question, {
            $pull: { options: option._id }
        });

        await Option.findByIdAndDelete(option._id);
        res.status(200).json({ message: 'Option deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting option' });
    }
};