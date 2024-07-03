import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const Header = () => {
	const router = useRouter();
	const isActive: (pathname: string) => boolean = pathname => router.pathname === pathname;

	const { data: session, status } = useSession();

	let left = (
		<div className='left'>
			<Link
				href='/'
				className='bold mr-2'
				data-active={isActive('/')}>
				Feed
			</Link>
			<style jsx>{`
				.bold {
					font-weight: bold;
				}

				a {
					text-decoration: none;
					color: var(--geist-foreground);
					display: inline-block;
				}

				.left a[data-active='true'] {
					color: gray;
				}

				a + a {
					margin-right: 1rem;
				}
			`}</style>
		</div>
	);

	let right = null;

	if (status === 'loading') {
		left = (
			<div className='left'>
				<Link
					href='/'
					className='bold'
					data-active={isActive('/')}>
					Feed
				</Link>
				<style jsx>{`
					.bold {
						font-weight: bold;
					}

					a {
						text-decoration: none;
						color: var(--geist-foreground);
						display: inline-block;
					}

					.left a[data-active='true'] {
						color: gray;
					}

					a + a {
						margin-left: 1rem;
					}
				`}</style>
			</div>
		);
		right = (
			<div className='right'>
				<p>Validating session ...</p>
				<style jsx>{`
					.right {
						margin-left: auto;
					}
				`}</style>
			</div>
		);
	}

	if (!session) {
		right = (
			<div className='right'>
				<Link
					href='/api/auth/signin'
					data-active={isActive('/signup')}>
					Log in
				</Link>
				<style jsx>{`
					a {
						text-decoration: none;
						color: var(--geist-foreground);
						display: inline-block;
					}

					a + a {
						margin-left: 1rem;
					}

					.right {
						margin-left: auto;
					}

					.right a {
						border: 1px solid var(--geist-foreground);
						padding: 0.5rem 1rem;
						border-radius: 3px;
					}
				`}</style>
			</div>
		);
	}

	if (session) {
		left = (
			<div className='left'>
				<Link
					href='/'
					className='bold mr-4 border border-black rounded-md px-3 py-1 hover:bg-slate-300'
					data-active={isActive('/')}>
					Feed
				</Link>
				<Link
					href='/drafts'
					className='border border-black rounded-md px-3 py-1 hover:bg-slate-300'
					data-active={isActive('/drafts')}>
					My drafts
				</Link>
				<style jsx>{`
					.bold {
						font-weight: bold;
					}

					a {
						text-decoration: none;
						color: var(--geist-foreground);
						display: inline-block;
					}

					.left a[data-active='true'] {
						color: gray;
					}

					a + a {
						margin-left: 1rem;
					}
				`}</style>
			</div>
		);
		right = (
			<div className='right'>
				<p>
					{session.user.name} ({session.user.email})
				</p>
				<Link href='/create'>
					<button className='border border-black rounded-md px-3 py-1 hover:bg-slate-300'>New post</button>
				</Link>
				<button onClick={() => signOut()}>
					<a className='border border-black rounded-md px-3 py-1 hover:bg-slate-300 ml-2'>Log out</a>
				</button>
				<style jsx>{`
					a {
						text-decoration: none;
						color: var(--geist-foreground);
						display: inline-block;
					}

					p {
						display: inline-block;
						font-size: 13px;
						padding-right: 1rem;
					}

					a + a {
						margin-left: 1rem;
					}

					.right {
						margin-left: auto;
					}
				`}</style>
			</div>
		);
	}

	return (
		<nav>
			{left}
			{right}
			<style jsx>{`
				nav {
					display: flex;
					padding: 2rem;
					align-items: center;
				}
			`}</style>
		</nav>
	);
};

export default Header;
