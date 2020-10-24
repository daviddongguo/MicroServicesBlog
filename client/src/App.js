import React from 'react';
import PostsCreate from './PostsCreate';
import PostsList from './PostsList';

// eslint-disable-next-line
export default () => {
	return (
		<div>
			<h1>Create Post</h1>
			<PostsCreate />
			<hr />
			<h1>Posts</h1>
			<PostsList />
		</div>
	);
};
