import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SENDDiagnosticTool from "@/components/SENDDiagnosticTool";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SENDDiagnosticTool />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
