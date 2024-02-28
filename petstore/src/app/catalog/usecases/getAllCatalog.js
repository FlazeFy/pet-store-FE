import GetCatalogContainer from '@/components/containers/catalog'
import GetGeneralTable from '@/components/table/general_table'
import React from 'react'
import { useState, useEffect } from "react"

// Modules
import { getLocal, storeLocal } from '../../../modules/storages/local'

export default function GetAllCatalog({ctx}) {
    //Initial variable
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [maxPage, setMaxPage] = useState(0)
    const [currPage, setCurrPage] = useState(0)

    useEffect(() => {
        //Default config
        const keyOrder = getLocal("Table_order_"+ctx)

        if(keyOrder === null){
            storeLocal("Table_order_"+ctx,"ASC")
        }
        
        fetch(`http://127.0.0.1:1323/api/v1/catalog/${keyOrder}?page=1`)
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
            column_name: "Name",
            object_name: "catalog_name",
            extra_desc: null,
            type: 'text',
            class: 'form-control',
            label: 'Catalog Name',
            placeholder: 'Type catalog name',
            is_required: true,
            is_obsecure: false,
            max: 75,
        },
        {
            column_name: "Description",
            object_name: "catalog_bio",
            extra_desc: null,
            type: 'textarea',
            class: 'form-control',
            label: 'Catalog Description',
            placeholder: 'Type catalog description',
            is_required: true,
            max: 500,
        },
        {
            column_name: "Price",
            object_name: "catalog_price",
            extra_desc: null,
            type: 'number',
            class: 'form-control',
            label: 'Catalog Price',
            placeholder: 'Type catalog price',
            is_required: true,
            max: 36,
        },
        {
            column_name: "Stock",
            object_name: "catalog_stock",
            extra_desc: null,
            type: 'number',
            class: 'form-control',
            label: 'Catalog Stock',
            placeholder: 'Type catalog stock',
            is_required: true,
            max: 36,
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
                {
                    getLocal('catalog_view_mode') == 'catalog' ?
                        items.map((data, i, idx) => {
                            return (
                                <GetCatalogContainer builder={data}/>
                            );
                        })
                    :
                        <GetGeneralTable builder={builder} items={items} maxPage={maxPage} currentPage={currPage} ctx={"Catalog"} urlDel={""}/>  
                }
            </>
        )
    }
}
  