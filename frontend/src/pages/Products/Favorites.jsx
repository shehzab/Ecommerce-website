import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";


const Favorites = () => {

    const favorites = useSelector(selectFavoriteProduct)

  return (
    <div className="ml-[10rem]">
        <h1 className="text-lg font-bold ml-[3rem] mt-3[rem]" >
            FAVORITE PRODUCTS
        </h1>

        <div className="flex flex-wrap">
            {favorites.length > 0 ? (
                    favorites.map((product) => (
                        <Product key={product._id} product={product} />
                    ))
                ) : (
                    <p className="ml-[3rem]">No favorite products available.</p>
                )}
        </div>

    </div>
  )
}
export default Favorites





