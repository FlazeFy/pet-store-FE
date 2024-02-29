import React from 'react'
import style from './message.module.css'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from "@fortawesome/free-solid-svg-icons"

export default function GetInfoBox({type, content}) {
    if(type == 'warning-box'){
        return (
            <div className={style.info_box} style={{background:"#edcacd"}}>
                <h6 className='text-danger'><FontAwesomeIcon icon={faWarning}/> Warning</h6>
                {content}
            </div>
        )
    } else {
        return <span>-</span>
    }
}