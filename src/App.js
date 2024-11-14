import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Store from './pages/Store';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import ProductDetails from './pages/ProductDetails';
import { ThemeProvider } from './context/ThemeContext';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Store/>}></Route>
          <Route path="/products/:id" element={<ProductDetails/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
          <Route path="/edit-product/:id" element={<ProductForm/>} />
          <Route path="/add-product" element={<ProductForm/>} />
          <Route path="*" element={<div>Page Not Found</div>}></Route>
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
