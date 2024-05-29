import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const CONTAINERS_API_URL = process.env.CONTAINERS_API_URL;
const LIST_ENDPOINT = `${CONTAINERS_API_URL}/container/list`;

export async function POST(request: NextRequest) {
  try {
    // Extract data from the request
    const requestData = await request.json();

    const USER_LIST_ENDPOINT = `${LIST_ENDPOINT}/${requestData.id}`;

    // Make a POST request to the database endpoint
    const response = await axios.get(USER_LIST_ENDPOINT);

    return NextResponse.json({boards: response.data}, { status: 200 });
  } catch (error) {
    console.error("An error occurred trying to register via creds.");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
