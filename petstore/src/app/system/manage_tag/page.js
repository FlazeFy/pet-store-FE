"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetAllTag from "./usecases/getAllTag"
  
export default function ManageTagPage() {
    return <>
        <GetNavbar active="system"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetAllTag ctx={"get_all_tag"}/>
        </div>
    </>
}