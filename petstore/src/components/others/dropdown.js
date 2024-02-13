import React from 'react'
import { useState, useEffect } from "react"

// Component
import { getCleanTitleFromCtx, ucFirstWord } from '@/modules/helpers/converter'

// Modules
import { getLocal } from '@/modules/storages/local'

export default function GetDropDownDctDynamic({elmt, url}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(url)
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
        return <div><h2>{getCleanTitleFromCtx(ctx)}</h2> Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                <select
                    placeholder={elmt.placeholder}
                    className={elmt.class + " w-100"} 
                    onChange={elmt.handleChange}
                >
                    {
                        items.map((val, i, index) => {
                            return (
                                <option key={i} value={val['dictionary_name']}>{ucFirstWord(val['dictionary_name'])}</option>
                            );
                        })
                    }
                </select>
            </>
        )
    }
}