import { TFunction } from "i18next";
import { useContext } from "react";
import { FC } from "react";
import { Container, Dropdown, DropdownButton, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { SupportedLocale } from "../../constants";
import { LocaleContext } from "../../context";
import { useTranslation } from "../../hooks";
import { Link } from "../UI";

import './style.css'

type LinkDescription = {
  to: string;
  label: string;
};

const links: (t: TFunction) => LinkDescription[] = (t) => [
  {
    to: "/",
    label: t("homePage.nav"),
  },
  {
    to: "/randoms",
    label: t('randomsMakerPage.nav'),
  },
  {
    to: "/serialize",
    label: t('serializePage.nav'),
  },
];

const NavbarComponent: FC = () => {
  const t = useTranslation()
  const [, language, setLanguage] = useContext(LocaleContext);

  return <Navbar bg="green" variant="dark" className="mb-3">
    <Container className="justify-content-around">
      <h1>
        <LinkContainer to={'/'}>
          <Navbar.Brand>J.Randomizer</Navbar.Brand>
        </LinkContainer>
      </h1>
      <Nav>
        {links(t).map((props) => (
          <Link key={props.to} {...props} linkProps={{ className: 'white-link' }} />
        ))}
      </Nav>
      <DropdownButton title={language}>
        {Object.values(SupportedLocale).map(key => <Dropdown.Item key={key} onClick={() => setLanguage(key)}>{key}</Dropdown.Item>)}
      </DropdownButton>
    </Container>
  </Navbar>
};

export default NavbarComponent;
