'use server';

// ## 3:14:25 Server actions 
//     to be implemented to book the event -ANOTHER POWERFUL NEXTJS FEATURE 
//     API routes younger brother
//     3:14:55
//          add the use server directive
//          3:16:00 nextjs/lib/actions/event.actions.ts

//return similar events by a slug


import Event from '@/database/event.model';
import connectDB from "@/lib/mongodb";
import {IEvent} from "@/database";
//3:16:20
export const  getSimilarEventsBySlug = async (slug: string) => { //focus on the business logic of ur app without worrysing abt requests , responses or any extra setups
    try {
        await connectDB();
        const event = await Event.findOne({ slug });


        //immediately without redundancy return the similar events 3:17:18
        //3:27:10 these r mongoose docs not plain old JS objetcs
        //u need to ensure that ur returning  plain JS objects from ur server func =>  .lean(); 
        return await Event.find({ 
             _id: { $ne: event._id }, //not be euqal of the event found above
             tags: { $in: event.tags } })//by using the tags we re gonna know which events r similar
                                 .lean(); 
                //if the event we re searching for includes any tags that the previosly found event has

                
    } catch {
        return [];
    }
}
