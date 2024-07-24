import {getPerformance} from "@/app/actions/getPerformance"
import Chart from "@/components/performance/Chart"
import DataCard from "@/components/performance/DataCard"
import {auth} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Performance Course',
    description: 'Explore the detailed content of our Performance Course. This includes an overview of the topics covered, learning objectives, and the key skills you will gain by completing the course. Get a clear understanding of what to expect and how each part contributes to your overall learning journey.',
};

const PerformancePage = async () => {
    const {userId} = auth()

    if (!userId) {
        return redirect("/sign-in")
    }

    const {data, totalRevenue, totalSales} = await getPerformance(userId)

    return (
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <DataCard value={totalRevenue} label="Total Revenue" shouldFormat/>
                <DataCard value={totalSales} label="Total Sales"/>
                <Chart data={data}/>
            </div>
        </div>
    )
}

export default PerformancePage