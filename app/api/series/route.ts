import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DISCOVER_TMDB_TV_URL}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );
    return NextResponse.json(response.data.results, { status: 200 });
  } catch (error) {
    return NextResponse.json("Failed to fetch series", { status: 500 });
  }
}
