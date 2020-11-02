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

app.post('/posts/create', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const {title} = req.body;

	// Save locally
	posts[id] = {
		id,
		title,
	};

	// Save in Event Bus
	axios
		.post('http://event-bus-srv:4005/events', {
			type: 'PostCreated',
			data: {
				id,
				title,
			},
		})
		.then()
		.catch((err) => {
			console.log('post events failed');
		});

	res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('4000 Received Event: ', req.body.type);
	if ((req.body.type = 'CommentUpdated')) {
		const comment = req.body.data;
	}

	res.send({});
});

app.listen(4000, async () => {
	console.log('Listen on 4000');
	console.log('version 1.0.0');

	const postIds = [];
	Object.entries(posts).map(([id, post]) => {
		postIds.push[id];
	});

	axios
		.get('http://event-bus-srv:4005/events')
		.then((res) => {
			for (let event of res.data) {
				console.log(
					'4000 Sync Post : ' + event.type + ' : ' + event.data.title
				);
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
		})
		.catch((err) => {
			console.log('connecting 4005 fail');
		});
});
