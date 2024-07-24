import Topbar from "@/components/layout/Topbar";

const HomeLayout = async ({children}: { children: React.ReactNode }) => {

    return (
        <>
            <Topbar/>
            {children}
        </>
    )
}

export default HomeLayout;