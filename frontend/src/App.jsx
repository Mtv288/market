import { BrowserRouter, Routes, Route } from "react-router-dom";
import Seller from './pages/Seller.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/seller" element={<Seller />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
