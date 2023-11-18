import React from 'react'

// Modules CSS
import button from './buttons.module.css'

// Modules JS
import { ucFirstWord } from '@/modules/helpers/converter'

export default function GetButtonPath({slug, name}) {    
    return (
        <a href={"global/tag/"+slug} className={button.btn_path}>{ucFirstWord(name)}</a>
    )
}
  