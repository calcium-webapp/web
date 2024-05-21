import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const USERS_DB_URL = process.env.USERS_DB_URL;
const SIGNUP_ENDPOINT = `${USERS_DB_URL}/signup`;

export async function POST(request: NextRequest) {
  try {
    // Extract data from the request
    const requestData = await request.json();

    // Make a POST request to the database endpoint
    const response = await axios.post(SIGNUP_ENDPOINT, requestData);

    return NextResponse.json("Register via creds. successful", { status: 200 });
  } catch (error) {
    console.error("An error occurred trying to register via creds.");
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
