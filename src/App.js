import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Store from './pages/Store';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/products" element={<Store/>}></Route>
          <Route path="/products/:id" element={<ProductDetails/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
