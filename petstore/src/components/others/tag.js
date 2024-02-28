import { getLocal } from '@/modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default function GetAllTag({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState(null)

    //Default config
    const keyToken = getLocal("token_key")

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/tag?page=1`, {
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
                            <button className='btn btn-primary me-2 rounded-pill px-3'><FontAwesomeIcon icon={faPlusCircle}/> {data['tag_name']}</button>
                        );
                    })
                }
            </>
        )
    }
}
  