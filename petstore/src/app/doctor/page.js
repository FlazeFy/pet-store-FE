"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetAllDoctor from "./usecases/getAllDoctor"
  
export default function DoctorPage() {
    return <>
        <GetNavbar active="doctor"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetAllDoctor ctx="get_all_doctor"/>
        </div>
    </>
}