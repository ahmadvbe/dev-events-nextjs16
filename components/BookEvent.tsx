'use client';

import {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

//3:08:45  3:10:30 hooks use ==>client component        
const BookEvent = ({ eventId, slug }: { eventId: string, slug: string;}) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);


    //3:12:40 
    const handleSubmit = async (e: React.FormEvent) => { //take the event 
        e.preventDefault();

        const { success } = await createBooking({ eventId, slug, email });

        if(success) {
            setSubmitted(true);
            posthog.capture('event_booked', { eventId, slug, email })
        } else {
            console.error('Booking creation failed')
            posthog.captureException('Booking creation failed')
        }
    }

    return (
        <div id="book-event">
            {submitted ? (
                <p className="text-sm">Thank you for signing up!</p>
            ): (
                <form  //3:11:28
                    onSubmit={handleSubmit} //call this func onsubmit
                     > 
                    <div>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <button  //3:12:26
                        type="submit" className="button-submit">Submit</button>
                </form>
            )}
        </div>
    )
}
export default BookEvent
