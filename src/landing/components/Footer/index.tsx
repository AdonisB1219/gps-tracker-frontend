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
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { AiFillTikTok } from "react-icons/ai";

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
          <Row
            justify="space-between"
            style={{
              maxWidth: "600px",
            }}
          >
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{"Contacto"}</Language>
              <CustomNavLinkSmall
                style={{ color: "#213363", marginLeft: 0 }}
                onClick={() => scrollTo("contact")}
              >
                <Span>{"Tienes una pregunta"}</Span>
              </CustomNavLinkSmall>
            </Col>
            <Col
              lg={8}
              md={8}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                alignItems: "start",
              }}
            >
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

          <Row justify="start">
            <Col lg={9} md={9} sm={12} xs={12}>
              <Empty />
              <Language>{"Dirección"}</Language>
              <Para>Av. 25 de Julio y Av. Ernesto Albán Mosquera esquina.</Para>
            </Col>
            <Col
              lg={9}
              md={9}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.2rem",
                alignItems: "start",
                justifyContent: "center",
              }}
            >
              <CustomNavLinkSmall
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#213363",
                  marginLeft: 0,
                }}
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/incontro_divino.ec/profilecard/?igsh=MWN3MGd2MnducTEyNg==",
                    "_blank"
                  )
                }
              >
                <InstagramIcon style={{ marginRight: "0.5rem" }} />
                <Span>Instagram</Span>
              </CustomNavLinkSmall>

              <CustomNavLinkSmall
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#213363",
                  marginLeft: 0,
                }}
                onClick={() =>
                  window.open("https://wa.me/563967708242", "_blank")
                }
              >
                <WhatsAppIcon style={{ marginRight: "0.5rem" }} />
                <Span>Whatsapp</Span>
              </CustomNavLinkSmall>

              <CustomNavLinkSmall
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#213363",
                  marginLeft: 0,
                }}
                onClick={() =>
                  window.open(
                    "https://www.tiktok.com/@incontro_divino.ec?_t=8qPDsGGeAo2&_r=1",
                    "_blank"
                  )
                }
              >
                <AiFillTikTok
                  style={{
                    marginRight: "0.5rem",
                    width: "24px",
                    height: "24px",
                  }}
                />
                <Span>Tiktok</Span>
              </CustomNavLinkSmall>
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
