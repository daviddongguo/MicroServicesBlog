const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');

const posts = {};
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/posts', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const {title} = req.body;

	// Save locally
	posts[id] = {
		id,
		title,
	};

	// Save in Event Bus
	await axios.post('http://localhost:4005/events', {
		type: 'PostCreated',
		data: {
			id,
			title,
		},
	});

	res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('4000 Received Event: ', req.body.type);
	if ((req.body.type = 'PostCreated')) {
		const post = req.body.data;
	}

	res.send({});
});

app.listen(4000, async () => {
	console.log('Listen on 4000');

	const postIds = [];
	Object.values(posts).map((post) => {
		postIds.push[post.id];
	});

	const res = await axios.get('http://localhost:4005/events');

	for (let event of res.data) {
		console.log('4000 received event : ' + event);
		if (event.type === 'PostCreated') {
			const post = event.data;
			if (
				!postIds.some((p) => {
					p === post.id;
				})
			) {
				posts[post.id] = {
					id: post.id,
					title: post.title,
				};
			}
		}
	}
});
