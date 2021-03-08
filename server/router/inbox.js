import express from 'express';
import getAllConversations from '../routes/inbox/getAllConversations';
import newConversation from '../routes/inbox/newConversation';
import getConversation from '../routes/inbox/getConversation';
import newMessage from '../routes/inbox/newMessage';

const router = express.Router();

router.get('/', getAllConversations.getAllConversations);
router.post('/', newConversation.newConversation);
router.post('/:match_id', getConversation.getConversation);
router.get('/:match_id', newMessage.newMessage);

module.exports = router;