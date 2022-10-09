import React, { ReactNode } from "react";
import Header from "./Header/Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="wrapper">
    <Header />
    {props.children}
  </div>
);

export default Layout;
