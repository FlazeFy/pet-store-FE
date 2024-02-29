'use strict'
import Axios from 'axios'
import { getLocal } from '@/modules/storages/local'
import React, { useState } from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faRotateBack} from '@fortawesome/free-solid-svg-icons'

export default function PostRecoverCatalog({type, slug, name}) {
    //Default config
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const response = await Axios.post(`http://127.0.0.1:1323/api/v1/${type}/recover/${slug}`,null, {
                headers: {
                  Authorization: `Bearer ${keyToken}`
                }
            })
            if(response.data.status != 200){
                setResMsgAll(response.data.message)
            } else {
                window.location.href = `/catalog/${type}/${slug}`
            }
        } catch (error) {
            alert(error)
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className='btn btn-success ms-2 rounded-pill px-3 py-2' data-bs-toggle="modal" data-bs-target="#recoverModal"><FontAwesomeIcon icon={faRotateBack}/> Recover Now</button>
            <div className="modal fade" id="recoverModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title text-black fst-normal" id="exampleModalLabel">Recover Item</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body text-black fst-normal text-center">
                        <p className='mb-2'>Are you sure want to recover {name}?</p>
                        <button onClick={handleSubmit} className='btn btn-success rounded-pill py-2 px-3 d-block mx-auto'>Yes, Recover</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
  