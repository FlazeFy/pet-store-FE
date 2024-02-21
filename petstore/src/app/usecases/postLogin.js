'use strict'
import GetFormTemplate from '@/components/containers/form'
import GetLable from '@/components/label/label'
import { isLogged } from '@/modules/helpers/auth'
import { getLocal, storeLocal } from '@/modules/storages/local'
import Axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"

export default function PostLogin({ctx}) {
    //Initial variable
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [resMsgUsername, setResMsgUsername] = useState("")
    const [resMsgPassword, setResMsgPassword] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'text',
            class: 'form-control',
            label: 'Username',
            placeholder: 'Type username',
            is_required: true,
            is_obsecure: false,
            max: 36,
            handleChange: (event) => {
                setUsername(event.target.value)
            },
            errorMsg: resMsgUsername
        },
        {
            type: 'password',
            class: 'form-control',
            label: 'Password',
            placeholder: 'Type password',
            is_required: true,
            is_obsecure: true,
            max: 36,
            handleChange: (event) => {
                setPassword(event.target.value)
            },
            errorMsg: resMsgPassword
        },
        {
            type: 'submit',
            class: 'btn btn-success rounded-pill',
            label: 'Submit',
            placeholder: null,
            toogle_disabled: false,
            handleClick: (event) => {
                handleSubmit(event)
            },
            errorMsg: resMsgAll
        }
    ]

    // Services
    const handleSubmit = async (e) => {
        try {
            const data = new FormData();
            data.append('username', username);
            data.append('password', password);
            
            const response = await Axios.postForm("http://127.0.0.1:1323/api/v1/login", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status != 200){
                window.location.reload(false)
                return response.data.message
            } else {
                const data = response.data.data
                storeLocal('username_key', username)
                storeLocal('token_key', data.token)
                window.location.href = '/'
            }
        } catch (error) {
            setResMsgAll(error)
        }
    }

    return (
        <div className='mt-3'> 
            <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <img src="/assets/petshop.png" className='img-landing-section'/>
                    <GetLable type="main_title" title="Welcome to Petstore" desc="Where Every Tail Wags and Every Meow Purrs – Your Pet's Paradise!"/>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    {
                        isLogged ?
                            <div className='text-center'>
                                <h1 style={{color:"var(--primaryColor)"}}>Signed in as, <span style={{color:"var(--darkColor)"}}>{getLocal('username_key')}</span></h1>
                            </div>
                        :
                            <GetFormTemplate type={"single-line"} props={builder} />
                    }
                </div>
            </div>
        </div>
    )
}
  