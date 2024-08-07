import { NextRequest, NextResponse  } from "next/server";
import axios from "axios";

export async function GET(response: NextResponse){
    try{
        const response = await axios.get('https://api.themoviedb.org/3/tv/popular',{
            params: {
                api_key: process.env.TMDB_API_KEY
            }
        });
        return NextResponse.json(response.data.results, { status: 200 });
    }
    catch(error){
        return NextResponse.json("Failed to fetch series", { status: 500 });
    }
}