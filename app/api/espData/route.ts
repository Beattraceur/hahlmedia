import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { toDate } from 'date-fns-tz';

type EspData = {
  _id: string;
  rainAmount: number;
  percentageHumidity: number;
  temperature: number;
  pressure: number;
  windRPM: number;
  timestamp: string;
  [key: string]: any;
};

const TIMEZONE = 'Europe/Berlin';

export async function GET(req: NextRequest) {
  try {
    const client: MongoClient = await clientPromise;
    const db = client.db('smartGardenDB');
    const collection = db.collection<EspData>('espData');

    const now = new Date();
    const nowInGermanTime = toDate(now, { timeZone: TIMEZONE });
    const twentyFourHoursAgo = new Date(
      nowInGermanTime.getTime() - 24 * 60 * 60 * 1000
    );
    const twentyFourHoursAgoISO = twentyFourHoursAgo.toISOString();

    const espData = await collection
      .find({
        timestamp: { $gte: twentyFourHoursAgoISO },
      })
      .toArray();

    const response = NextResponse.json(espData);
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (e) {
    console.error(e);
    const response = NextResponse.json(
      { error: 'Unable to fetch ESP data' },
      { status: 500 }
    );
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  }
}
