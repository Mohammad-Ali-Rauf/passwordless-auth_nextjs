'use client';

import React, { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');

	const validateEmail = () => {
		setError(email.trim() === '' ? 'Email is required' : '');
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		validateEmail();

		if (!error) {
			try {
				const response = await fetch('http://localhost:3000/api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email }),
				});

				if (response.ok) {
					console.log('Login successful!');
				} else {
					console.log('Login failed.');
				}
			} catch (error) {
				console.error('Error during login:', error);
			}

			setEmail('');
		} else {
			console.log('Error');
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -50 }}
				transition={{ duration: 0.5 }}
				className='bg-white p-8 rounded shadow-md w-96'
			>
				<h2 className='text-2xl font-bold mb-6 flex justify-center tracking-wide'>
					Welcome <span className='text-blue-500 pl-2'>Back</span>
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='email'
							className='block text-gray-600 text-sm font-semibold mb-2'
						>
							Email
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={`w-full p-2 border rounded focus:outline-none ${
								error ? 'border-red-500' : 'focus:border-blue-500'
							}`}
						/>
						{error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
					</div>
					<button
						type='submit'
						className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none'
					>
						Login
					</button>
				</form>
			</motion.div>
		</div>
	);
};

export default Home;
