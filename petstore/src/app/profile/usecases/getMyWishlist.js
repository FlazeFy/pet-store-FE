import { numberToPrice } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxArchive, faLeaf, faPaw, faRupiahSign } from "@fortawesome/free-solid-svg-icons"

export default function GetMyWishlist({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    //Default config
    const keyPage = sessionStorage.getItem("Table_"+ctx)
    const keyToken = getLocal("token_key")
    const keyOrder = getLocal("Table_order_"+ctx)

    if(keyPage === null){
        sessionStorage.setItem("Table_"+ctx, "1")
    }
    if(keyOrder === null){
        storeLocal("Table_order_"+ctx,"ASC")
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/catalog/wishlist/my/${keyOrder}?page=${keyPage}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data.data)        
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
                    items.map((data, i, idx) => {
                        return (
                            <button className='tile d-flex justify-content-start'>
                                <div className=''>
                                    {
                                        data['catalog_image'] == '' ?
                                            <img src="/assets/avatars/female.png" style={{width:"70px"}} className="img img-fluid rounded-circle"/>
                                        : 
                                            <img src={data['catalog_image']} style={{width:"70px"}} className="img img-fluid rounded-circle"/>
                                    }
                                </div>
                                <div className=''>
                                    <h5>
                                        {
                                            data['catalog_type'] == 'animals' ?
                                                <FontAwesomeIcon icon={faPaw} style={{color:"var(--primaryColor)"}}/>
                                            : data['catalog_type'] == 'plants' ?
                                                <FontAwesomeIcon icon={faLeaf} style={{color:"var(--successBG)"}}/>
                                            : data['catalog_type'] == 'goods' ?
                                                <FontAwesomeIcon icon={faBoxArchive} style={{color:"var(--warningBG)"}}/>
                                            :
                                                <></>
                                        }
                                        {" "+data['catalog_name']}
                                    </h5>
                                    <h6 className='text-success'>Rp. {numberToPrice(data['catalog_price'])}</h6>
                                </div>
                            </button>
                        );
                    })
                }
            </>
        )
    }
}
  