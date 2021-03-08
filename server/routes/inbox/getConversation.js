import Message from '../../models/Message';

/**
  * get a particular message
 */
exports.getConversation = async (req, res, next) => {
  try {
    const match_id = req.params.match_id ? req.params.match_id : '';
    if (match_id === '') res.status(404).json({ msg: 'missed required params !' });

    const conv = await Message.findOne({match_id: match_id}).catch((error) => { res.status(500).json({ error: error }); });
    
    if (!conv) {
      return res.status(404).json({
        error: new Error('User not found!')
      });
    }
    res.status(200).json({ 'message': conv });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}