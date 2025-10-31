import {Suspense} from "react";
import EventDetails from "@/components/EventDetails";

    //   use of this API route on the FE side of our App 2:48:28
    //             nextjs/app/events/[slug]/page.tsx 2:49:10
const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => { //2:51:30 a promise that will be resolved
//  within object that contain a key of slug of a type string
//const {slug} = await params
    const slug = params.then((p) => p.slug);

    return ( //2:52:10
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <EventDetails params={slug} />
            </Suspense>
        </main>
    )
}
export default EventDetailsPage
