import { FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "./UI";

type LinkDescription = {
  to: string;
  label: string;
};

const links: LinkDescription[] = [
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/randoms",
    label: "Maker",
  },
  {
    to: "/serialize",
    label: "Serializer",
  },
];

const NavbarComponent: FC = () => (
  <Navbar bg="light" variant="light" className="mb-3">
    <Container className="justify-content-around">
      <LinkContainer to="/">
        <Navbar.Brand>J.Randomizer</Navbar.Brand>
      </LinkContainer>
      <Nav>
        {links.map((props) => (
          <Link key={props.to} {...props} />
        ))}
      </Nav>
    </Container>
  </Navbar>
);

export default NavbarComponent;
