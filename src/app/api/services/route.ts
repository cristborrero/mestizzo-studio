import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { services } from '@/lib/db/schema';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const code = searchParams.get('code');
    
    let query;
    
    if (code) {
      query = db.query.services.findFirst({
        where: (s, { eq }) => eq(s.code, code),
      });
    } else if (category) {
      query = db.query.services.findMany({
        where: (s, { eq }) => eq(s.category, category),
      });
    } else {
      query = db.query.services.findMany();
    }
    
    const result = await query;
    
    // Map result to ensure decimal strings are numbers for the frontend store
    const mappedResult = Array.isArray(result) 
      ? result.map(s => ({
          ...s,
          priceUsd: Number(s.priceUsd),
          priceColRef: s.priceColRef ? Number(s.priceColRef) : 0,
        }))
      : result ? {
          ...result,
          priceUsd: Number(result.priceUsd),
          priceColRef: result.priceColRef ? Number(result.priceColRef) : 0,
        } : null;
    
    return NextResponse.json(mappedResult);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Error al obtener los servicios. Por favor, inténtalo de nuevo más tarde.' },
      { status: 500 }
    );
  }
}