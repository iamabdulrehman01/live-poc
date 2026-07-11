import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";

  if (!name.trim()) {
    return NextResponse.json([]);
  }

  try {
    // Call the public Hipolabs API server-side to bypass CORS and Mixed Content blocks
    const response = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(name)}&limit=25`);
    if (!response.ok) {
      return NextResponse.json([], { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching universities on server side:", error);
    return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
  }
}
