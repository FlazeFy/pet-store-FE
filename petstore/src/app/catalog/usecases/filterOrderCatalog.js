import React from 'react'
import { storeLocal, getLocal } from '../../../modules/storages/local'

export default function FilterOrderCatalog() {
    function toogle(val) {
        storeLocal("Table_order_all_catalog",val) 

        window.location.reload(false)
    }

    const selectedCatalogOrder = getLocal("Table_order_all_catalog")

    return (
        <div className="form-floating mb-3">
            <select class="form-select" id="floatingSelect" onChange={(e) => toogle(e.target.value)} aria-label="Floating label select example">
                <option value="desc" selected={selectedCatalogOrder === 'desc' ? true : false}>Descending</option>
                <option value="asc" selected={selectedCatalogOrder === 'asc' ? true : false}>Ascending</option>
            </select>
            <label for="floatingSelect">Order By Name</label>
        </div>
    )
}
  
