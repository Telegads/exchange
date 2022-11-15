// Header.tsx
import React, { FC } from 'react';
import { HeaderAccount } from './HeaderAccount';
import { LanguageSelector } from './LanguageSelector';
import { HeaderMenu } from './HeaderMenu';
import { Logo } from './Logo';
import { Session } from 'next-auth';

type HeaderProps = {
	session: Session | null;
};

const Header: FC<HeaderProps> = ({session}) => {
	return (
		<header className='header'>
			<div className='header__img_line'></div>
			<div className='header__container'>
				<Logo />
				<LanguageSelector />
				<HeaderMenu />
				<HeaderAccount session={session}/>
			</div>
		</header>
	);
};

export default Header;
