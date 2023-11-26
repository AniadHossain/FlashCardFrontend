import React from "react";
import Sidebar from "../components/sidebar/Sidebar";

export default function DecksLayout({children} : {children:React.ReactNode}){
    return(
        <Sidebar> 
            {children} 
        </Sidebar>
    )
}