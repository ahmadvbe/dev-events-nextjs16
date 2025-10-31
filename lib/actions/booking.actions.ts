'use server';

import Booking from '@/database/booking.model';

import connectDB from "@/lib/mongodb";

        //   =>server action creation to be used to modify our DB 3:40:30
        //         nextjs/lib/actions/booking.actions.ts

export const createBooking = async ({ eventId, slug, email }: { eventId: string; slug: string; email: string; }) => { //3:41:00
    try {
        await connectDB();

        await Booking.create({ eventId, slug, email }); //make a booking 3:41:55    

        return { success: true }; //no need to pass the const booking = ...  once we create it 3:48:40, the only thing we need it is the boolean
        //and based on it we will perform 
    } catch (e) {
        console.error('create booking failed', e);
        return { success: false };
    }
}
