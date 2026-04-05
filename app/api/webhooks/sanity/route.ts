import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Map Sanity document types to paths/tags
const documentTypeToRevalidate: Record<string, string[]> = {
  home: ["/", "dynamic"],
  about: ["/about", "static"],
  programs: ["/programs", "static"],
  program: ["/programs", "static"],
  contact: ["/contact", "static"],
  careers: ["/careers", "static"],
  resources: ["/resources", "static"],
  resource: ["/resources", "static"],
  gallery: ["/gallery", "realtime"],
  settings: ["/", "static"],
  testimonials: ["/", "dynamic"],
  tuition: ["/programs", "static"],
  staff: ["/about", "static"],
  "service-areas": ["/service-areas", "static"],
};

export async function POST(request: NextRequest) {
  // Verify webhook secret
  const secret = request.headers.get("x-sanity-webhook-secret");
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json(
      { message: "Invalid webhook secret" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { _type } = body;

    if (!_type) {
      return NextResponse.json(
        { message: "Missing document type" },
        { status: 400 }
      );
    }

    // Get paths/tags to revalidate for this document type
    const revalidations = documentTypeToRevalidate[_type] || [];

    // Revalidate all associated paths and tags
    for (const item of revalidations) {
      if (item.startsWith("/")) {
        revalidatePath(item);
      } else {
        revalidateTag(item);
      }
    }

    // Always revalidate the home page and dynamic content
    revalidatePath("/");
    revalidateTag("dynamic");

    console.log(`✅ Revalidated ${_type}:`, revalidations);

    return NextResponse.json({
      revalidated: true,
      type: _type,
      items: revalidations,
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { message: "Error processing webhook", error: err },
      { status: 500 }
    );
  }
}
