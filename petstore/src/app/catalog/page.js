"use client"
// Components
import GetLable from "@/components/label/label"
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import validateRole from "@/modules/helpers/auth"
import { getLocal, storeLocal } from "@/modules/storages/local"
import FilterOrderCatalog from "./usecases/filterOrderCatalog"
import GetAllCatalog from "./usecases/getAllCatalog"
import PostViewMode from "./usecases/postViewMode"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }
  
export default function CatalogPage() {
    const authedRole = validateRole()
    //Default config
    let keyEditMode = getLocal("catalog_view_mode")

    if(keyEditMode === null){
        storeLocal("catalog_view_mode",'catalog')
    }

    return <>
        <GetNavbar active="catalog"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetLable type="main_title" title="Browse available pets, plants, and others" desc="Get discount for registered customer"/>
            <div className="d-flex justify-content-start">
                <FilterOrderCatalog/>
                {
                    authedRole == 'admin' ?
                        <>
                            <PostViewMode/>
                        </>
                    :
                        <></>
                }
            </div>
            <div className="row">
                <GetAllCatalog ctx="all_catalog"/>
            </div>
        </div>
    </>
}