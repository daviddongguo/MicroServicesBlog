const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
	const event = req.body;
	console.log('4005 Received Event : ' + event.type);

	events.push(event);

	axios.post('http://localhost:4000/events', event); // for post
	axios.post('http://localhost:4001/events', event); // for comment
	axios.post('http://localhost:4002/events', event); // for query
	axios.post('http://localhost:4003/events', event); // for moderation

	res.send({status: 'OK'});
});

app.get('/events', (req, res) => {
	res.send(events);
});

app.listen(4005, () => {
	console.log('Listening on : 4005');
});
