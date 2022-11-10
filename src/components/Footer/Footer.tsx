import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <Container as="footer">
      <Row className={`justify-content-md-between flex-column flex-md-row ${style.footer__wrapper}`}>
        <Col className={`mb-5 mb-md-0 ${style.footer__navigation}`}>
          <p className={style.footer__subtitle}>Навигация</p>

          <Row className="flex-column">
            <Col className="mb-5"><a href="catalog.html">Каталог каналов</a></Col>
            <Col className="mb-5"><a href="https://docs.google.com/forms/d/1aV4RXuysmTOLIc-9rDN75zIrc94mkw4jV5br6HY-pxM/edit">Рекламодателям</a></Col>
            <Col className="mb-5"><a href="https://docs.google.com/forms/d/1aV4RXuysmTOLIc-9rDN75zIrc94mkw4jV5br6HY-pxM/edit">Администраторам</a></Col>
            <Col className="mb-5"><a href="https://docs.google.com/forms/d/1aV4RXuysmTOLIc-9rDN75zIrc94mkw4jV5br6HY-pxM/edit">Агентствам</a></Col>
            <Col className="mb-5"><a href="#">Реферальная программа</a></Col>
            <Col className="mb-5"><a href="#">Статьи</a></Col>
          </Row>
        </Col>

        <Col className={style.footer__contacts} xs='auto'>
          <p className={style.footer__subtitle}>Связь с нами</p>
          <a href="mailto:support@adgram.io">support@adgram.io</a>
        </Col>
      </Row>

      <div className={style.footer__line}></div>
      <Row className={`justify-content-between ${style.footer__copyright}`}>
        <Col xs='auto'>
          <p className={style.footer__copy}>©TYelegards 2022</p>
        </Col>
        <Col xs='auto'>
          <a href="https://telegads.uz"><img src="img/footer/logo.svg" alt="" /></a>
        </Col>
      </Row>

    </Container>
  )
};

export default Footer