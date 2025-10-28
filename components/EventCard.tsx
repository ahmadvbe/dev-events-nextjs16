import Link from "next/link";
import Image from "next/image";

//1:29:00 Reusbale Events Cards 

interface Props { //1:34:20
    title: string;
    image: string;
    slug: string;
    location: string;
    date: string;
    time: string;
}

const EventCard = ({ title, image, slug, location, date, time }: Props) => { //1:29:30 get all of the props that we hve
    return (
        <Link //clickable cards 1:30:00
            href={`/events/${slug}`} 
            id="event-card">
            <Image src={image} alt={title} width={410} height={300} className="poster" />

            <div //1:36:00
                className="flex flex-row gap-2">
                <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
                <p>{location}</p>
            </div>

            <p className="title">{title}</p>

            <div  //1:36:50
                className="datetime">
                <div>
                    <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
                    <p>{date}</p>
                </div>
                <div>
                    <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
                    <p>{time}</p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard
