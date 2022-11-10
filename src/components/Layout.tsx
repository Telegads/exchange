import React, { ReactNode } from "react";
import Header from "./Header/Header";
import style from "../scss/index.module.scss";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className={style.wrapper}>
    <Header />
    {props.children}
  </div>
);

export default Layout;
