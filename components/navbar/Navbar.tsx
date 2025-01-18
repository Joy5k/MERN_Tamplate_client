import { Link } from "react-router-dom"
import "./Navbar.css"

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon,ShoppingCartIcon } from '@heroicons/react/24/outline'
import { FaLocationDot, FaTruck } from "react-icons/fa6"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import Cookies from 'js-cookie';
import { useGetUserQuery } from "../../redux/features/userManagement/userManagement"
import { useGetAllBookingsQuery } from "../../redux/features/bookingManagement/bookingManagement"
import { useState } from "react"
import { useAppDispatch } from "../../redux/hooks"
import { setSearchQuery } from "../../redux/features/admin/wishlistSlice"

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Category', href: '/category', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact us', href: '/contact-us', current: false },
]
function classNames(...classes:any[]) {

  return classes.filter(Boolean).join(' ')
}



const Navbar=()=>{
  const {data}=useGetAllBookingsQuery({})
  const {data:userData}=useGetUserQuery({})
  const [searchTerm,setSearchTerm]=useState<string>("")
  const token=localStorage.getItem("token") 
  const dispatch=useAppDispatch()

  
  const handleSignOut = () => {
    // Remove the refreshToken cookie
    Cookies.remove('refreshToken');
    
    // Remove token from local storage
    localStorage.removeItem('token');
  };
  const handleSearchQuery=(e:React.FormEvent)=>{
    e.preventDefault()
    dispatch(setSearchQuery(searchTerm))
  }


    return (
        <div>
  
  <div>
  {/* Hidden on small screens, visible on medium and larger screens */}
  <div className="hidden md:block lg:block">
    <div className="px-8 flex justify-between p-3 border-b border-dashed">
      <div className="flex justify-start gap-2">
        <p>Need help? Call us: +8801601588531</p>||
        <Link to="/chat" className="hover:text-primary">Help center</Link>
      </div>

      <div className="flex justify-between gap-6">
        <div>
          <Link to="https://www.google.com/maps/place/Patuakhali/@22.3590336,90.3360658,389m/data=!3m1!1e3!4m6!3m5!1s0x30aab9406abb81a1:0xe1e479ed6811c97d!8m2!3d22.3589237!4d90.3280132!16s%2Fg%2F122zd966?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoJLDEwMjExMjMzSAFQAw%3D%3D" target="_blank" className="flex items-center">
            <FaLocationDot />
            <p className="hover:text-primary">Our Store</p>
          </Link>
        </div>

        <div>
          <Link to="/" className="flex items-center">
            <FaTruck />
            <p className="ml-1 hover:text-primary">Track your order</p>
          </Link>
        </div>
      </div>
    </div>
  </div>

  {/* Visible on small screens, hidden on medium and larger screens */}
  <div className="block md:hidden lg:hidden m-4">
    <form onSubmit={handleSearchQuery} className="flex flex-col sm:flex-row mr-4" >
      <input
        className="w-full p-2 md:rounded-md  outline-none border border-r-0 md:rounded-r-none"
        type="text"
        placeholder="Search Your Product"
        onChange={(e)=>setSearchTerm(e.target.value)}
      />
      <button type="submit" className="bg-yellow-500 md:rounded-r-md px-2">Search</button>
    </form>
  </div>
</div>




  <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              {/* <span className="absolute -inset-0.5 text-white" /> */}
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
<Link to="/" className="text-primary text-3xl font-bold">Electon</Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-black text-white' : 'text-white',
                      'rounded-md px-3 py-2 text-sm font-medium hover:text-primary',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

<div className="mr-16 hidden md:block lg:block" >
<form onSubmit={handleSearchQuery} className="flex flex-col sm:flex-row">
            <input

              className="w-full p-2  rounded-md  outline-none border border-r-0 rounded-r-none"
              type="text"
              placeholder="Search Your Product"
              onChange={(e)=>setSearchTerm(e.target.value)}

            />
            <button type="submit" className=" bg-yellow-500 rounded-r-md px-2 ">Search</button>
          </form>
</div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
 {/* //Wishlist */}
  <button
    type="button"
    className="relative rounded-full bg-black p-1 text-gray-400 hover:text-primary focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-2"
  >
    <span className="sr-only hover:text-primary">View Wishlist</span>
    <Link to="/wishlist">
    <MdOutlineFavoriteBorder className="h-6 w-6 text-white hover:text-primary" />
    
    </Link>
  </button>

  {/* Booking list */}
  <button
    type="button"
    className="relative mr-2 rounded-full bg-black p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
  >
    <span className="sr-only hover:text-primary">View Booking</span>
    <Link to="/booking">
    <ShoppingCartIcon aria-hidden="true" className="h-6 w-6 fill-current text-primary relative" />
    <p className="absolute -top-2 -left-[2px]  bg-transparent  text-primary  text-xs font-bold rounded-full text-center">{
      data?.data?.length>9 ? "9+":data?.data?.length
      }</p>
    </Link>
  </button>

  {/* Profile dropdown */}
  <Menu as="div" className="relative ml-3">
    <div>
      <MenuButton className="relative flex rounded-full bg-black text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only hover:text-primary">Open user menu</span>
        <img
          alt=""
          src={userData?.data?.image||"https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="}
          className="h-8 w-8 rounded-full"
        />
      </MenuButton>
    </div>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black border border-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <MenuItem>
        <a href="/profile" className="block px-4 py-2 text-sm text-white  hover:text-primary">
          Your Profile
        </a>
      </MenuItem>
      <Menu.Item as="div"> {/* Change to a div or any valid HTML element */}
  {
    userData?.data?.role !== "user" && (
      <a href="/dashboard" className="block px-4 py-2 text-sm text-white hover:text-primary">
        Dashboard
      </a>
    )
  }
</Menu.Item>


      {
        token ?  <MenuItem>
        <a onClick={handleSignOut} href="" className="block px-4 py-2 text-sm text-white  hover:text-primary">
         logout
        </a>
      </MenuItem> : <MenuItem>
        <a href="/login" className="block px-4 py-2 text-sm text-white  hover:text-primary">
         login
        </a>
      </MenuItem>
      }
     
     
    </MenuItems>
  </Menu>
        </div>

        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium hover:text-primary',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>

        </div>
    )
}

export default Navbar;