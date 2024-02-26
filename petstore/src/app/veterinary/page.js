"use client"
import GetLable from "@/components/label/label"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetDoctorSchedule from "./usecases/getDoctorSchedule"
  
export default function AboutPage() {
    return <>
        <GetNavbar active="veterinary"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetLable type="main_title" title="Want to check up your pets?" desc="Here some of our trusted doctor you can choose"/>
            <GetDoctorSchedule ctx="doctor_schedule"/>
        </div>
    </>
}