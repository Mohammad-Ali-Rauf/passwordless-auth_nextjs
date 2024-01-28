import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CookiesProvider } from 'next-client-cookies/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SecureTokenX',
	description: 'Created, designed and developed by Mohammad Ali',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<CookiesProvider>
					{children}
				</CookiesProvider>
			</body>
		</html>
	);
}
