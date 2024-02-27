'use strict'
import { storeLocal } from '@/modules/storages/local'
import React from 'react'

export default function PostRole({ctx}) {
    // Services
    const handleSubmit = async (e, role) => {
        try {
            storeLocal('role_key', role)
            window.location.href = '/'
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h2 style={{color:"var(--primaryColor)"}}>Select your role...</h2>
            <div className='row m-3'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <button className='box-role' onClick={(e)=>handleSubmit(e, 'customer')}>
                        <img src="/assets/customer.png" className='img img-fluid'/>
                        <span className='box-lable'>Customer</span>
                    </button>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <button className='box-role' onClick={(e)=>handleSubmit(e, 'staff')}>
                        <img src="/assets/staff.png" className='img img-fluid'/>
                        <span className='box-lable'>Staff</span>
                    </button>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <button className='box-role' onClick={(e)=>handleSubmit(e, 'admin')}>
                        <img src="/assets/admin.png" className='img img-fluid'/>
                        <span className='box-lable'>Admin</span>
                    </button>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <button className='box-role' onClick={(e)=>handleSubmit(e, 'doctor')}>
                        <img src="/assets/doctor.png" className='img img-fluid'/>
                        <span className='box-lable'>Doctor</span>
                    </button>
                </div>
            </div>
        </>
    )
}
  