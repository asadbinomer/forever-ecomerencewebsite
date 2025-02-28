import React from 'react';
import { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

const LatestCollection = () => {

   const { products } = useContext(ShopContext)
   const [latestProducts, setLatestProducts] = useState([]);

   useEffect(() => {
     setLatestProducts(products.slice(0, 10));
   }, []);

  return (
    <>
      <div className="my-10">
          <div className="text-center py-8 text-4xl">
            <Title text1={"LATEST"} text2={"COLLECTIONS"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-lg text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
          {latestProducts.map((item, index) => (
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
          ))}
          
          </div>
      </div>
    </>
  )
}

export default LatestCollection