import React from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import BasicForm from "./pages/BasicForm";
import IntermediateForm from "./pages/IntermediateForm";
import AdvancedForm from "./pages/AdvancedForm";
import LegendForm from "./pages/LegendForm";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col p-4 w-full justify-center items-center">
        <h1 className="text-2xl font-bold mb-4 text-center">Demo Formularios con Formik</h1>
        <nav className="space-x-4 mb-6">
          <NavLink to="/" className="text-blue-600 underline">Básico</NavLink>
          <NavLink to="/intermedio" className="text-blue-600 underline">Intermedio</NavLink>
          <NavLink to="/avanzado" className="text-blue-600 underline">Avanzado</NavLink>
          <NavLink to="/leyenda" className="text-blue-600 underline">Leyenda</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<BasicForm />} />
          <Route path="/intermedio" element={<IntermediateForm />} />
          <Route path="/avanzado" element={<AdvancedForm />} />
          <Route path="/leyenda" element={<LegendForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;