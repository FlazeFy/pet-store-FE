"use client"
// Components
import GetNavbar from "@/components/navbar/navbar"
import GetBreakLine from "@/components/others/breakLine"
import GetListSection from "./usecases/getListSection"

// export const metadata = {
//     title: 'PetStore - Catalog',
//     description: 'lorem ipsum',
// }
  
export default function SystemPage() {
    const builder = [
        {
            'image':"/assets/audit.png",
            'title':"audit",
        },
        {
            'image':"/assets/email_campaign.png",
            'title':"email",
        },
        {
            'image':"/assets/tag.png",
            'title':"manage_tag",
        },
        {
            'image':"/assets/trash.png",
            'title':"trash",
        },
    ]

    return <>
        <GetNavbar active="system"/>
        <div className="content-grid">
            <GetBreakLine length={2}/>
            <GetListSection items={builder}/>
        </div>
    </>
}