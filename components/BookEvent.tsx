'use client';

import {useState} from "react";
import {createBooking} from "@/lib/actions/booking.actions";
import posthog from "posthog-js";

//3:08:45  3:10:30 hooks use ==>client component        
const BookEvent = ({ eventId, slug }: { eventId: string, slug: string;}) => { //3:44:20
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);


    //3:12:40  
    const handleSubmit = async (e: React.FormEvent) => { //take the event 
        e.preventDefault();

                //    =>server action creation to be used to modify our DB 3:40:30
                // nextjs/lib/actions/booking.actions.ts
                // 3:43:13 nextjs/components/BookEvent.tsx -- handlesubmit

        const { success } = await createBooking({ eventId, slug, email }); //the result of the createbooking after we resolved the promise 3:44:40

        if(success) {
            setSubmitted(true);
            //3:45:20 that brings me to the part where we wana track the number of submissions that we re getting through our app
            //do it using posthog
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
