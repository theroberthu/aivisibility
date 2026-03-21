import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  const env = {
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    serviceKeyPrefix: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20) + "...",
  };

  // Test with anon key
  const anonClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const anonResult = await anonClient
    .from("submissions")
    .select("id, brand_name")
    .limit(3);

  // Test with service role key
  let serviceResult = null;
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );
    serviceResult = await serviceClient
      .from("submissions")
      .select("id, brand_name")
      .limit(3);

    // If specific ID provided, try to fetch it
    if (id) {
      const specific = await serviceClient
        .from("submissions")
        .select("id, brand_name, product_category")
        .eq("id", id)
        .single();
      return NextResponse.json({
        env,
        anonQuery: { error: anonResult.error?.message, rowCount: anonResult.data?.length },
        serviceQuery: { error: serviceResult.error?.message, rowCount: serviceResult.data?.length },
        specificRow: { data: specific.data, error: specific.error?.message },
      });
    }
  }

  return NextResponse.json({
    env,
    anonQuery: { error: anonResult.error?.message, rowCount: anonResult.data?.length, data: anonResult.data },
    serviceQuery: serviceResult
      ? { error: serviceResult.error?.message, rowCount: serviceResult.data?.length, data: serviceResult.data }
      : "no service key",
  });
}
