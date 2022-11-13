import { Session } from 'next-auth';
import React, { ReactNode } from "react";
import Header from "./Header/Header";
import style from "../scss/index.module.scss";

type Props = {
	session: Session;
};

const Layout: React.FC<Props> = ({ children, session }) => (
	<div className={style.wrapper}>
		<Header session={session}/>
		{children}
	</div>
);

export default Layout;
