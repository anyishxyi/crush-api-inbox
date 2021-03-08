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
	it('create & save a match successfully', async () => {
		const match = new MessageModel(messageData);
		savedMessage = await match.save();

		expect(savedMessage._id).toBeDefined();
		expect(savedMessage.from).toBe(messageData.from);
		expect(savedMessage.to).toBe(messageData.to);
		expect(savedMessage.match_id).toBe(messageData.match_id);
	});
	// it('get all matches', async () => {
	// 	const matches = await MessageModel.find();
	// 	expect(matches.length).toBeDefined();	
	// });
	// it('List All match of one user', async () => {
	// 	const matches = await MessageModel.find({first_user_id: messageData.first_user_id, second_user_id: messageData.first_user_id});
	// 	expect(matches.length).toBeDefined();	
	// });
})

afterAll( async () => {
	try {
		await MessageModel.findOneAndDelete({_id: savedMessage._id});
		await mongoose.disconnect()
		// console.log('\nSuccessully disconnected to MongoDB Atlas !\n')
	} catch (error) {
		console.error(error);
	}
})