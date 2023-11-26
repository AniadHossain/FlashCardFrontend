import Container from "./SidebarContainer";

async function Sidebar({children}: {children:React.ReactNode}) {
    
    return(
        <div className="flex flex-col bg-gray-900 min-h-screen gap-5">
            <div>
                <Container/>
            </div>     
            <main className="">
                {children}
            </main>
            
        </div>
        )
}

export default Sidebar