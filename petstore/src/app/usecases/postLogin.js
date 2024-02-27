'use strict'
import Axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"

import GetFormTemplate from '@/components/containers/form'
import GetLable from '@/components/label/label'
import GetBreakLine from '@/components/others/breakLine'
import { isLogged } from '@/modules/helpers/auth'
import { getLocal, storeLocal } from '@/modules/storages/local'
import PostSignOut from './postSignOut'
import PostRole from './postRole'

//Font awesome classicon
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons"
import { ucFirstChar } from '@/modules/helpers/converter'

export default function PostLogin({ctx}) {
    //Initial variable
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [resMsgUsername, setResMsgUsername] = useState("")
    const [resMsgPassword, setResMsgPassword] = useState("")
    const [resMsgAll, setResMsgAll] = useState("")

    const builder = [
        {
            type: 'information',
            class: 'text-primary',
            label: 'Choosen role : '+ getLocal('role_key')
        },
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
            type: 'warning',
            class: 'text-danger',
            label: resMsgAll
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
            const role = getLocal('role_key')
            const data = new FormData()
            data.append('username', username)
            data.append('password', password)
            data.append('role', role)
            
            const response = await Axios.post("http://127.0.0.1:1323/api/v1/login", data, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            if(response.data.status != 200){
                setResMsgAll(response.data.message)
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
    const removeSelectedRole = async (e) => {
        try {
            localStorage.removeItem('role_key')
            window.location.href = '/'
        } catch (error) {
            console.log(error)
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
                        isLogged
                        (
                            <div className='text-center'>
                                <h2 style={{color:"var(--primaryColor)"}}>Signed in using, <span style={{color:"var(--darkColor)"}}>{getLocal('username_key')}</span></h2>
                                <h4>As, <button className='btn btn-success rounded-pill py-2 px-4' style={{textTransform:"capitalize"}}>{getLocal('role_key')}</button></h4>
                                <GetBreakLine length={1}/>
                                <PostSignOut/>
                            </div>
                        ,
                            <>
                                {
                                    getLocal('role_key') == null ?
                                        <PostRole ctx="post_role"/>
                                    :
                                        <>
                                            <a className='text-danger' style={{cursor:"pointer", textDecoration:"none"}} onClick={removeSelectedRole}
                                                ><FontAwesomeIcon icon={faArrowCircleLeft} size="xl" className='me-3'/>Back to role selection</a>
                                            <GetBreakLine length={3}/>
                                            <GetFormTemplate type={"single-line"} props={builder}/>
                                        </>
                                }
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
  