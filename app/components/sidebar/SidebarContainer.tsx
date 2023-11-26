'use client';


import useRoutes from "@/app/hooks/useRoutes";
import SidebarItem from "./SidebarItem";

const Container = () => {
  const routes = useRoutes();

  return ( 
    <div 
      className="
        w-full 
        z-40 
        flex 
        items-center 
        bg-gray-700
        border-t-[1px] 
        
      "
    >
      {routes.map((route) => (
        <SidebarItem
          key={route.href} 
          href={route.href} 
          active={route.active} 
          icon={route.icon}
          onClick={route.onClick}
        />
      ))}
    </div>
   );
}
 
export default Container;