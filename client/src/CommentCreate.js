/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import React, {useState} from 'react';

export default ({postId}) => {
	console.log('Inside CommentCreate, postId: ' + postId);
	const [content, setContent] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();

		await axios.post('http://post.com/posts/' + postId + '/comments', {
			content,
		});
		setContent('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>New Comment</label>
					<input
						className='form-control'
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
					></input>
					<button className='btn btn-primary'>Submit</button>
				</div>
			</form>
		</div>
	);
};
