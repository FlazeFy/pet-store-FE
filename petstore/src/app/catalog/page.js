// Components
import GetNavbar from "@/components/navbar/navbar"

export const metadata = {
    title: 'PetStore - Catalog',
    description: 'lorem ipsum',
}
  
export default function CatalogPage() {
    return <>
        <GetNavbar active={"catalog"}/>
    </>
}