import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req) {
  try {
    const body = await req.json();

    if (body?.secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const slug = body.slug;
    const type = body._type;

    // Revalida works
    revalidateTag("works");

    // Revalida work individual
    if (slug) revalidateTag(`work-${slug}`);

    // Revalida HOME também
    revalidateTag("home");

    return NextResponse.json({
      revalidated: true,
      slug,
      now: Date.now(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: true }, { status: 500 });
  }
}
