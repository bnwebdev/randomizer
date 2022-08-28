import { TFunction } from "i18next";
import { useContext } from "react";
import { FC } from "react";
import { Container, Dropdown, DropdownButton, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { SupportedLocale } from "../constants";
import { LocaleContext } from "../context";
import { useTranslation } from "../hooks";
import { path } from "../utils";
import { Link } from "./UI";

type LinkDescription = {
  to: string;
  label: string;
};

const links: (t: TFunction) => LinkDescription[] = (t) => [
  {
    to: path("/"),
    label: t("homePage.nav"),
  },
  {
    to: path("/randoms"),
    label: t('randomsMakerPage.nav'),
  },
  {
    to: path("/serialize"),
    label: t('serializePage.nav'),
  },
];

const NavbarComponent: FC = () => {
  const t = useTranslation()
  const [, language, setLanguage] = useContext(LocaleContext);

  return <Navbar bg="dark" variant="dark" className="mb-3">
    <Container className="justify-content-around">
      <LinkContainer to={path('/')}>
        <Navbar.Brand>J.Randomizer</Navbar.Brand>
      </LinkContainer>
      <Nav>
        {links(t).map((props) => (
          <Link key={props.to} {...props} />
        ))}
      </Nav>
      <DropdownButton title={language}>
        {Object.values(SupportedLocale).map(key => <Dropdown.Item onClick={() => setLanguage(key)}>{key}</Dropdown.Item>)}
      </DropdownButton>
    </Container>
  </Navbar>
};

export default NavbarComponent;
