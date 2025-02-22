import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormWizard from "./Compontents/accountinfo";
import PersonalInformation from "./Compontents/personlinfo";
import PaymentStep from "./Compontents/cardinfo";
import ConfirmationPage from "./Compontents/Conformation";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<FormWizard />} />
        <Route path="/personlinfo" element={<PersonalInformation />} />
        <Route path="/cardinfo" element={<PaymentStep/>} />
        <Route path="/viewpage" element={<ConfirmationPage/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
