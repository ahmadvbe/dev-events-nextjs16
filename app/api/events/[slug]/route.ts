import { NextRequest, NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';
import Event, { IEvent } from '@/database/event.model';


  // u can create an api route to get an event by its slug or ID 2:42:15
  //       implementing the Get route for fetching a single EVent  2:43:00
  //       a route accepting slug and return the event details
  //2:44:45 WARP generated  /events/[dynamic]
  // /events/nextjs-config-2025 NextJs will take this data and put it into the [slug] variable 2:45:30


// Define route params type for type safety
type RouteParams = { //2:45:38
  params: Promise<{
    slug: string;
  }>;
};

/**
 * GET /api/events/[slug]
 * Fetches a single events by its slug
 */
export async function GET(
  req: NextRequest, //1st parameter 
  { params }: RouteParams //2nd parameter to be destructed and get the slug variable out of it which has been defined in the route .../[slug]
): Promise<NextResponse> {
  try {
    // -1-Connect to database 2:45:46
    await connectDB();

    // -2- Await and extract slug from params 2:45:50
    //2nd parameter to be destructed and get the slug variable out of it which has been defined in the route .../[slug]
    const { slug } = await params; 

    // -3- Validate slug parameter 2:46:20
    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      );
    }

    // -4- Sanitize slug (remove any potential malicious input) 2:46:25
    const sanitizedSlug = slug.trim().toLowerCase();

    // -5- Query events by slug  2:46:51
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    // Handle events not found
    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitizedSlug}' not found` },
        { status: 404 }
      );
    }

    // Return successful response with events data 2:47:06
    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events by slug:', error);
    }

    // Handle specific error types 2:47:13
    if (error instanceof Error) {
      // Handle database connection errors
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { message: 'Database configuration error' },
          { status: 500 }
        );
      }

      // Return generic error with error message
      return NextResponse.json(
        { message: 'Failed to fetch events', error: error.message },
        { status: 500 }
      );
    }

    // Handle unknown errors
    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
