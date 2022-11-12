// Header.tsx
import React from "react";
import { HeaderAccount } from "./HeaderAccount";
import { LanguageSelector } from "./LanguageSelector";
import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";
import { Navbar, Container, Offcanvas } from "react-bootstrap";
import { Burger } from "./Burger";

const Header: React.FC = () => {
  return (
    <Navbar className="navbar">
      <Container className="d-flex align-items-center justify-content-between">
        <Logo />
        <LanguageSelector />
        <HeaderMenu />
        <HeaderAccount />
        <Burger />
      </Container>
    </Navbar>
  );
};

export default Header;
