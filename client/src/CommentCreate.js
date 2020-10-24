/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import React, {useState} from 'react';

export default () => {
	const [content, setContent] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();

		await axios.post('http://localhost:4001/posts//comments', {content});
		setContent('');
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>Comment</label>
					<input
						value={content}
						onChange={(e) => {
							setContent(e.target.value);
						}}
						className='form-control'
					></input>
					<button className='btn btn-primary'>Submit</button>
				</div>
			</form>
		</div>
	);
};
