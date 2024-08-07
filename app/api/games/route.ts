import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const response = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
      },
    });
    return NextResponse.json(response.data.results, {status: 200});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch games' }, { status: 500 });
  }
}
