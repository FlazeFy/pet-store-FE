'use strict'
import Axios from 'axios'
import { getLocal } from '@/modules/storages/local'
import React, { useState } from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faClose, faFire} from '@fortawesome/free-solid-svg-icons'

export default function DeleteCatalog({type, slug, name, isDeleted}) {
    //Default config
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const typeDel = isDeleted == true ? 'destroy' : 'by'
            const routeBack = isDeleted == true ? '/catalog' : `/catalog/${type}/${slug}`

            const response = await Axios.delete(`http://127.0.0.1:1323/api/v1/${type}/${typeDel}/${slug}`, {
                headers: {
                  Authorization: `Bearer ${keyToken}`
                }
            })
            if(response.data.status != 200){
                setResMsgAll(response.data.message)
            } else {
                window.location.href = routeBack
            }
        } catch (error) {
            alert(error)
            setResMsgAll(error)
        }
    }

    return (
        <> 
            <button className='btn btn-danger rounded px-4 h-100 me-2' title={isDeleted == true ? "Permentaly deleted this "+type : "Deleted this" +type} 
                data-bs-toggle="modal" data-bs-target="#deleteModal">
                {
                    isDeleted == true ?
                        <FontAwesomeIcon icon={faFire} size="xl"/>
                    :
                        <FontAwesomeIcon icon={faTrash} size="xl"/>
                }
            </button>
            <div className="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete Item</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure want to {isDeleted == true ? "permentaly delete this " : "delete this" } {name}?</p>
                        <button onClick={handleSubmit} className='btn btn-danger rounded-pill py-2 px-3'>Yes, {isDeleted == true ? "Permentaly Delete" : "Delete" }</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
  