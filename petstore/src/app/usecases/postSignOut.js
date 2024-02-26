import Axios from 'axios'
import { useState } from 'react'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from "@fortawesome/free-solid-svg-icons"
import { getLocal } from '@/modules/storages/local'

export default function PostSignOut({active}) {
    const keyToken = getLocal("token_key")
    const [resMsgAll, setResMsgAll] = useState("")

    // Services
    const handleSubmit = async (e) => {
        try {
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/logout", null, {
                headers: {
                    Authorization: `Bearer ${keyToken}`
                }
            })
            if(response.status != 200){
                window.location.reload(false)
                return response.data.message
            } else {
                localStorage.clear()
                window.location.href = '/'
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <>
           <button type="button" className="btn btn-danger rounded-pill py-3 px-4" data-bs-toggle="modal" data-bs-target="#signOutModal">
                <h5 className='mb-0'>Sign Out</h5>
            </button>
            <div className="modal fade" id="signOutModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Sign Out</h5>
                        <button type="button" className="btn btn-danger py-2" data-bs-dismiss="modal" aria-label="Close"><FontAwesomeIcon icon={faClose} size="xl"/></button>
                    </div>
                    <div className="modal-body">
                        <img src="/assets/bye.png" style={{height:"300px", width:"300px"}} className='img img-fluid'/>
                        <h4>Are you sure want to leave this shop?</h4>
                        <button onClick={handleSubmit} className='btn btn-danger rounded-pill py-2 px-3'>Yes, Sign Out</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}