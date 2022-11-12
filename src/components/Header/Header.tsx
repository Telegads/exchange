// Header.tsx
import React, { FC } from 'react';
import { HeaderAccount } from './HeaderAccount';
import { LanguageSelector } from './LanguageSelector';
import { HeaderMenu } from './HeaderMenu';
import { Logo } from './Logo';
import { Session } from 'next-auth';
import { Navbar, Container } from "react-bootstrap";
import { Burger } from "./Burger";

type HeaderProps = {
	session: Session;
};


const Header: FC<HeaderProps> = ({session}) => {
	return (
		<Navbar className='navbar'>
			<Container className='d-flex align-items-center justify-content-between'>
				<Logo />
				<LanguageSelector />
				<HeaderMenu />
				<HeaderAccount session={session}/>
        <Burger />
			</Container>
		</Navbar>
	);
};

export default Header;
