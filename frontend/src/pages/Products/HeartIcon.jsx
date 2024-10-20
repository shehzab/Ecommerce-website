import { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
        addToFavorites, 
        removeFromFavorites, 
        setFavorites
        } from "../../redux/features/favorites/favoriteSlice"

import { 
        addFavoriteToLocalStorage,
        getFavoritesFromLocalStorage,
        removeFavoriteFromLocalStorage
        } from "../../Utils/localStorage";


const HeartIcon = () => {
    const dispatch = useDispatch()
    const favorites = useSelector((state) => state.favorites)|| [];
    const isFavorite = favorites.some((p) => p._id === productApiSlice._id);

    useEffect(() => {
        const favoritesFromLocalStorage = getFavoritesFromLocalStorage()
        dispatch(setFavorites(favoritesFromLocalStorage));
    }, [])

    const toggleFavorites = () => {
      if(isFavorite){
        dispatch(removeFavoriteFromLocalStorage(product))

        // also remove product from the local storage
        removeFavoriteFromLocalStorage(product._id) 
      }else{
        dispatch(addToFavorites(product));
        //also add the product to local storage
        
        addFavoriteToLocalStorage(product)
      }
    }


  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaHeart className="text-red-800" />
      ):(
        <FaRegHeart className="text-white" />
      )}

    </div>
  )
}
export default HeartIcon;