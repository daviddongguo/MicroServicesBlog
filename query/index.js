const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const {type, data} = req.body;

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
	if (type === 'CommentModerated') {
		console.log('4002 CommentModerated: ' + data);
		const {id, postId, status} = data;
		const post = posts[postId];
		post.comments.map((comment) => {
			if (comment.id === id) {
				comment.status = status;
			}
		});
	}

	res.send({});
});

app.listen(4002, () => {
	console.log('Listening on 4002');
});
