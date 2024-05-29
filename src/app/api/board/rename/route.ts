import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const CONTAINERS_API_URL = process.env.CONTAINERS_API_URL;
const UPDATE_ENDPOINT = `${CONTAINERS_API_URL}/container/update`;

export async function POST(request: NextRequest) {
  try {
    // Extract data from the request
    const requestData = await request.json();

    // Make a POST request to the database endpoint
    const response = await axios.post(UPDATE_ENDPOINT, {
      name: requestData.name,
      newName: requestData.newName,
    });

    console.log(response);

    return NextResponse.json("Board renamed", { status: 200 });
  } catch (error) {
    console.error("An error occurred trying to rename board.");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
