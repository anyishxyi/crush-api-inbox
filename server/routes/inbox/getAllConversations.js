import Inbox from '../../models/inbox';

/**
  * Get all Inboxs
 */
exports.getAllConversations = async (req, res, next) => {
  try {
    const inboxs = await Inbox.find().catch((error) => { res.status(500).json({ error: error }); });
    if (!inboxs) {
      return res.status(404).json({ error: new Error('inboxs not found!') });
    }
    res.status(200).json({inboxs: inboxs});
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}