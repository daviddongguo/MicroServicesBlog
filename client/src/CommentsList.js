/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios';
import React, {useEffect, useState} from 'react';

export default ({postId}) => {
	console.log('Inside CommentsList, postId: ' + postId);
	const [comments, setComments] = useState([]);

	const fetchComments = async () => {
		const res = await Axios.get(
			'http://localhost:4001/posts/' + postId + '/comments'
		);
		console.log('comments result: ' + res.data);
		console.log(res.data);

		setComments(res.data);
	};

	useEffect(() => {
		fetchComments();
	}, []);

	// console.log(comments);

	const renderedComments = comments.map((comment) => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return (
		<div>
			<ul>{renderedComments}</ul>
		</div>
	);
};
