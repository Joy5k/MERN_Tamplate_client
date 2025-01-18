import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useAllProductsQuery } from "../../redux/features/admin/productManagementApi";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/features/admin/wishlistSlice";
import { IProduct } from "../../types";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../../redux/features/bookingManagement/bookingManagement";
import { useAppSelector } from "../../redux/hooks";


const PopularProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useAppSelector((state: RootState) => state.wishlist.searchTerm);
  
  const [queryText,seQueryText]=useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [seeMore,setSeeMore]=useState<boolean>(false)
  const [selectedColor, setSelectedColor] = useState<string>("");
  
  const [addToCart,{isLoading:bookingLoader}]=useCreateBookingMutation()
  const{data}=useAllProductsQuery({searchTerm:queryText})
  const products: IProduct[] = data?.data ?? [];

useEffect(()=>{
  seQueryText(searchTerm)
  
},[searchTerm])

  const handleAddToWishlist = (product: IProduct) => {
    const bookingProduct={
      ...product,
      productId:product._id,
      userSelectedQuantity:quantity,
      productColor:selectedColor?selectedColor: products?.[0]?.color?.[0] 
    }
    dispatch(addToWishlist(bookingProduct));
    setIsModalOpen(false)
    toast.success("Product added wishlist successfully")
  };

  const  handleAddToCart=async(product:IProduct)=>{
    const bookingProduct={
      ...product,
      productId:product._id,
      userSelectedQuantity:quantity
    }
    const res=await addToCart(bookingProduct).unwrap()
    if(res.success){
        toast.success(`${product.title} is added successfully`)
        closeModal()
    }
}

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      
    }
  };
  const openModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (!data) {
    return <p>Loading products...</p>;
  }
  
const handleProductQueryButton=(query:string)=>{
  seQueryText(query)
}


  return (
    <div className="p-4  border-b-2 border-dashed border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center ">
        <div>
          <h2 className="text-4xl text-primary font-bold my-10">Popular Products</h2>
        </div>
        <div>
          <button onClick={()=>handleProductQueryButton("desktop")} className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Desktop</button>
          <button onClick={()=>handleProductQueryButton("laptop")} className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Laptops</button>
          <button onClick={()=>handleProductQueryButton("camera")} className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">Cameras</button>
          <button onClick={()=>handleProductQueryButton("")} className="text-md p-2 rounded-full border border-gray-500 hover:bg-gray-800 hover:text-primary m-3">All Items</button>
        </div>
      </div>
{/* appearing all products according to the user condition */}
  {
    seeMore && <div>
         {
   products.length >0 ? 
   <div>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-10  gap-y-3">
      {products.map((product) => (
          <div key={product._id} className="bg-black border border-gray-800 p-4 rounded-md w-64 mx-auto mb-4">
            <div>
              <Link to={`/product/${product._id}`} > 
              <img src={product.image ? product.image : "https://cdn-icons-png.flaticon.com/512/1554/1554590.png"} className="w-60 h-60 rounded-sm" alt="popular_image" />
              </Link>
            </div>
            <div className="text-md mt-10 flex justify-between items-center mr-4">
              <div>
                <Link to={`/product/${product._id}`} className="text-gray-300 text-xl font-semibold hover:text-primary mb-4 hover:underline">{product.title}</Link>
                <p className="mt-2 text-primary font-semibold">Price: ${product.price}</p>
              </div>
              <button
                className="hover:border hover:rounded-full hover:p-2 p-2 hover:border-primary"
                onClick={() => openModal(product)}
              >
                <FaBagShopping className="text-3xl text-primary hover:text-white bg-transparent" />
              </button>
            </div>
          </div>
        ))}
       
      </div> 
   </div>:<h2 className="text-3xl text-primary font-semibold text-center my-10">No Product Found</h2>
     }
    </div>
  }


     {
     !seeMore && 
     <div>
        {
          products.length >=0 ?  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 my-10 gap-y-3">
          {
            products.slice(0,8).map((product) => (
              <div key={product._id} className="bg-black border border-gray-800 p-4 rounded-md w-64 mx-auto">
                <div>
                  <Link to={`/product/${product._id}`} > 
                  <img src={product.image} className="w-60 h-60 rounded-sm" alt="popular_image" />
                  </Link>
                </div>
                <div className="text-md mt-10 flex justify-between items-center mr-4">
                  <div>
                    <Link to={`/product/${product._id}`} className="text-gray-300 text-xl font-semibold hover:text-primary mb-4 hover:underline">{product.title}</Link>
                    <p className="mt-2 text-primary font-semibold">Price: ${product.price}</p>
                  </div>
                  <button
                    className="hover:border hover:rounded-full hover:p-2 p-2 hover:border-primary"
                    onClick={() => openModal(product)}
                  >
                    <FaBagShopping className="text-3xl text-primary hover:text-white bg-transparent" />
                  </button>
                </div>
              </div>
            ))
          }
        </div> :<h2 className="text-3xl text-primary font-semibold text-center my-10">No Product Found</h2>
        }
     </div>
     }
     {
      products.length>0  && <div className="mx-auto flex justify-center md:justify-start md:ml-6 ">
      <button onClick={()=>setSeeMore(!seeMore)} className="underline text-blue-400 hover:text-primary">{seeMore===true ?"See less":"See more"}</button>
    </div>
     }
      {/* Modal */}
      {isModalOpen && selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
    <div className="bg-black p-4 sm:p-8 rounded-lg  max-w-xs sm:max-w-md md:max-w-3xl w-full mx-2 sm:mx-4 my-8 overflow-hidden">
      <div className="flex justify-end">
        <button
          className="px-4 py-2 text-2xl font-bold text-gray-500 rounded-md mb-5"
          onClick={closeModal}
        >
          X
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:gap-7 w-full">
        <img
          src={selectedProduct.image}
          className="w-full sm:w-[300px]  h-[270px] mx-auto md:mr-10 mt-96 md:mt-0 lg:mt-0"
          alt="product_image"
        />
        <div>
          <div className="mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Bluetooth speaker
            </h3>
            <p className="text-primary font-semibold">Price:{selectedProduct?.price} $</p>
          </div>
          <div>
            <p className="my-2">
              Availability: <span className="text-green-500">{selectedProduct?.quantity} in stock</span>
            </p>
           
           <p className="my-1">
                  Color:
                  <span className="ml-2">
                    {selectedProduct.color?.map((clr, index) => (
                      <span
                        key={index}
                        onClick={() => setSelectedColor(clr)} // Update selected color
                        className={`inline-block mr-2 border rounded-full px-2 cursor-pointer ${
                          selectedColor === clr ? "bg-primary text-white" : "hover:bg-gray-700"
                        }`}
                      >
                        {clr}
                      </span>
                    ))}
                  </span>
                </p>
                <p className={`mt-4`}>Selected Color: <span className=" border-b border-dashed">{selectedColor || "None"}</span></p>

          </div>
          <div className="flex  sm:flex-row justify-start my-2 gap-2 items-center">
            <span className="text-xl text-gray-400 font-semibold">
              Quantity:
            </span>
            <div className="quantity qty-box flex items-center border border-gray-700 hover:border-gray-300 w-fit p-2 rounded-lg">
              <button
                className={`qty-bt  ${1>=quantity && "hidden"}`}
                name="minus"
                type="button"
                onClick={decreaseQuantity}

              >
                -
              </button>
              <input
                className="qty-box-input text-center mx-2 w-12 sm:w-16"
                type="number"
                name="quantity"
                min={1}
                max={selectedProduct?.quantity}
                step={1}
                value={quantity}
                readOnly
                disabled={selectedProduct?.quantity<=quantity}
              />
              <button
                className={`qty-bt ${selectedProduct?.quantity<=quantity && "hidden"}`}
                name="plus"
                type="button"
                onClick={increaseQuantity}
                disabled={selectedProduct?.quantity<=quantity}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-center gap-1">
            <button onClick={()=>handleAddToCart(selectedProduct)} className="capitalize bg-primary p-3 hover:bg-gray-700 mt-6 hover:text-white rounded-full text-white w-full">
            {
              bookingLoader ? <div className="flex justify-center items-center bg-transparent"><p className=" w-6 h-6 border-4 border-primary border-solid border-t-transparent rounded-full animate-spin bg-transparent text-center items-center"></p></div>:"Add To Cart"
            }  
            </button>
            <button  onClick={() => handleAddToWishlist(selectedProduct)} className="capitalize bg-gray-700 p-3 md:p-0 lg:p-  hover:bg-primary mt-6 hover:text-white rounded-full text-white w-full">
             Add to wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default PopularProduct;
