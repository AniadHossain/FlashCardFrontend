import { useMemo } from "react";
import {usePathname} from "next/navigation";
import {HiChat, HiHome} from "react-icons/hi";
import {HiArrowLeftOnRectangle, HiUsers} from "react-icons/hi2"
import {signOut} from "next-auth/react"
import useConversation from "./useDeck"



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

