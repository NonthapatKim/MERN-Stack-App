import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

//Components
import NavbarComp from "./components/NavbarComp";
import HomepageComp from './components/HomepageComp';
import FormComp from './components/FormComp';
import Scomp from "./components/sComp";
import EditComp from "./components/EditComp";
import LoginComp from "./components/LoginComp";
import Footerf from "./components/FooterComp"

import AdminRoute from "./AdminRoute";


function App() {


  return (
    <BrowserRouter>
        <NavbarComp/>
        <Routes>
          <Route path="/" element={<HomepageComp />} />
          <Route element={<AdminRoute />}>
            <Route path="/create" element={<FormComp />} />
            <Route path="/blog/edit/:slug" element={<EditComp />} />
          </Route>
          <Route path="/blog/:slug" element={<Scomp />} />
          <Route path="/login" element={<LoginComp />} />
        </Routes>
        <Footerf/>
    </BrowserRouter>
  );
}

export default App;
