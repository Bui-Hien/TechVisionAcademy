import {currentUser} from '@clerk/nextjs/server';
import {NextResponse} from "next/server";

export const GET = async () => {
    try {
        const user = await currentUser();

        if (user) {
            return NextResponse.json(user.id, {status: 200})
        } else {
            return new NextResponse("Unauthorized", {status: 401});
        }
    } catch (err) {
        return new NextResponse("Internal Server Error", {status: 500});
    }
}