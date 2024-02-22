import GetGoodsContainer from '@/components/containers/goods'
import GetLable from '@/components/label/label'
import React from 'react'
import { useState, useEffect } from "react"

export default function GetPetsFood({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/goods/desc?page=1`)
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
            <div className='mt-3 mb-5'> 
                <img src="/assets/pet_food.png" className='img-landing-section'/>
                <GetLable type="main_title" title="We have many various food for your pets" desc="Here's the best seller this month"/>
                {
                    items.map((data, i, idx) => {
                        return (
                            <GetGoodsContainer builder={data}/>
                        );
                    })
                }
            </div>
        )
    }
}
  