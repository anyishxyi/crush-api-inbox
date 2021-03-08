require('dotenv').config();
import mongoose from 'mongoose';
import MessageModel from '../../models/Message';
const messageData = { 
  from: "53467235483cb56c475cc1d6",
  to: "533a59ea52046fc077002815",
  match_id: "53464b0728ac73976d0a3fbf",
  sent_date: new Date(),
  created_date: new Date(),
  content: "Hello !"
}

var savedMessage = null;

beforeAll(() => {
	mongoose.connect(process.env.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true })
					.then(() => { /*console.log('\nSuccessully connected to MongoDB Atlas !\n')*/} )
					.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));
});
describe('Message Model Unit Test', () => {
	it('Add a new message in the conversation', async () => {
		const match = new MessageModel(messageData);
		savedMessage = await match.save();

		expect(savedMessage._id).toBeDefined();
		expect(savedMessage.from).toBe(messageData.from);
		expect(savedMessage.to).toBe(messageData.to);
		expect(savedMessage.match_id).toBe(messageData.match_id);
	});
	it('Get a particular conversation from the inbox', async () => {
		const message = await MessageModel.findOne({_id: savedMessage._id}).catch((error) => { res.status(500).json({ error: error }); });

		expect(message.from).toBe(messageData.from);
		expect(message.to).toBe(messageData.to);
		expect(message.match_id).toBe(messageData.match_id);
	});
})

afterAll( async () => {
	try {
		// await MessageModel.findOneAndDelete({_id: savedMessage._id});
		await mongoose.disconnect()
		// console.log('\nSuccessully disconnected to MongoDB Atlas !\n')
	} catch (error) {
		console.error(error);
	}
})