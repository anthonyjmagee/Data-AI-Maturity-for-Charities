import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "@/components/Landing";
import SENDDiagnosticTool from "@/components/SENDDiagnosticTool";
import NeurodivergentAssessment from "@/components/NeurodivergentAssessment";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/send-diagnostic" element={<SENDDiagnosticTool />} />
          <Route path="/neuro-assessment" element={<NeurodivergentAssessment />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
