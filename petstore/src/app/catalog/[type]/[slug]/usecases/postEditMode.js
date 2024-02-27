import { getLocal, storeLocal } from '@/modules/storages/local'
import React from 'react'

//Font awesome classicon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFloppyDisk} from '@fortawesome/free-solid-svg-icons'

export default function PostEditMode() {
    const handleSubmit = async (toogle) => {
        try {
            storeLocal("edit_mode_catalog", toogle)
            window.location.reload(true)
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <> 
            {
                getLocal("edit_mode_catalog") === 'true' ?
                    <button className='btn btn-success rounded px-4 h-100 me-2' title="Edit mode" onClick={(e) => handleSubmit('false')}>
                        <FontAwesomeIcon icon={faFloppyDisk} size="xl"/></button>
                :
                    <button className='btn btn-primary rounded px-4 h-100 me-2' title="Edit mode" onClick={(e) => handleSubmit('true')}>
                        <FontAwesomeIcon icon={faEdit} size="xl"/></button>
            } 
        </>
    )
}
  