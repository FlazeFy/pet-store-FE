import GetGeneralTable from '@/components/table/general_table'
import { getLocal } from '@/modules/storages/local'
import React from 'react'
import { useState, useEffect } from "react"

export default function GetAllTag({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)

    useEffect(() => {
        fetch(`http://127.0.0.1:1323/api/v1/tag?page=1`)
        .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true)
                setMaxPage(result.data.last_page)
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
            column_name: "Tag Name",
            object_name: "tag_name",
            extra_desc: null,
            type: 'text',
            class: 'form-control',
            label: 'Tag Name',
            placeholder: 'Type tag name',
            is_required: true,
            is_obsecure: false,
            max: 75,
        },
        {
            column_name: "Tag Used",
            object_name: "tag_used",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Tag Used',
            placeholder: 'Type tag used',
            is_required: true,
            max: 75,
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
                <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Catalog"} urlDel={""}/>  
            </>
        )
    }
}
  