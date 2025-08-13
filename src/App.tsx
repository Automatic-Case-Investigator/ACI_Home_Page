import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from './components/ui/Provider';
import { Home } from './pages/Home';
import { NoPage } from "./pages/NoPage";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
