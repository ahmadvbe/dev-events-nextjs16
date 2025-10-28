import ExploreBtn from "@/components/ExploreBtn";
import events from "@/lib/constants";
import EventCard from "@/components/EventCard";
// import {IEvent} from "@/database"; //these r the real events not the dummy ones from the lib/constants file
import {cacheLife} from "next/cache";


//  ==>To get started, edit the page.tsx file.
//         nextjs/app/page.tsx. : this file represent the home page
//1:04:50

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
    'use cache';
    cacheLife('hours')
    // const response = await fetch(`${BASE_URL}/api/events`);
    // const { events } = await response.json(); //1:31:00

    return (
        <section //1:16:16
            >
            <h1 className="text-center">The Hub for Every Dev <br /> Event You Can't Miss</h1>
            <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>

            <ExploreBtn  //1:18:50
                />

            <div //1:24:20
                className="mt-20 space-y-7">
                <h3>Featured Events</h3>

                <ul className="events">
                    {events && events.length > 0 && events.map((event) => ( //automatic return 1:25:05  replace by (event: IEvent) when dealting with the real events from DB
                        <li key={event.title} 
                            className="list-none">
                            <EventCard {...event}  //1:31:40 to which we will spread all of the event properties
                                />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Page;
