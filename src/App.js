import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Store from './pages/Store';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Store/>}></Route>
          <Route path="/cart" element={<Cart/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
