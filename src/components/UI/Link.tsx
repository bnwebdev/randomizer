import { FC } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

type Props = {
  to: string;
  label: string;
};

const Link: FC<Props> = ({ to, label }) => (
  <LinkContainer to={to}><Nav.Link>{label}</Nav.Link></LinkContainer>
);

export default Link;
