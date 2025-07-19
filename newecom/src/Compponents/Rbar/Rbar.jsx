import React from 'react'
import './Rbar.css'
import logo from '../Assttws/logo.png'
import cart_icon from '../Assttws/cart_icon.png'
import { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ShopContext } from '../../Contextses/ShopContext'
import nav_dropdown from '../Assttws/nav_dropdown.png'


const Rbar = () => {
  const [menu,setMenu] = useState("shop");
  const {getTotalCartItems}= useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) =>{
    menuRef.current.classList.toggle('r-menu-visible');
    e.target.classList.toggle('open');
  }
  return (
    <div className='rbar'>
      <div className='r-logo'>
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="r-menu">
        <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu==="shop"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration: 'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration: 'none'}} to="womens">Women</Link>{menu==="womens"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
      </ul>
      <div className="r-login-cart">
      {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace("/");}}>Logout</button>:<Link to='/login'><button>Login</button></Link>}
        <Link to='/cart'><img src={cart_icon} alt="" /></Link>
        <div className="r-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Rbar
