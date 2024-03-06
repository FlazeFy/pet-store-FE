"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetTotalAnimalGender from "./usecases/getTotalAnimalByGender"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }
  
export default function StatsPage() {
    return <>
        <GetNavbar active="stats"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetTotalAnimalGender ctx="total_animal_by_gender"/>
        </div>
    </>
}