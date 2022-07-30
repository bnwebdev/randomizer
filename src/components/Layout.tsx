import { FC } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";

const Layout: FC = () => (
  <>
    <Navbar />
    <Container>
      <Outlet />
    </Container>
  </>
);

export default Layout;
