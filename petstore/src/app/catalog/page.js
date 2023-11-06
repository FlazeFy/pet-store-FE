"use client"
// Components
import GetCatalogContainer from "@/components/containers/catalog"
import GetLable from "@/components/label/label"
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetAllCatalog from "./usecases/getAllCatalog"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }
  
export default function CatalogPage() {
    return <>
        <GetNavbar active="catalog"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetLable type="main_title" title="Browse available pets, plants, and others" desc="Get discount for registered customer"/>
            <div className="row">
                <GetAllCatalog ctx="all_catalog"/>
            </div>
        </div>
    </>
}