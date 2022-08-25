import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import { Error404, Home, Random, RandomMaker, Serialize } from "./pages";
import { path } from "./utils";

const App: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path={path('/')} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="randoms">
          <Route index element={<RandomMaker />} />
          <Route path=":id" element={<Random />}/>
        </Route>
        <Route path="serialize" element={<Serialize />} />
      </Route>
      <Route path="*" element={<Error404 />}/>
    </Routes>
  </BrowserRouter>
);

export default App;
