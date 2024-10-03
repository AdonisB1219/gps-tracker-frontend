import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import Container from "../Container";
import { Button } from "../Button";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [visible, setVisibility] = useState(false);

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
    };
    return (
      <>
        <CustomNavLinkSmall onClick={() => scrollTo("nosotros")}>
          <Span>{"Nosotros"}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("mision")}>
          <Span>{"Misión"}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall onClick={() => scrollTo("vision")}>
          <Span>{"Visión"}</Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall>
          <NavLink to="/">
          <Span>{"Catálogo"}</Span>
          </NavLink>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall>
          <NavLink to="/">
          <Span>{"Accesorios"}</Span>
          </NavLink>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall
          style={{ width: "180px" }}
          onClick={() => scrollTo("Ingresar")}
        >
          <Span>
            <NavLink to="/auth" >
            <Button color="#E5CD8C">{"Ingresar"}</Button>
            </NavLink>
          </Span>
        </CustomNavLinkSmall>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <img src="logo.png" width="101px"/>
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default Header;
