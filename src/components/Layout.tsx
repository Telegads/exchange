import { Session } from 'next-auth';
import React, { ReactNode } from 'react';
import Header from './Header/Header';

type Props = {
	session: Session | null;
};

const Layout: React.FC<Props> = ({ children, session }) => (
	<div className='wrapper'>
		<Header session={session}/>
		{children}
	</div>
);

export default Layout;
