import React,{useContext} from 'react'
import { ShopContext } from '../Contextses/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Compponents/Breadcrums/Breadcrum';
import ProductDisplay from '../Compponents/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Compponents/DescriptionBox/DescriptionBox';
import RelatedProduct from '../Compponents/RelatedProduct/RelatedProduct';


const Product = () => {
    const {all_product }= useContext(ShopContext);
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));
  return (
    <div>
        <Breadcrum product={product}/>
        <ProductDisplay product={product}/>
        <DescriptionBox/>
        <RelatedProduct/>

    </div>
  )
}

export default Product
