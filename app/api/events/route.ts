import {NextRequest, NextResponse} from "next/server";
import { v2 as cloudinary } from 'cloudinary';

import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';

// 2:17:05 API routes used in here to create events and fetch them from DB
//                 we could hve used server actions but we will implement it using API routes
//                     nextjs/app/api/events/route.ts 2:17:35

export async function POST(req: NextRequest) { //2:17:45
    try {//2:18:53
        await connectDB();
            //get access to the form data we re gonna pass into this request
        const formData = await req.formData(); //in express it will be req.body but here in next js  2:19:28

        //parse the form data
        let event;
            try {
                event = Object.fromEntries(formData.entries()); //we ll get all the entires as key-values pairs from formData
            } catch (e) {
                return NextResponse.json({ message: 'Invalid JSON data format'}, 
                                        { status: 400 })
            }
            

            //if we properly parse the formdata 2:20:26 then we will work with it

//after we form the general event data 2:29:45 we wana be able to get the uploaded file 2:29:55
        const file = formData.get('image') as File; //2:30:00

         if(!file) return NextResponse.json({ message: 'Image file is required'},
                                             { status: 400 })

        //3:21:45
        let tags = JSON.parse(formData.get('tags') as string); 
        let agenda = JSON.parse(formData.get('agenda') as string);

            //2:30:30 if we do hve a file we can convert that file into a buffer
         const arrayBuffer = await file.arrayBuffer(); //typically when we work with files we wana access the Blob data 2:30:48
         const buffer = Buffer.from(arrayBuffer); 

         //now we re gonna use that to pass it over to cloundinary and to actually upload it 2:31:00
        const uploadResult = await new Promise((resolve, reject) => { //where we get rhe callback func with the resolve and reject funcs
            //use of the cloudinary object which we can import at the top 2:31:18
            cloudinary.uploader.upload_stream({ resource_type: 'image', //2:31:45
                                                     folder: 'DevEvent' }, //folder where to save it-name of our app
                                              (error, results) => { //callback func of the upload(if it fails, if it succeed) 2:32:05
                if(error)
                         return reject(error);

                resolve(results);
            }).end(buffer);
        });
        //this upload result will contain the url of the image uploaded on the cloudinary server  2:32:32
         event.image = (uploadResult as { secure_url: string }).secure_url; //add it tot he actual event.image field --TS complain 2:32:55
         //so now we will be passing this image over to the Db so it gets created

        ////==>create the event in the DB  2:20:41 import the Event Model from the Database
        const createdEvent = await Event.create({
            ...event, //pass over the event data -spreaded property of the event
            //3:22:40
            tags: tags, //override the tags of the event with the new tags 3:22:50
            agenda: agenda,
        });


        //once the event is created we ll return 
        return NextResponse.json({ message: 'Event created successfully', 
                                         event: createdEvent  //pass the avtual event data
                                        }, 
                            { status: 201 });
    } catch (e) {
        console.error(e);
        return NextResponse. //send ur data back from the API 2:18:05
                    json({ message: 'Event Creation Failed',
                           error: e instanceof Error ? e.message 
                                                    : 'Unknown'}, 
                          { status: 500 }) //unknown server error
    }
}



//## API/ get request fetching all events from DB 2:35:00 - 2nd server API route 
export async function GET() {
    try { //2:35:50
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 }); //new event shown at the top

        return NextResponse.json({ message: 'Events fetched successfully', 
                                    events }, //pass  over the events
                                     { status: 200 });

    } catch (e) { //2:35:25
        return NextResponse.json({ message: 'Event fetching failed', error: e }, { status: 500 });
    }
}

//u can create an api route to get an event by its slug or ID 2:42:15
//implementing the Get route for fetching a single EVent 
