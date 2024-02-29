import { getCleanTitleFromCtx } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"

export default function GetListSection({items}) {
    return (
        <div className='row'> 
            {
                items.map((data, i, idx) => {
                    return (
                        <div className='col-lg-3 col-md-4 col-sm-6 p-1'>
                            <button className='btn btn-section' onClick={(e) => window.location.href = '/system/'+data['title']} 
                                style={{border: "1.25px solid var(--greyColor) !important"}}>
                                    <img src={data['image']} className="img img-fluid"/>
                                    <h6>{getCleanTitleFromCtx(data['title'])}</h6>
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}
  