import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import React, { FC } from 'react';

type HeaderAccountProps = {
	session: Session;
};

export const HeaderAccount: FC<HeaderAccountProps> = ({ session }) => {
	return (
		<>
			{!session && (
				<div className='header__btn_reg header__btn_none'>
					<Link href='/api/auth/signin'>
						<a href='#'>Вход</a>
					</Link>
					<img src='/img/icons/adduser.svg' alt='' />
				</div>
			)}
			{session && (
				<div className='header__balance_logout'>
					<div className='header__balance'>
						<a href='#'>
							<img src='/img/icons/plus.svg' alt='' />
						</a>
					</div>
					<div className='header__logout'>
						<button onClick={() => signOut()}>Выйти</button>
						<div>{session.user.name}</div>
						<a href='#'>
							<img src='/img/icons/adduser.svg' alt='' />
						</a>
					</div>
				</div>
			)}
		</>
	);
};
