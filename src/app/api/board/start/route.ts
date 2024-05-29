import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const CONTAINERS_API_URL = process.env.CONTAINERS_API_URL;
const START_ENDPOINT = `${CONTAINERS_API_URL}/container/start`;

export async function POST(request: NextRequest) {
  try {
    // Extract data from the request
    const requestData = await request.json();

    // Make a POST request to the database endpoint
    const response = await axios.post(START_ENDPOINT, {
      containerId: requestData.containerId,
    });

    console.log(response.data);

    return NextResponse.json({ board: response.data }, { status: 200 });
  } catch (error) {
    console.error("An error occurred trying to start board.");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
