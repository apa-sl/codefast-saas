import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongoose";
import Post from "@/models/Post";

export async function POST(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    await connectMongoDB();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    // increase vote counter
    post.votesCounter += 1;

    await post.save();

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    await connectMongoDB();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    // decrease vote counter
    post.votesCounter -= 1;

    await post.save();

    return NextResponse.json({});
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
