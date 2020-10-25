const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', (req, res) => {
	console.log('4003 received event : ' + req.body.type);
	const {type, data} = req.body;
	if (type === 'CommentCreated') {
		const status = data.content.includes('orange') ? 'rejected' : 'approved';

		axios.post('http://localhost:4005/events', {
			type: 'CommentModerated',
			data: {
				id: data.id,
				content: data.content,
				postId: data.postId,
				status,
			},
		});
	}
	res.send({});
});

app.listen(4003, () => {
	console.log('Listening on 4003');
});
