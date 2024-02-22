"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetDoctorSchedule from "./usecases/getDoctorSchedule"
  
export default function AboutPage() {
    return <>
        <GetNavbar active="veterinary"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetDoctorSchedule ctx="doctor_schedule"/>
        </div>
    </>
}