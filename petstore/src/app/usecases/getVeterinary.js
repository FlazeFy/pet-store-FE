import GetLable from '@/components/label/label'
import React from 'react'
import { useState, useEffect } from "react"

export default function GetVeterinary({ctx}) {
    return (
        <div className='mt-3'> 
            <img src="/assets/vet.png" className='img-landing-section'/>
            <GetLable type="main_title" title="We also have some best doctor" desc="Always check up your pet's health"/>
        </div>
    )
}
  