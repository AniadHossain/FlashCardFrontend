
'use client'

import useRoutes from "@/app/hooks/useRoutes"
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";

interface DesktopSidebarProps {
  currentUser:any
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({currentUser}) => {
    const routes = useRoutes();
    const [isOpen,setIsOpen] = useState(false);
  return (
    <div className="
    hidden
    fixed 
    justify-between 
    w-full 
    top-0
    z-40 
    lg:flex 
    items-center 
    bg-gray-700
    border-t-[1px] 
      ">
        <nav className="flex flex-row justify-start"> 
          <ul role="list" className="flex flex-row items-center space-x-5 ml-auto">
              {routes.map((item) => (
                  <DesktopItem key = {item.label} href={item.href} label={item.label} icon={item.icon} active={item.active} onClick={item.onClick}
                  />
              ))}
          </ul>
        </nav>
    </div>
  )
}

export default DesktopSidebar