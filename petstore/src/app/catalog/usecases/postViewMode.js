import React from 'react'
import { storeLocal, getLocal } from '../../../modules/storages/local'

export default function PostViewMode() {
    function toogle(val) {
        storeLocal("catalog_view_mode",val) 

        window.location.reload(false)
    }

    const selectedCatalogOrder = getLocal("catalog_view_mode")

    return (
        <div className="form-floating mb-3">
            <select class="form-select" id="floatingSelect" onChange={(e) => toogle(e.target.value)} aria-label="Floating label select example">
                <option value="table" selected={selectedCatalogOrder === 'table' ? true : false}>Table</option>
                <option value="catalog" selected={selectedCatalogOrder === 'catalog' ? true : false}>Catalog</option>
            </select>
            <label for="floatingSelect">View Mode</label>
        </div>
    )
}
  
