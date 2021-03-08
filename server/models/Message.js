import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const messageSchema = mongoose.Schema({
  match_id			: { type: String, required: true },
	from					:	{ type: String, required: true },
	to						:	{ type: String, required: true },
	sent_date			:	{ type: String, required: true },
	created_date	:	{ type: String, required: true },
	content				:	{ type: String, required: true }
});

messageSchema.plugin(uniqueValidator);

const messageModel = new mongoose.model('Message', messageSchema);

export default messageModel;