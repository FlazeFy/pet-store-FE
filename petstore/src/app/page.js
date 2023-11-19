"use client"
// Components
import GetLable from "@/components/label/label"
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetAllShelf from "./usecases/getAllShelf"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }

export default function Home() {
  return <>
    <GetNavbar active="home"/>
    <div className="content-grid">
      <GetBreakLine length={2}/>
      <GetLable type="main_title" title="See our shop" desc="Here you can browse our catalog by shelf"/>
      <div className="row">
        <GetAllShelf ctx="get_all_shelf"/>
      </div>
    </div>
  </>
}
