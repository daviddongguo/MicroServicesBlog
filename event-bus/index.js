const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];
const syncEvent = (event) => {
	events.push(event);
	try {
		axios.post('http://posts-clusterip-srv:4000/events', event); // for post
		axios.post('http://localhost:4001/events', event); // for comment
		axios.post('http://localhost:4002/events', event); // for query
		axios.post('http://localhost:4003/events', event); // for moderation
	} catch (err) {
		console.log('some service can not be connected.');
	}
};

app.post('/events', (req, res) => {
	const event = req.body;
	console.log('4005 Received Event : ' + event.type);
	syncEvent(event);

	res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
	res.send(events);
});

app.listen(4005, async () => {
	console.log('Listening on : 4005');

	const postIds = [];
	for (let event in events) {
		if (event.type === 'PostCreated') {
			postIds.push(event.data.id);
		}
	}

	//TODO: pull posts from 4000 save locally
	// and push those posts that didn't exist in 4002
	axios
		.get('http://event-clusterip-srv:4000/posts')
		.then((posts) => {
			if (posts) {
				posts.data.map((post) => {
					if (
						!postIds.some((p) => {
							p.id === post.id;
						})
					) {
						const event = {
							type: 'PostCreated',
							data: {
								id: post.id,
								title: post.title,
							},
						};
						events.push(event);
						console.log('4005 Sync post : ' + post.title);
					}
				});
			}
		})
		.catch((err) => {
			console.log('can not connect to 4000');
		});
});
