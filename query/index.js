const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
	if (type === 'PostCreated') {
		const {id, title} = data;
		const comments = [];
		posts[id] = {id, title, comments};
	}
	if (type === 'CommentCreated') {
		const {id, content, postId, status} = data;
		const post = posts[postId];
		post.comments.push({id, content, status});
	}
	if (type === 'CommentUpdated') {
		console.log('4002 commentUpdated: ' + data.status);
		const {id, postId: postId, content, status} = data;
		const comment = posts[postId].comments.find((c) => {
			return c.id === id;
		});
		comment.status = status;
		comment.content = content;
	}
};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const {type, data} = req.body;
	handleEvent(type, data);

	res.send({});
});

app.listen(4002, async () => {
	console.log('Listening on 4002');

	const res = await axios.get('http://localhost:4005/events');
	for (let event of res.data) {
		console.log('4002 Sync event : ' + event.type + ' : ' + event.data);
		handleEvent(event.type, event.data);
	}
});