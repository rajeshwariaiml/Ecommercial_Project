import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An ecommerce website is an online platform that facilitates buying and selling of products or services over the internet</p>
            <p>this website gives you a detailed description of products using images,prices and many more attributes.</p>
        </div>
      
    </div>
  )
}

export default DescriptionBox
