/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default ({comments}) => {
	// const [comments, setComments] = useState([]);

	// const fetchComments = async () => {
	// 	const res = await Axios.get(
	// 		'http://localhost:4001/posts/' + postId + '/comments'
	// 	);
	// 	console.log('comments result: ' + res.data);
	// 	console.log(res.data);

	// 	setComments(res.data);
	// };

	// useEffect(() => {
	// 	fetchComments();
	// }, []);

	// console.log(comments);

	const renderedComments = comments.map((comment) => {
		if (comment.status === 'approved') {
			return <li key={comment.id}>{comment.content}</li>;
		}
		return (
			<li key={comment.id}>
				{comment.content} is {comment.status}
			</li>
		);
	});

	return (
		<div>
			<ul>{renderedComments}</ul>
		</div>
	);
};
