import { getLocal, storeLocal } from '@/modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"

// Modules CSS
import style from '../../../../../components/label/label.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faClose, faCopy, faHeadset, faLeaf, faPaw, faTrash, faXmarkCircle } from "@fortawesome/free-solid-svg-icons"
import { ucFirstChar, ucFirstWord } from '@/modules/helpers/converter'
import GetBreakLine from '@/components/others/breakLine'
import GetIsWishlist from './getIsWishlist'
import validateRole from '@/modules/helpers/auth'
import PostEditMode from './postEditMode'
import GetRichTextEditor from '@/components/others/richtext'

export default function GetDetailCatalog({ctx, type, slug}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [item, setItems] = useState(null)
    const keyToken = getLocal("token_key")
    const authedRole = validateRole()
    
    //Default config
    let keyEditMode = getLocal("edit_mode_catalog")

    if(keyEditMode === null){
        storeLocal("edit_mode_catalog",'false')
    }

    useEffect(() => {    
        fetch(`http://127.0.0.1:1323/api/v1/`+type+`/detail/`+slug, {
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
    
    function getGenderColor(val){
        if(val == 'male'){
            return 'var(--primaryColor)'
        } else {
            return 'var(--warningBG)'
        }
    }

    function getTotalColor(val){
        if(val == 0){
            return 'var(--darkColor)'
        } else if(val > 0 && val <= 50){
            return 'var(--warningBG)'
        } else if(val > 50 && val <= 250){ 
            return 'var(--successBG)'
        } else {
            return 'var(--primaryColor)'
        }

    }

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
                        <div className="d-flex justify-content-between">
                            <button className='btn btn-danger rounded px-4' title="Back" onClick={(e) => window.location.href = '/catalog'}>
                                <FontAwesomeIcon icon={faClose} size="xl"/></button>
                            <div>
                                {
                                    authedRole == 'admin' && keyEditMode == 'true' ?
                                        <>
                                            <h5 className='text-secondary'>Name</h5>
                                            <input type="text" className='form-control ms-0' value={item[0][type+'s_name']}/>
                                        </>
                                    :
                                        <h1 className={style.title_text + ' mb-1'}><FontAwesomeIcon icon={
                                            type == 'animal'?
                                                faPaw
                                            : type == 'plant' ?
                                                faLeaf
                                            : 
                                                <></>
                                        }/> {item[0][type+'s_name']}</h1>
                                }
                                {
                                    type == 'animal' ? 
                                        <h6>Born at {item[0][type+'s_date_born']}</h6>
                                    : 
                                        <></>
                                }
                            </div>
                            {
                                authedRole == "customer" ? 
                                    <div>
                                        <button className='btn btn-success rounded px-4 h-100 me-2' title="Add to cart" onClick={(e) => window.location.href = '/catalog'}>
                                            <FontAwesomeIcon icon={faCartPlus} size="xl"/></button>
                                        <GetIsWishlist ctx="get_is_wishlist" type={type} slug={slug} id={item[0][type+'s_id']}/>
                                        <button className='btn btn-info text-white rounded px-4 h-100' title={"Ask more about "+ item[0][type+'s_name']} onClick={(e) => window.location.href = '/catalog'}>
                                            <FontAwesomeIcon icon={faHeadset} size="xl"/></button>
                                    </div>
                                : authedRole == "staff" ?
                                    <div>
                                        <button className='btn btn-info text-white rounded px-4 h-100' title={"Ask more about "+ item[0][type+'s_name']} onClick={(e) => window.location.href = '/catalog'}>
                                            <FontAwesomeIcon icon={faHeadset} size="xl"/></button>
                                    </div>
                                : 
                                    <div>
                                        <PostEditMode/>
                                        <button className='btn btn-danger rounded px-4 h-100 me-2' title={"Delete this "+type} onClick={(e) => window.location.href = '/catalog'}>
                                            <FontAwesomeIcon icon={faTrash} size="xl"/></button>
                                        <button className='btn btn-warning text-white rounded px-4 h-100 me-2' title="Add to cart" onClick={(e) => window.location.href = '/catalog'}>
                                            <FontAwesomeIcon icon={faCopy} size="xl"/></button>
                                    </div>

                            }
                        </div>
                        <GetBreakLine length={1}/>
                        <hr></hr>
                        <GetBreakLine length={1}/>
                        {
                            authedRole == 'admin' && keyEditMode == 'true' ?
                                <>
                                    <h5 className='text-secondary'>Available Tag</h5>
                                    <h5 className='text-secondary'>Selected Tag</h5>
                                    {
                                        tags.map((data, i, idx) => {
                                            return (
                                                <button className='btn btn-danger me-2 rounded-pill px-3'><FontAwesomeIcon icon={faXmarkCircle}/> {data['tag_name']}</button>
                                            );
                                        })
                                    }
                                </>
                            :
                                tags.map((data, i, idx) => {
                                    return (
                                        <button className='btn btn-success me-2 rounded-pill px-3'>{data['tag_name']}</button>
                                    );
                                })
                        }
                        <GetBreakLine length={2}/>
                        <div className='text-center'>
                            <h3 className='mb-4'>About {ucFirstChar(type)}</h3>
                            <div className='row mb-3 text-center'>
                                <div className='col-lg-4 col-md-4 col-sm-6'>
                                    {
                                        authedRole == 'admin' && keyEditMode == 'true' ?
                                            <input type="number" className='form-control' value={item[0][type+'s_stock']}/>
                                        :
                                            <h2 className='mb-0 fw-bold' style={{color:getTotalColor(item[0][type+'s_stock'])}}>{ucFirstWord(item[0][type+'s_stock'])}</h2>
                                    }
                                    <h5 className='text-secondary'>Stock {authedRole}</h5>
                                </div>
                                <div className='col-lg-4 col-md-4 col-sm-6'>
                                    {
                                        authedRole == 'admin' && keyEditMode == 'true' ?
                                            <input type="number" className='form-control' value={item[0][type+'s_price']}/>
                                        :
                                            <h2 className='mb-0 fw-bold' style={{color:getTotalColor(item[0][type+'s_price'])}}>{ucFirstWord(item[0][type+'s_price'])}</h2>
                                    }
                                    <h5 className='text-secondary'>Price</h5>
                                </div>
                                {
                                    type == 'animal' ?
                                        <div className='col-lg-4 col-md-4 col-sm-6'>
                                            {
                                                authedRole == 'admin' && keyEditMode == 'true' ?
                                                    <select class="form-select" aria-label="Default select example">
                                                        <option value="male" selected={item[0][type+'s_gender'] == 'male' ? true : false}>Male</option>
                                                        <option value="female" selected={item[0][type+'s_gender'] == 'female' ? true : false}>Female</option>
                                                    </select>
                                                :
                                                    <h2 className='mb-0 fw-bold d-inline px-3 py-2' style={{color:getGenderColor(item[0][type+'s_gender'])}}>{ucFirstWord(item[0][type+'s_gender'])}</h2>
                                            }
                                            <h5 className='text-secondary'>Gender</h5>
                                        </div>
                                    :
                                        <></>
                                }
                            </div>
                            {
                                authedRole == 'admin' && keyEditMode == 'true' ?
                                    <GetRichTextEditor title="description" val={item[0][type+'s_bio']}/>
                                :
                                    <div className='desc-holder' dangerouslySetInnerHTML={{ __html: item[0][type+'s_bio'] }}></div>
                            }
                        </div>
                    </div>
                </span>
            </>
        )
    }
}
  