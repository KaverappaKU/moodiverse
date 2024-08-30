// app/api/movies/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_DISCOVER_TMDB_MOVIE_URL}`,
      {
        params: {
          api_key: process.env.TMDB_API_KEY,
        },
      }
    );
    return NextResponse.json(response.data.results, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
