"use client"
// Components
import GetLable from "@/components/label/label"
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetAllShelf from "./usecases/getAllShelf"
import GetPetsFood from "./usecases/getPetsFood"
import GetPickupService from "./usecases/getPickupService"
import GetVeterinary from "./usecases/getVeterinary"
import PostLogin from "./usecases/postLogin"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }

export default function Home() {
  return <>
    <GetNavbar active="home"/>
    <div className="content-grid">
      <GetBreakLine length={5}/>
      <PostLogin ctx="post_login"/>

      <GetBreakLine length={8}/>
      <GetLable type="main_title" title="See our shop" desc="Here you can browse our catalog by shelf"/>
      
      <div className="row">
        <GetAllShelf ctx="get_all_shelf"/>
        <GetBreakLine length={8}/>
        <GetBreakLine length={2}/>
        <hr></hr>

        <GetBreakLine length={3}/>
        <GetPetsFood ctx="get_pets_food"/>
        <GetBreakLine length={8}/>
        <GetBreakLine length={1}/>
        <hr></hr>

        <GetBreakLine length={3}/>
        <GetPickupService ctx="get_pickup_service"/>
        <GetBreakLine length={8}/>
        <GetBreakLine length={1}/>
        <hr></hr>

        <GetVeterinary ctx="get_veterinary"/>
      </div>
    </div>
  </>
}
