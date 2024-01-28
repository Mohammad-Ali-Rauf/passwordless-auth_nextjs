'use client';

import React from 'react';

// Animations
import { motion } from 'framer-motion';

import * as jose from 'jose';
import { useCookies } from 'next-client-cookies';

interface IUser {
	email: string;
	name: string;
	iat: number;
	exp: number;
}

const Dashboard = () => {
	const cookies = useCookies();
	
	const token = cookies.get().token

	const user: IUser = jose.decodeJwt(token);

	return (
		<div className='bg-gray-800 min-h-screen flex items-center justify-center'>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='bg-white p-8 rounded-lg shadow-md max-w-xl w-full text-gray-800'
			>
				<h1 className='text-2xl font-bold mb-4 text-center'>
					Welcome,{' '}
					<span className='text-blue-500 inline-block break-all'>
						{user.name}
					</span>
				</h1>

				<div className='mb-6'>
					<h2 className='text-lg font-bold mb-2'>Your Profile</h2>
					<p className='font-semibold'>
						Email: <span className='font-normal break-all'>{user.email}</span>
					</p>
				</div>

				<div className='mb-6'>
					<h2 className='text-lg font-bold mb-2'>Recent Activity</h2>
					<ul>
						<li className='font-semibold'>
							Activity 1:{' '}
							<span className='font-normal'>Lorem, ipsum dolor.</span>
						</li>
						<li className='font-semibold'>
							Activity 2:{' '}
							<span className='font-normal'>Lorem ipsum dolor sit.</span>
						</li>
					</ul>
				</div>

				<div>
					<h2 className='text-lg font-bold mb-2'>Actions</h2>
					<div className='flex flex-col md:flex-row md:justify-between'>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='bg-rose-500 text-white px-4 py-2 rounded-md mb-2 md:mb-0'
						>
							Action 1
						</motion.button>
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							className='bg-blue-500 text-white px-4 py-2 rounded-md'
						>
							Action 2
						</motion.button>
						{/* Add more action buttons */}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Dashboard;
