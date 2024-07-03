import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';

const Draft = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const submitData = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		try {
			const body = { title, content };
			await fetch('/api/post', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			await Router.push('/drafts');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Layout>
			<div>
				<form onSubmit={submitData}>
					<h1 className="italic">New Draft</h1>
					<input
						autoFocus
						onChange={e => setTitle(e.target.value)}
						placeholder='Title'
						type='text'
						value={title}
					/>
					<textarea
						cols={50}
						onChange={e => setContent(e.target.value)}
						placeholder='Content'
						rows={8}
						value={content}
					/>
          <input
            className="hover:bg-slate-300 cursor-pointer px-3 py-1 border border-gray-400 rounded-md bg-slate-200"
						disabled={!content || !title}
						type='submit'
						value='Create'
					/>
					<a
						className='back bg-transparent hover:bg-red-200 px-3 py-1.5 rounded-md'
						href='#'
						onClick={() => Router.push('/')}>
						Cancel
					</a>
				</form>
			</div>
			<style jsx>{`
				.page {
					background: var(--geist-background);
					padding: 3rem;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				input[type='text'],
				textarea {
					width: 100%;
					padding: 0.5rem;
					margin: 0.5rem 0;
					border-radius: 0.25rem;
					border: 0.125rem solid rgba(0, 0, 0, 0.2);
				}

				.back {
					margin-left: 1rem;
				}
			`}</style>
		</Layout>
	);
};

export default Draft;
