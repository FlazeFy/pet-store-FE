"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
  
export default function EmailPage() {
    return <>
        <GetNavbar active="system"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
          
        </div>
    </>
}