import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const CONTAINERS_API_URL = process.env.CONTAINERS_API_URL;
const DELETE_ENDPOINT = `${CONTAINERS_API_URL}/container/delete`;

export async function POST(request: NextRequest) {
  try {
    // Extract data from the request
    const requestData = await request.json();

    // Make a POST request to the database endpoint
    const response = await axios.post(DELETE_ENDPOINT, {
      containerId: requestData.containerId
    });

    return NextResponse.json("Board deleted.", { status: 200 });
  } catch (error) {
    console.error("An error occurred trying to delete board.");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
