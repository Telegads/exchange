// Header.tsx
import React, { FC } from 'react';
import { HeaderAccount } from './HeaderAccount';
import { LanguageSelector } from './LanguageSelector';
import { HeaderMenu } from './HeaderMenu';
import { Logo } from './Logo';
import { Session } from 'next-auth';

import styles from './header.module.scss';

type HeaderProps = {
	session: Session | null;
};

const Header: FC<HeaderProps> = ({session}) => {
	return (
		<header className={ styles.header }>
			<div className={ styles.header__img_line }></div>
			<div className={ styles.header__container }>
				<Logo />
				<LanguageSelector />
				<HeaderMenu />
				<HeaderAccount session={session}/>
			</div>
		</header>
	);
};

export default Header;
