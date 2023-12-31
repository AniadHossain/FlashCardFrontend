import Link from "next/link";

import clsx from "clsx";

interface SidebarItemProps {
  href: string;
  icon: any;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  href, 
  icon: Icon, 
  active,
  onClick
}) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return ( 
    <Link 
      onClick={handleClick} 
      href={href} 
      className={clsx(" group  flex  gap-x-3  text-sm  leading-6  font-semibold  w-full  justify-center  p-4  text-gray-400 hover:text-black  hover:bg-gray-600",
        active && 'bg-gray-800 text-black',
      )}>
      <Icon className="h-6 w-6" />
    </Link>
   );
}
 
export default SidebarItem;
