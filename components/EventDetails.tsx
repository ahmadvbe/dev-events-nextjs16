import React from 'react'
import {notFound} from "next/navigation";
import {IEvent} from "@/database";
import {getSimilarEventsBySlug} from "@/lib/actions/event.actions";
import Image from "next/image";
import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import {cacheLife} from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


//2:59:10 reusable component
const EventDetailItem = ({ icon, alt, label }: { icon: string; alt: string; label: string; }) => (
    <div className="flex-row-gap-2 items-center">
        <Image src={icon} alt={alt} width={17} height={17} />
        <p>{label}</p>
    </div>
)

//3:02:00
const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
    <div className="agenda">
        <h2>Agenda</h2>
        <ul>
            {agendaItems.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    </div>
)


//3:04:00
const EventTags = ({ tags }: { tags: string[] }) => (
    <div className="flex flex-row gap-1.5 flex-wrap">
        {tags.map((tag) => (
            <div className="pill" key={tag}>{tag}</div>
        ))}
    </div>
)

const EventDetails = async ({ params }: { params: Promise<string> }) => {
        //3:31:15 3:47:15
    'use cache' //turn on the use cache directive
    cacheLife('hours'); //3:31:30 how long u wana revalidate the data - this component will be cached for hours

    const slug = await params;

    let event;
    try {
        const request = await fetch(`${BASE_URL}/api/events/${slug}`, { //2:53:20
            next: { revalidate: 60 }
        });

        if (!request.ok) {
            if (request.status === 404) {
                return notFound();
            }
            throw new Error(`Failed to fetch event: ${request.statusText}`);
        }

        const response = await request.json(); //2:53:32
        event = response.event; //event is the name of the data returned by the get function 2:54:00 using the NextResponse.json()

        if (!event) { //2:53:40  notFound() method provided by next navigation
            return notFound();
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        return notFound();
    }

    const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer } = event;//2:55:50 destrcut all the data from event

    if(!description) return notFound();

    const bookings = 10;

    //3:20:00
    const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

    return (
        <section  //2:55:26
            id="event">
            <div className="header">
                <h1>Event Description</h1>
                <p>{description}</p>
            </div>

            <div //2:56:50
                 className="details">
                {/*    Left Side - Event Content */}
                <div className="content">
                    <Image  //2:57:40
                        src={image} 
                        alt="Event Banner" 
                        width={800} height={800} 
                        className="banner" />

                    <section //2:58:18
                        className="flex-col-gap-2">
                        <h2>Overview</h2>
                        <p>{overview}</p>
                    </section>

                    <section //2:58:55
                        className="flex-col-gap-2">
                        <h2>Event Details</h2>

                        <EventDetailItem //3:00:10
                            icon="/icons/calendar.svg" alt="calendar" label={date} />
                        <EventDetailItem 
                            icon="/icons/clock.svg" alt="clock" label={time} />
                        <EventDetailItem 
                            icon="/icons/pin.svg" alt="pin" label={location} />
                        <EventDetailItem 
                            icon="/icons/mode.svg" alt="mode" label={mode} />
                        <EventDetailItem 
                            icon="/icons/audience.svg" alt="audience" label={audience} />
                    </section>

                    <EventAgenda  //3:03:00. 3:25:00
                        agendaItems={agenda} />


                    <section //3:03:25
                        className="flex-col-gap-2">
                        <h2>About the Organizer</h2>
                        <p>{organizer}</p>
                    </section>


                    <EventTags //3:04:50 3:25:00
                        tags={tags} />
                </div>



                {/*    Right Side - Booking Form 2:57:08 3:08:30 */}
                <aside className="booking">
                    <div className="signup-card">
                        <h2>Book Your Spot</h2>
                        {bookings > 0 ? ( //3:09:20
                            <p className="text-sm">
                                Join {bookings} people who have already booked their spot!
                            </p>
                        ): (
                            <p className="text-sm">Be the first to book your spot!</p>
                        )}

                        <BookEvent //3:10:10 3:43:50
                            eventId={event._id} slug={event.slug} />
                    </div>
                </aside>
            </div>

            <div //3:20:25
                className="flex w-full flex-col gap-4 pt-20">
                <h2>Similar Events</h2>
                <div className="events">
                    {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
                        <EventCard
                             key={similarEvent.title} //we re mapping over this element we need a key 3:27:46
                                {...similarEvent}  //spread out the properties
                                
                                />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default EventDetails
