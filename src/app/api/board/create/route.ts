import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const CONTAINERS_API_URL = process.env.CONTAINERS_API_URL;
const CREATE_ENDPOINT = `${CONTAINERS_API_URL}/container/create`;

export async function POST(request: NextRequest) {
  try {
    // Extract data from the request
    const requestData = await request.json();

    // Make a POST request to the database endpoint
    const response = await axios.post(CREATE_ENDPOINT, {
        name: requestData.name,
        runtime: requestData.runtime,
        userId: requestData.id
    });

    console.log("\nContainer created! ID: " + response.data.containerId + "\n");

    return NextResponse.json({containerId: response.data.containerId}, { status: 200 });
  } catch (error) {
    console.error("An error occurred trying to create a board.");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
