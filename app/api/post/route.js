import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongoose";
import Post from "@/models/Post";
import User from "@/models/User";
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

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    await connectMongoDB();

    const user = await User.findById(session.user.id);

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 }
      );
    }

    // check if the person deleting the post is the owner of the board

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!user.boards.includes(post.boardId.toString())) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    await Post.deleteOne({ _id: postId });

    return NextResponse.json({ message: "Post deleted" });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
