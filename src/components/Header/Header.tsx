// Header.tsx
import React from "react";
import { HeaderAccount } from "./HeaderAccount";
import { LanguageSelector } from "./LanguageSelector";
import { HeaderMenu } from "./HeaderMenu";
import { Logo } from "./Logo";
import { Navbar, Container, Offcanvas } from "react-bootstrap";

const Header: React.FC = () => {
  return (
<<<<<<< Updated upstream
    <header className="header">
      <div className="header__img_line"></div>
      <div className="header__container">
=======
    <Navbar expand='lg' className="pt-5">
      <Container className="d-flex align-items-baseline justify-content-between">

>>>>>>> Stashed changes
        <Logo />
        <LanguageSelector />
        <HeaderMenu />
        <HeaderAccount />



        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              <Logo />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* <HeaderMenu /> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>

    </Navbar>
  );
};

export default Header;
