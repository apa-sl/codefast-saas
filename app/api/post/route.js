import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongoose";
import Post from "@/models/Post";
import { auth } from "@/auth";
import { Filter } from "bad-words";

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description } = body;

    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!title) {
      return NextResponse({ error: "Title is requried" }, { status: 400 });
    }

    const session = await auth();
    await connectMongoDB();

    // sanitize title & desc for bad words
    const badWordsFilter = new Filter();
    const sanitizedTitle = badWordsFilter.clean(title);
    const sanitizedDescription = badWordsFilter.clean(description);

    // create new post
    const post = await Post.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
