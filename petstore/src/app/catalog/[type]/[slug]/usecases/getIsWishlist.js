import { getLocal } from '@/modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"

// Modules CSS
import style from '../../../../../components/label/label.module.css'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function GetIsWishlist({ctx, type, slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    //Default config
    const keyPage = sessionStorage.getItem("Table_"+ctx)
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/catalog/wishlist/check/${type}/${slug}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data)        
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                {
                    !item == true ?
                        <button className='btn btn-danger rounded px-4 h-100 me-2' title="Remove from wishlist" onClick={(e) => window.location.href = '/catalog'}>
                            <FontAwesomeIcon icon={faHeart} size="xl"/></button>
                    :
                        <button className='btn text-danger rounded px-4 h-100 me-2' style={{border:"1.5px solid var(--warningBG)"}} title="Add to wishlist" onClick={(e) => window.location.href = '/catalog'}>
                            <FontAwesomeIcon icon={faHeart} size="xl"/></button>
                }
                
            </>
        )
    }
}
  