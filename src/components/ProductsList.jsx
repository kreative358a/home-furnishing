import { Link, useLoaderData } from 'react-router-dom';
import { formatPrice } from '../utils';
import { useState, useEffect } from 'react';


const ProductsList = () => {
  const { products } = useLoaderData();
  const [titleFirst, setTitleFirst] = useState("")
  const [titleSecond, setTitleSecond] = useState("")
  const [titleThird, setTitleThird] = useState("")

  

  return (
    <div className='mt-12 grid gap-y-8'>
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        const dollarsAmount = formatPrice(price);
        const titleList = title.split(",")
        if (titleList.length >= 3 ) {
          setTitleFirst(titleList[0])
          setTitleSecond(titleList[1])
          setTitleThird(titleList[2])
        }
        if (titleList.length === 2) {
          setTitleFirst(titleList[0])
          setTitleSecond(titleList[1])
        }
        if (titleList.length === 1) {
          setTitleFirst(titleList[0])
        }
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className='p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group'
          >
            <img
              src={image}
              alt={title}
              className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300'
            />
            <div className='ml-0 sm:ml-16'>
              <h3 className='capitalize font-medium text-base md:text-lg leading-tight'>{titleFirst}<br /> {`${titleSecond} ${titleThird}`}</h3>
              <h4 className='capitalize text-md text-neutral-content'>
                {company}
              </h4>
            </div>
            <p className='font-medium ml-0 sm:ml-auto text-lg'>
              {dollarsAmount}
            </p>
          </Link>
        );
      })}
    </div>
  );
};
export default ProductsList;
