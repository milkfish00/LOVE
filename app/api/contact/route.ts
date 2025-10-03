import { NextResponse } from "next/server";

const FORWARD_URL = "https://www.form-to-email.com/api/s/GDbLukiAdpUb";

export async function POST(req: Request) {
  try {
    const incomingFormData = await req.formData();

    // Basic required fields validation (adjust as needed)
    const requiredFields = ["name", "email", "subject"] as const;
    for (const field of requiredFields) {
      const value = incomingFormData.get(field);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return NextResponse.json(
          { ok: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Encode as application/x-www-form-urlencoded to mirror a typical HTML form post
    const bodyParams = new URLSearchParams();
    for (const [key, value] of incomingFormData.entries()) {
      bodyParams.append(key, typeof value === "string" ? value : String(value));
    }

    const forwardResponse = await fetch(FORWARD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: bodyParams,
    });

    const responseText = await forwardResponse.text();

    if (!forwardResponse.ok) {
      return NextResponse.json(
        { ok: false, error: "Failed to submit form", detail: responseText },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Unexpected server error" },
      { status: 500 }
    );
  }
}


