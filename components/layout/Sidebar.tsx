"use client"
import React from 'react';
import {BarChart4, MonitorPlay} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Sidebar = () => {
        const pathname = usePathname();
        const sidebarRoutes = [
            {icon: <MonitorPlay/>, label: "course", path: "/instructor/courses"},
            {icon: <BarChart4/>, label: 'Performance', path: "/instructor/performance"}
        ]
        return (
            <div className="max-sm:hidden flex-col w-64 border-r shadow-md px-3 gap-4 text-sm font-medium">
                {sidebarRoutes.map((route) => (
                    <Link href={route.path} key={route.path}
                          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-[#fff8eb]
                          ${pathname.startsWith(route.path) && "bg-[#fdab04] hover:bg-[#fdab04]/80"}
                          `}>
                        {route.icon}{route.label}
                    </Link>
                ))}
            </div>
        );
    }
;

export default Sidebar;