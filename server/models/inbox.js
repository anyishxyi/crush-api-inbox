import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const inboxSchema = mongoose.Schema({
  match_id: { type: String, required: true }
});

inboxSchema.plugin(uniqueValidator);

const inboxModel = new mongoose.model('Inbox', inboxSchema);

export default inboxModel;