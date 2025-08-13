import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from './components/ui/Provider';
import { Home } from './pages/Home';
import { NoPage } from "./pages/NoPage";
import { Documents } from "./pages/Documents";
import { DocumentPage } from "./pages/DocumentPage";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:documentId" element={<DocumentPage />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
