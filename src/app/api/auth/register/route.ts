import { NextResponse } from "next/server";

const USERS_DB_URL = process.env.USERS_DB_URL;
const SIGNUP_ENDPOINT = `${USERS_DB_URL}/signup`;

export async function POST(request: Request) {
  try {
    // Extract data from the request
    const requestData = await request.json();
    console.log("Received data:", requestData);

    // Make a POST request to the database endpoint
    const response = await fetch(SIGNUP_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(requestData),
    });

    // Parse the response from the database
    const responseData = await response.json();
    console.log("Database response:", responseData);

    return NextResponse.json("Register successful", { status: 200 });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
