import Message from '../../models/Message';

/**
  * Add a new message
 */
exports.newMessage = async (req, res, next) => {
  const pass = req.body.password ? req.body.password : '';
	if(!req.body.from || !req.body.to || !req.body.match_id || !req.body.content ) res.status(304).json({ error: 'misseg required fields' });
	const messageData = { 
		from: req.body.from,
		to: req.body.to,
		match_id: req.body.match_id,
		sent_date: new Date(),
		created_date: new Date(),
		content: req.body.content
	}

  const message = new Message(messageData);
  const savedMessage = await message.save();

  if(!savedMessage) res.status(500).json({ error: error });

  res.status(201).json({ messageSaved: savedMessage });
}