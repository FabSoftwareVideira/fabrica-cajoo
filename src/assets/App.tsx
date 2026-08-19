/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header, Footer } from "./HeaderFooter";

import Home from "./Home";
import AboutCourse from "./AboutCourse";
import AboutCA from "./AboutCA";
import OfficialResources from "./OfficialResources";
import Opportunities from "./Opportunities";
import UserDemands from "./UserDemands";
import Comunicados from "./Comunicados";
import Contact from "./Contact";
import { AuthProvider } from "./context/AuthContext";


export default function App() {
  
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/curso" element={<AboutCourse />} />
              <Route path="/ca" element={<AboutCA />} />
              <Route path="/recursos" element={<OfficialResources />} />
              <Route path="/oportunidades" element={<Opportunities />} />
              <Route path="/demandas" element={<UserDemands />} />
              <Route path="/comunicados" element={<Comunicados />} />
              <Route path="/contato" element={<Contact />} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
