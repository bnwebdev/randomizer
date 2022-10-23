import { FC } from "react";
import { Nav, NavLinkProps } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./style.css"

type Props = {
  to: string;
  label: string;
  linkProps?: NavLinkProps;
};

const Link: FC<Props> = ({ to, label, linkProps = {} }) => (
  <LinkContainer to={to}><Nav.Link {...linkProps}>{label}</Nav.Link></LinkContainer>
);

export default Link;
