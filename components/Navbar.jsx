import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';
import { useRef } from 'react';
function Navbar({ cart, addToCart, removeFromCart, clearCart, subTotal }) {
    const toggleCard = () => {
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove('translate-x-full')
            ref.current.classList.add('translate-x-0')
        }
        else if (!ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove('translate-x-0')
            ref.current.classList.add('translate-x-full')
        }
    }
    const ref = useRef()
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md sticky top-0 z-10 bg-white'>
            <div className="logo mx-2">
                <Link href={'/'}><a><Image src="/mmw-logo.png" alt="" height={60} width={90} /></a></Link>
            </div>
            <div className="nav">
                <ul className="flex font-bold space-x-4 md:text-xl items-center">
                    <Link href={'/'}><a><li>Home</li></a></Link>
                    <Link href={'/hoddies'}><a><li>Hoddies</li></a></Link>
                    <Link href={'/stickers'}><a><li>Stickers</li></a></Link>
                    <Link href={'/tshirts'}><a><li>Tshirts</li></a></Link>
                    <Link href={'/mugs'}><a><li>Mugs</li></a></Link>

                </ul>
            </div>
            <div className='cursor-pointer right-2 absolute mx-5 top-5 flex'>
                <Link href={"/login"}><a><MdAccountCircle className='text-3xl mx-2' /></a></Link>
                <AiOutlineShoppingCart onClick={toggleCard} className='text-3xl' />

            </div>
            <div ref={ref} className={`w-72 h-[100vh] sidebar absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform ${Object.keys(cart).length !== 0 ? 'translate-x-0' : 'translate-x-full'}`}>
                <h2 className='font-bold text-xl text-center'>shooping card</h2>
                <span onClick={toggleCard} className='absolute top-5 right-2 cursor-pointer text-2xl text-pink-500'><AiFillCloseCircle /></span>
                <ol className='list-decimal font-semibold'>
                    {Object.keys(cart).length == 0 && <div className='my-4 font-normal'>No items in the cart.</div>}

                    {Object.keys(cart).map((k) => {
                        return <li key={k}>
                            <div className='item flex my-5'>
                                <div className="w-2/3 font-semibold">{cart[k].name}</div>
                                <div className='flex font-semibold items-center justify-center w-1/3 text-lg'>
                                    <AiFillPlusCircle onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2'>{cart[k].qty}</span>
                                    <AiFillMinusCircle onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].variant) }} className='cursor-pointer text-pink-500' /><span className='mx-2' /></div>
                            </div>
                        </li>
                    })}
                </ol>
                <div className="total font-bold my-2">Subtotal: ₹{subTotal}</div>
                <div className='flex'>
                    <Link href={"/checkout"}><button className="flex text-white bg-pink-500 border-0 py-2 px-2 mr-1 focus:outline-none hover:bg-pink-600 rounded "> <BsFillBagCheckFill className='m-1' /> Checkout</button></Link>
                    <button onClick={clearCart} className="flex text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded">Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default Navbar