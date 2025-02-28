import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    setSubCategory(prev => {
        if (prev.includes(e.target.value)) {
            return prev.filter(item => item !== e.target.value);
        } else {
            return [...prev, e.target.value];
        }
    });
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    if (category.length > 0) {
        productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }  

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct()
  }, [sortType]);

  return (
    <div className='flex flex-col md:flex-row gap-1 md:gap-10 pt-10'>
      <div className='min-w-60 h-full md:sticky sm:top-0'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : " "} select-none`} draggable={false} alt="" /></p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 block ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label className="flex gap-2 cursor-pointer w-fit select-none" ><input className="w-3" id="men" name="gender" type="checkbox" value="Men" onChange={toggleCategory} /> Men </label>
            <label className="flex gap-2 cursor-pointer w-fit select-none" ><input className="w-3" id="women" name="gender" type="checkbox" value="Women" onChange={toggleCategory} /> Women </label>
            <label className="flex gap-2 cursor-pointer w-fit select-none" ><input className="w-3" id="kids" name="gender" type="checkbox" value="Kids" onChange={toggleCategory} /> Kids </label>
          </div>
        </div>
        <div className={`border ${showFilter ? "" : 'hidden'} block border-gray-300 pl-5 py-3 my-5 sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
              </label>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
              </label>
              <label className='flex gap-2'>
                <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
              </label>
            </div>
        </div>
      </div>
      <div className="flex-1">
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 min-h-[45px] max-h-[45px]'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection