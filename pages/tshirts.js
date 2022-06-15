import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from "mongoose";

function Tshirts({ products }) {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).map((item) => {
              return <Link passHref={true} key={products[item]._id} href={`/product/${products[item].slug}`}><div className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg mb-4 ml-2">
                <a className="block relative rounded overflow-hidden">
                  <img alt="ecommerce" className="h-[30vh] md:h-[36vh] block m-auto" src={products[item].img} />
                </a>
                <div className="mt-4">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">{products[item].title}</h2>
                  <p className="mt-1">₹{products[item].price}</p>
                  <div className="mt-1">
                    {products[item].size.includes("S") && <span> S</span>}
                    {products[item].size.includes("M") && <span> M </span>}
                    {products[item].size.includes("L") && <span>L</span>}
                    {products[item].size.includes("XL") && <span>XL</span>}
                    {products[item].size.includes("XXL") && <span> XXL</span>}
                  </div>
                  {/* <div className="mt-1">
                    S,
                    M,
                    L,
                    XL,
                    XXL
                  </div> */}
                </div>
              </div>
              </Link>
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "tshirt" })
  let tshirts = {}
  for (let item of products) {
    if (item.title in tshirts) {
      if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
        tshirts[item.title].color.push(item.color)
      }
      if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
        tshirts[item.title].size.push(item.size)
      }
    }
    else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color]
        tshirts[item.title].size = [item.size]
      }
    }
  }

  return {
    props: { products: JSON.parse(JSON.stringify(tshirts)) }, // will be passed to the page component as props
  }
}
export default Tshirts