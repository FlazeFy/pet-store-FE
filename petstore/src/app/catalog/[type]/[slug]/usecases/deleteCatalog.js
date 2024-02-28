'use strict'
import Axios from 'axios'
import { getLocal } from '@/modules/storages/local'
import React, { useState } from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClose} from '@fortawesome/free-solid-svg-icons'

export default function DeleteCatalog({type, slug, name}) {
    //Default config
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const response = await Axios.delete(`http://127.0.0.1:1323/api/v1/${type}/by/${slug}`, {
                headers: {
                  Authorization: `Bearer ${keyToken}`
                }
            })
            if(response.data.status != 200){
                setResMsgAll(response.data.message)
            } else {
                window.location.href = '/catalog'
            }
        } catch (error) {
            alert(error)
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className='btn btn-danger rounded px-4 h-100 me-2' title={"Delete this "+type} 
                data-bs-toggle="modal" data-bs-target="#deleteModal"><FontAwesomeIcon icon={faTrash} size="xl"/></button>
            <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete Item</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body">
                        <h4>Are you sure want to delete {name}?</h4>
                        <button onClick={handleSubmit} className='btn btn-danger rounded-pill py-2 px-3'>Yes, Delete</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
  