import { getCleanTitleFromCtx, numberToPrice } from '@/modules/helpers/converter'
import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'
import GetGeneralTable from '@/components/table/general_table'

export default function GetAllDoctor({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)

    //Default config
    const keyPage = sessionStorage.getItem("Table_"+ctx)
    const keyToken = getLocal("token_key")
    const keyOrder = getLocal("Table_order_"+ctx)

    if(keyPage === null){
        sessionStorage.setItem("Table_"+ctx, "1")
    }
    if(keyOrder === null){
        storeLocal("Table_order_"+ctx,"ASC")
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/doctor/data/${keyOrder}?page=${keyPage}`, {
            headers: {
                Authorization: `Bearer ${keyToken}`
            }
        })
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setItems(result.data.data) 
                setCurrPage(result.data.current_page)
                setItems(result.data.data)             
            },
            (error) => {
                if(getLocal(ctx + "_sess") !== undefined){
                    setIsLoaded(true)
                    setItems(JSON.parse(getLocal(ctx + "_sess")))
                } else {
                    setIsLoaded(true)
                    setError(error)
                }
            }
        )
    },[])

    const builder = [
        {
            column_name: "Name",
            object_name: "doctors_name",
            extra_desc: null,
            type: 'text',
            class: 'form-control',
            label: 'Doctor Name',
            placeholder: 'Type doctor name',
            is_required: true,
            is_obsecure: false,
            max: 75,
        },
        {
            column_name: "Description",
            object_name: "doctors_desc",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Doctor Description',
            placeholder: 'Type doctor description',
            is_required: true,
            max: 500,
        },
        {
            column_name: "Manage",
            object_name: null,
            path: "catalog_slug",
            extra_desc: null
        }
    ]

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return (
            <div>
                <h5 className='text-center text-white mt-2 fst-italic'>Loading...</h5>
            </div>
        )
    } else {
        return (
            <> 
                <h5>{getCleanTitleFromCtx("get_all_doctor")}</h5>
                <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Doctor"} urlDel={""}/>  
            </>
        )
    }
}
  