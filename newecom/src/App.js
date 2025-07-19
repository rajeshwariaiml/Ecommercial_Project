
import './App.css';
import Rbar from './Compponents/Rbar/Rbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pageses/Shop';
import ShopCategory from './Pageses/ShopCategory';
import Product from './Pageses/Product';
import Cart from './Pageses/Cart';
import LoginSignup from './Pageses/LoginSignup';
import Footer from './Compponents/Footer/Footer';
import men_banner from './Compponents/Assttws/banner_mens.png'
import women_banner from './Compponents/Assttws/banner_women.png'
import kid_banner from './Compponents/Assttws/banner_kids.png'
function App() {
  return (
    <div>
      <BrowserRouter>
      <Rbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
      

     
    </div>
  );
}

export default App;
