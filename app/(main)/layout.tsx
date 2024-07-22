import Navbar from "../components/Common/Navbar";
import SideBar from "../components/Common/SideBar";

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex flex-col items-center">
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <Navbar />
            <div className="w-full z-10 flex-1">
                <div className="pt-[64px]">
                    {/* Uncomment the following lines if you need the sidebar */}
                    {/* <aside className="hidden w-[200px] h-full flex-col md:flex">
                        <SideBar />
                    </aside> */}
                    <div className="pb-32 max-w-[1380px] mx-auto lg:pb-0 p-3">
                        {children}
                    </div>
                    {/* <BottomBar /> */}
                </div>
            </div>
        </main>
    );
}
