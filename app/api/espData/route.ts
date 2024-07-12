// app/api/espData/route.ts
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

export const revalidate = 600;

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

    return NextResponse.json(espData);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Unable to fetch ESP data' },
      { status: 500 }
    );
  }
}
