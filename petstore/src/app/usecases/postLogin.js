import GetLable from '@/components/label/label'
import React from 'react'
import { useState, useEffect } from "react"

export default function PostLogin({ctx}) {
    return (
        <div className='mt-3'> 
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <img src="/assets/petshop.png" className='img-landing-section'/>
                    <GetLable type="main_title" title="Welcome to Petstore" desc="Where Every Tail Wags and Every Meow Purrs – Your Pet's Paradise!"/>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    
                </div>
            </div>
        </div>
    )
}
  