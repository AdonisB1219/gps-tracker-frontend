import { Row, Col } from "antd";
import { SvgIcon } from "../SvgIcon";
import Container from "../Container";

import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  Language,
} from "./styles";


const Footer = () => {



  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{"Contacto"}</Language>
              <Large to="/">{"Pongáse en contacto"}</Large>
              <Para>
                {`¿Tienes una pregunta?`}
              </Para>
              <a href="mailto:l.qqbadze@gmail.com">
                <Chat>{`Coméntala`}</Chat>
              </a>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Nosotros"}</Title>
              <Large to="/">{"Misión"}</Large>
              <Large to="/">{"Visión"}</Large>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{"Direccion"}</Language>
              <Para>Direccion</Para>
              <Para>Direccion</Para>
              <Para>Direccion</Para>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{"Compañía"}</Title>
              <Large to="/">{"Nosotros"}</Large>
              <Large to="/">{"Blog"}</Large>
              <Large to="/">{"Careers & Culture"}</Large>
            </Col>
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{ paddingTop: "3rem" }}
          >
            <NavLink to="/">
              <LogoContainer>
                <img
                  src="logo.jpeg"
                  aria-label="homepage"
                  height="64px"
                />
              </LogoContainer>
            </NavLink>

          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default Footer;
