import React from 'react'
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

export default function validateRole({roleLocal, token}) {
    try {
        useEffect(() => {
            fetch(`http://127.0.0.1:1323/api/v1/check`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => res.json())
                .then(
                (result) => {
                    if(result.data == roleLocal){
                        return result.data
                    } else {
                        return null
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
    } catch (error) {
        throw error
    }
}
  