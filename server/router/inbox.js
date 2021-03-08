import express from 'express';
import addMatch from '../routes/match/addMatch';
import getAll from '../routes/match/getAll';
import getUserMatch from '../routes/match/getUserMatch';

const router = express.Router();

router.post('/', addMatch.addMatch);
router.get('/', getAll.getAll);
router.post('/:inboxID', getUserMatch.getUserMatch);
router.get('/:inboxID', getUserMatch.getUserMatch);

module.exports = router;