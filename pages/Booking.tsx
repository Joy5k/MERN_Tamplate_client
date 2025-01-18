import React, { useState } from 'react';
import { useDeleteBookingMutation, useGetAllBookingsQuery } from '../redux/features/bookingManagement/bookingManagement';
import Spinner from '../components/Spinner/Spinner';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../types';



const Booking: React.FC = () => {
  const {data,isLoading}=useGetAllBookingsQuery({})
  const [deleteBookingProduct]=useDeleteBookingMutation()
  const [country,setCountry]=useState<string>("")
  const products = data?.data || []; // Default to empty array if undefined
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([]); // State to track selected products
  const navigate = useNavigate();

  const handleCheckboxChange = (product: IProduct) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.some((item) => item._id === product._id)) {
        return prevSelected.filter((item) => item._id !== product._id);
      } else {
        return [...prevSelected, product];
      }
    });
    console.log(country)
  };

  const handleProceedToCheckout = () => {
    if (selectedProducts.length === 0) {
      alert('Please select at least one product to proceed.');
      return;
    }
    // Proceed with the selected products (You can pass `selectedProducts` to the next route)
    navigate('/checkout', { state: { selectedProducts } });

  };
  
  const handleDelete = async(id: string) => {
    try {
      const res=await deleteBookingProduct(id).unwrap()
      if(res.success){
        toast.success(`${id} is Deleted successfully`)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const newProducts = [...products];
    newProducts[index].quantity = Number(quantity);
  };

  const handleClearData = () => {
  };

  const handleContinueShopping = () => {
    // Implement continue shopping logic here
    navigate("/")
  };

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    alert('Coupon applied!');
  };
  const subtotal = (selectedProducts || []).reduce((acc: number, product: any) => {
    return acc + product.productId.price * product.userSelectedQuantity;
  }, 0);
  
const total = subtotal; // Add tax, shipping, etc. to total if needed
  return (
    <div className="container mx-auto p-4 my-10">
  {
    products.length>0 ?  <div>
    {
       isLoading ? <Spinner></Spinner>:  <div className="flex flex-col md:flex-row lg:flex-row sm:space-x-8">
       {/* Product Booking Table */}
       <div  className=' overflow-x-auto' >
         <table className="w-full bg-white border rounded-md ">
           <thead>
             <tr>
               <th className="py-2 px-4  border-b">select</th>
               <th className="py-2 px-4  border-b">Product</th>
               <th className="py-2 px-4 border-b">Price</th>
               <th className="py-2 px-4 border-b">Quantity</th>
               <th className="py-2 px-4 border-b">Subtotal</th>
               <th className="py-2 px-4 border-b">Remove</th>
             </tr>
           </thead>
           <tbody>
             {products.map((product:any, index:number) => (
               <tr key={index}>
                 <td className="py-2 pl-8 border-b">
                   <div className="flex items-center">
                   <input
                              type="checkbox"
                              checked={selectedProducts.some((item) => item._id === product._id)}
                              onChange={() => handleCheckboxChange(product)}
                              className="text-3xl"
                            />
                   </div>
                 </td>
                 <td className="py-2 px-4 border-b">
                   <div className="flex items-center">
                     <img src={product.productId?.image} alt={product.title} className="w-16 h-16 object-cover mr-4" />
                     <div>
                       <p className="font-bold">{product.productId?.title}</p>
                       <p className="text-sm text-gray-500">{product.productId?.color}</p>
                     </div>
                   </div>
                 </td>
                 <td className="py-2 px-4 border-b">
                   <div className="flex justify-center items-center">
                     ${product.productId?.price}
                   </div>
                 </td>
                 <td className="py-2 px-4 border-b">
                   <div className="flex justify-center items-center">
                     <input
                       type="number"
                       value={product?.userSelectedQuantity}
                       onChange={(e) => handleQuantityChange(index, e.target.value)}
                       className="w-16 px-2 py-1 border rounded"
                     />
                   </div>
                 </td>
                 <td className="py-2 px-4 border-b">
   <div className="flex justify-center items-center">
     {((product.productId?.price ?? 1) * (Number(product?.userSelectedQuantity) ?? 1)).toFixed(2)}
   </div>
 </td>
 
 
 
                 <td className="py-2 px-4 border-b align-middle">
                   <div className="flex justify-center items-center">
                     <button onClick={() => handleDelete(product._id)} className="text-red-600">X</button>
                   </div>
                 </td>
               </tr>
             ))}
             {/* Additional Row for Buttons */}
             <tr>
               <td colSpan={6} className="py-4 px-4">
                 <div className="flex justify-between">
                   <button
                     onClick={handleContinueShopping}
                     className="px-4 py-2 bg-blue-500 text-white rounded"
                   >
                     Continue Shopping
                   </button>
                   <button
                     onClick={handleClearData}
                     className="px-4 py-2 bg-red-500 text-white rounded"
                   >
                     Clear Data
                   </button>
                 </div>
               </td>
             </tr>
           </tbody>
         </table>
       </div>
 
       {/* Cart Total Section */}
       <div className=" w-full md:w-1/3  lg:w-1/3 p-4 mx-auto  mt-5 md:mt-0 lg:mt-0 bg-black border rounded-md">
         <h2 className="text-lg font-bold mb-4">Cart Total</h2>
         <div className="mb-4">
           <div className="flex justify-between mb-2">
             <span>Subtotal:</span>
             <span>${total.toFixed(2)}</span>
           </div>
           <div className="flex items-center mb-4">
             <input
               type="text"
               placeholder="Enter coupon"
               className="w-full px-2 py-1 border rounded-l"
             />
             <button onClick={handleApplyCoupon} className="px-4 py-[5px] bg-blue-500 text-white rounded-r">
               Apply
             </button>
           </div>
           <div className="mb-4">
             <label htmlFor="country" className="block mb-1">Choose Country:</label>
             <select
               id="country"
               onChange={(e) => setCountry(e.target.value)}
               className="w-full px-2 py-1 border rounded"
             >
               <option value="CA">Canada</option>
               <option value="US">Bangladesh</option>
               <option value="US">United States</option>
               <option value="UK">United Kingdom</option>
               {/* Add more countries as needed */}
             </select>
           </div>
           <div className="flex justify-between mb-4">
             <span>Total:</span>
             <span>${total.toFixed(2)}</span>
           </div>
          {/* <Link to="/checkout"> */}
            <button  onClick={handleProceedToCheckout} className={`w-full px-4 py-2  text-white rounded ${selectedProducts.length===0? "bg-gray-600 cursor-not-allowed":"bg-green-500"}`} disabled={selectedProducts.length===0}>
             Proceed to Checkout
          
           </button>
           {/* </Link> */}
         </div>
       </div>
     </div>
     }
    </div>: <p className='text-4xl  text-center font-bold  text-primary h-screen'>Ooops!... no product added yet</p>
  }
    </div>
  );
};

export default Booking;
