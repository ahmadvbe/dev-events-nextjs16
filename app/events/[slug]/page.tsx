import {Suspense} from "react";
import EventDetails from "@/components/EventDetails";

    //   use of this API route on the FE side of our App 2:48:28
    //             nextjs/app/events/[slug]/page.tsx 2:49:10
const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }>}) => { //2:51:30 a promise that will be resolved
//  within object that contain a key of slug of a type string
//const {slug} = await params
//4:04:00 vercel fix
    const slug = params.then((p) => p.slug); //4:04:40   

    return ( //2:52:10. 4:04:55
        <main>
            <Suspense  //compoennt coming from react allowing us to display a fallback while the inner contents are loading
                fallback={<div>Loading...</div>}>
                <EventDetails  //while things r loading we can start to render the EventDetails Component
                    //now our component EventDetails which is caching the data is wrapped within suspense 4:05:30    
                    params={slug} />
            </Suspense>
        </main>
    )
}
export default EventDetailsPage
