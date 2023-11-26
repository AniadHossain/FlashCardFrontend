import { useMemo } from "react";
import {usePathname} from "next/navigation";
import { HiHome } from "react-icons/hi";
import { HiArrowLeftOnRectangle } from "react-icons/hi2"
import {signOut} from "next-auth/react"



const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(() =>[
    {
        label:'Decks',
        href:'/decks',
        icon:HiHome,
        active: pathname === '/decks'
    },
    {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle
    }
],[pathname])

return routes

}

export default useRoutes

