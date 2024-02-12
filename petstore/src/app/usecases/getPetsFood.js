import GetLable from '@/components/label/label'
import React from 'react'
import { useState, useEffect } from "react"

export default function GetPetsFood({ctx}) {
    return (
        <div className='mt-3'> 
            <img src="/assets/pet_food.png" className='img-landing-section'/>
            <GetLable type="main_title" title="We have many various food for your pets" desc="Here's the best seller this month"/>
        </div>
    )
}
  