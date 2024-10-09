import { Row, Col } from "antd";
import Container from "../Container";

import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Empty,
  Language,
} from "./styles";
import { CustomNavLinkSmall, Span } from "../Header/styles";

const Footer = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between"
            style={{
              maxWidth: "600px", 
            }}>
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{"Contacto"}</Language>
              <CustomNavLinkSmall
                style={{ color: "#213363", marginLeft: 0 }}
                onClick={() => scrollTo("contact")}
              >
                <Span>{"Tienes una pregunta"}</Span>
              </CustomNavLinkSmall>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12} style={{ display: "flex", flexDirection: "column", gap: "0.2rem", alignItems: "start" }}>
            <Title>{"Nosotros"}</Title>
              <CustomNavLinkSmall
                style={{ color: "#213363", marginLeft: 0 }}
                onClick={() => scrollTo("mision")}
              >
                <Span>{"Misión"}</Span>
              </CustomNavLinkSmall>
              <CustomNavLinkSmall
                style={{ color: "#213363", marginLeft: 0 }}
                onClick={() => scrollTo("vision")}
              >
                <Span>{"Visión"}</Span>
              </CustomNavLinkSmall>
            </Col>
          </Row>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{"Dirección"}</Language>
              <Para>Av. 25 de Julio y Av. Ernesto Albán Mosquera esquina.</Para>
            </Col>
          </Row>
        </Container>
      </FooterSection>
      <Extra>
        <Container border={true}>
          <Row
            justify="space-between"
            align="middle"
            style={{
              maxWidth: "600px", 
            }}
          >
            <NavLink to="/">
              <LogoContainer>
                <img src="logo.png" aria-label="homepage" height="64px" />
              </LogoContainer>
            </NavLink>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default Footer;
