import mongoose from 'mongoose';
import MessageModel from '../../models/Message';
const supertest = require("supertest"); // supertest is a framework that allows to easily test web apis
import app from '../../app';

const request = supertest(app);
const messageData = { 
  from: "53467235483cb56c475cc1d6",
  to: "533a59ea52046fc077002815",
  match_id: "53464b0728ac73976d0a3fbf",
  sent_date: new Date(),
  created_date: new Date(),
  content: "Hello !"
};
var savedMessage = null;

describe("testing-message-routes", () => {
  // it("GET /match get all matchs", async done => {
  //   const resp = await request.get("/match")
	// 	const matchs = resp.body ? resp.body.matchs : null
	// 	expect(resp.status).toBe(200)
	// 	expect(matchs.length).toBeDefined()
	// 	done()
  // });
  it("POST /match create a new match", async done => {
    const response = await request.post(`/inbox/${messageData.match_id}`)
																	.send(messageData);
		savedMessage = response.body ? response.body.messageSaved : null
		expect(response.status).toBe(201)
		expect(savedMessage._id).toBeDefined();
		expect(savedMessage.from).toBe(messageData.from);
		expect(savedMessage.to).toBe(messageData.to);
		expect(savedMessage.match_id).toBe(messageData.match_id);
		done()
  });
	// it('GET /match/:userID List All match of one user', async done => {
	// 	const response = await request.get(`/match/${messageData.first_user_id}`)
	// 	const matchs = response.body ? response.body.matchs : null
	// 	expect(response.status).toBe(200)
	// 	expect(matchs.length).toBeDefined()
	// 	done()
	// });
});

afterAll( async () => {
	try {
		await mongoose.disconnect()
	} catch (error) {
		console.error(error);
	}
})