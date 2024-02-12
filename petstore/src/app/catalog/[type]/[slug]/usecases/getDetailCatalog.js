import { getLocal } from '@/modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"

// Modules CSS
import style from '../../../../../components/label/label.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faPaw } from "@fortawesome/free-solid-svg-icons"
import { numberToPrice, ucFirstChar, ucFirstWord } from '@/modules/helpers/converter'
import GetBreakLine from '@/components/others/breakLine'

export default function GetDetailCatalog({ctx, type, slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/`+type+`/detail/`+slug)
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
        const tags = JSON.parse(item[0][type+'s_detail'])
        return (
            <> 
                <span>
                    <div className={style.title_holder}>
                        <h1 className={style.title_text + ' mb-1'}><FontAwesomeIcon icon={
                            type == 'animal'?
                                faPaw
                            : type == 'plant' ?
                                faLeaf
                            : 
                                <></>
                        }/> {item[0][type+'s_name']}</h1>
                        <h6>Born at {item[0][type+'s_date_born']}</h6>
                        <GetBreakLine length={1}/>
                        {
                            tags.map((data, i, idx) => {
                                return (
                                    <button className='btn btn-success me-2 rounded-pill px-3'>{data['tag_name']}</button>
                                );
                            })
                        }
                        <GetBreakLine length={1}/>
                        <hr></hr>
                        <GetBreakLine length={1}/>
                        <div className='text-center'>
                            <h3 className='mb-4'>About {ucFirstChar(type)}</h3>
                            <div className='row mb-3 text-center'>
                                <div className='col-lg-4 col-md-4 col-sm-6'>
                                    <h2 className='mb-0 fw-bold text-primary'>{ucFirstWord(item[0][type+'s_stock'])}</h2>
                                    <h5 className='text-secondary'>Stock</h5>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-6'>
                                    <h2 className='mb-0 fw-bold text-success'>{numberToPrice(item[0][type+'s_price'])}</h2>
                                    <h5 className='text-secondary'>Price</h5>
                                </div>
                                {
                                    type == 'animal' ?
                                        <div className='col-lg-4 col-md-4 col-sm-6'>
                                            <h2 className='mb-0 fw-bold text-danger'>{ucFirstWord(item[0][type+'s_gender'])}</h2>
                                            <h5 className='text-secondary'>Gender</h5>
                                        </div>
                                    :
                                        <></>
                                }
                            </div>
                            <div className='desc-holder' dangerouslySetInnerHTML={{ __html: item[0][type+'s_bio'] }}></div>
                        </div>
                    </div>
                </span>
            </>
        )
    }
}
  