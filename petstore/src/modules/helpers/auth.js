import React, { useState } from 'react'
import { useEffect } from "react"
import { getLocal } from "../storages/local"

export const isLogged = (logval, outval) => {
    try {
        if(getLocal('username_key') != null && getLocal('token_key') != null){
            return logval
        } else {
            return outval
        }
    } catch (error) {
        throw error
    }
}

export default function validateRole() {
    try {
        const [res, setRes] = useState(null)

        useEffect(() => {
            fetch(`http://127.0.0.1:1323/api/v1/check`, {
                headers: {
                    Authorization: `Bearer ${getLocal('token_key')}`
                }
            })
            .then(res => res.json())
                .then(
                (result) => {
                    if(getLocal('role_key') == result.data){
                        setRes(result.data)
                    }
                },
                (error) => {
                    if(getLocal("_sess") !== undefined){
                        setItems(JSON.parse(getLocal(ctx + "_sess")))
                    } else {
                        throw error
                    }
                }
            )
        },[])
        return res
    } catch (error) {
        throw error
    }
}
  