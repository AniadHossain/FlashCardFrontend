import Sidebar from "@/app/components/sidebar/Sidebar"

export default function layout({children} : {children:React.ReactNode}){
    return(
        <Sidebar>
            {children}
        </Sidebar>
    )
} 