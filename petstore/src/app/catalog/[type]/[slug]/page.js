"use client"

import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetDetailCatalog from "./usecases/getDetailCatalog"

export default function CatalogDetailPage({ params }) {
    return <>
        <GetNavbar active="catalog"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetDetailCatalog type={params.type} slug={params.slug}/>
        </div>
    </>
}