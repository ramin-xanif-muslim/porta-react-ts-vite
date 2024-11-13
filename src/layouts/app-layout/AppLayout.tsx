
import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar.js";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-w-[1600px] mx-auto relative">
            <div className="h-[70px] md:h-[100px] flex items-center sticky top-0 left-0 right-0 bg-white px-2 md:px-8 ">
                <Header />
            </div>

            <div className="flex">
                {/* sidebar */}
                <aside className="w-[308px] hidden md:block mt-8 ">
                    <Sidebar />
                </aside>

                {/* content */}
                <div className="flex-1 h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] bg-[#F3F4F6FF]  p-4">
                    {children}
                </div>

                {/* right */}
                <div className="w-[320px] hidden xl:block"></div>
            </div>
        </div>
    );
};

export default AppLayout;
