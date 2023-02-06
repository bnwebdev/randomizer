import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import { Error404, Home, Random, RandomMaker, Serialize } from "./pages";

const App: FC = () => (
  <HashRouter>
    <Routes>
      <Route path={"/"} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="randoms">
          <Route index element={<RandomMaker />} />
          <Route path=":id" element={<Random />} />
        </Route>
        <Route path="serialize" element={<Serialize />} />
      </Route>
      <Route path="*" element={<Error404 />} />
    </Routes>
  </HashRouter>
);

export default App;
