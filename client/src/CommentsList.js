/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import CommentCreate from './CommentCreate';

export default (props) => {
	console.log('Inside CommentsList, postId: ' + props.postId);
	const [comments, setComments] = useState({});

	const fetchComments = async () => {
		const res = await Axios.get(
			'http://localhost:4001/posts/' + props.postId + '/comments'
		);
		console.log('comments result: ' + res.data);
		console.log(res.data);

		setComments(res.data);
	};

	useEffect(() => {
		fetchComments();
	}, []);

	// console.log(comments);

	const renderedComments = Object.values(comments).map((comment) => {
		return (
			<div className='card' key={comment.id}>
				<div className='card-body'>
					<h4>{comment.content}</h4>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div>{renderedComments}</div>
			<CommentCreate postId={props.postId} />
		</div>
	);
};
