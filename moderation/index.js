const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
const moderate = (type, data) => {
	if (type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				content: data.content,
				postId: data.postId,
				status,
			},
		});
	}
};

app.post('/events', (req, res) => {
	//console.log('4003 received event : ' + req.body.type);
	const {type, data} = req.body;
	moderate(type, data);

	res.send({});
});

app.listen(4003, async () => {
	console.log('Listening on 4003');

	const res = await axios.get('http://event-bus-srv:4005/events');
	console.log('4003 Received Events :');
	for (let event of res.data) {
		moderate(event.type, event.data);
		console.log('4003 Processing event : ' + event.type);
	}
	console.log('end of for loop');
});
