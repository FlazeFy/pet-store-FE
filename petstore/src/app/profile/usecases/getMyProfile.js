import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { convertDatetime } from '@/modules/helpers/converter'
import { parseJSON } from '@/modules/helpers/decode'
import { getLocal } from '../../../modules/storages/local'

// Components
import GetButtonPath from '@/components/buttons/button_path'
import GetBreakLine from '@/components/others/breakLine'

export default function GetMyProfile({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/customer/my/profile`)
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
                    items.map((data, i, idx) => {
                        let tagArr = []
                        if(data['customers_interest']){
                            tagArr = parseJSON(data['customers_interest'])
                        }

                        return (
                            <div className='row'>
                                <div className='col-lg-5 col-md-6 col-sm-12'>
                                    <img src={data['customers_image']} className="img img-fluid rounded-circle"/>
                                </div>
                                <div className='col-lg-7 col-md-6 col-sm-12'>
                                    <div class="mb-3">
                                        <label for="nameInput" class="form-label">Name</label>
                                        <input type="text" class="form-control" id="nameInput" value={data['customer_name']}></input>
                                    </div>
                                    <div class="mb-3">
                                        <label for="emailInput" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="emailInput" value={data['email']}></input>
                                    </div>
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1" checked={data['is_notifable']}></input>
                                        <label class="form-check-label" for="exampleCheck1">Notify Me about product relase or sale</label>
                                    </div>
                                    <h6>Joined since {convertDatetime(data['created_at'],"date")}</h6>

                                    <GetBreakLine length={1}/>
                                    <h6 className='mb-3'>My Interest</h6>
                                    {
                                        tagArr.map((tg, i, idx) => {
                                            return (
                                                <GetButtonPath slug={tg['slug_name']} name={tg['tag_name']}/>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </>
        )
    }
}
  