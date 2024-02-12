"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import PostFeedback from "./usecases/postFeedback"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }
  
export default function AboutPage() {
    return <>
        <GetNavbar active="catalog"/>
        <div className="content-grid">
            <PostFeedback ctx="post_feedback"/>
            <GetBreakLine length={2}/>
        </div>
    </>
}