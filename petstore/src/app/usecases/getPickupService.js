import GetLable from '@/components/label/label'
import React from 'react'
import { useState, useEffect } from "react"

export default function GetPickupService({ctx}) {
    return (
        <div className='mt-3'> 
            <img src="/assets/pickup.png" className='img-landing-section'/>
            <GetLable type="main_title" title="Dont have time to come to our store?" desc="We will go to your home"/>
        </div>
    )
}
  