import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import FormNewPost from "@/components/FormNewPost";
import CardPost from "@/components/CardPost";

const getData = async (boardId) => {
  await connectMongoDB();

  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ votesCounter: -1 });

  if (!board) {
    console.log("board not found");
    redirect("/");
  }

  return {
    board,
    posts,
  };
};

export default async function PublicFeedbackBoard(props) {
  const boardId = props.params.boardId;

  // get board & it's posts with ObjectId = boardId
  const { board, posts } = await getData(boardId);

  return (
    <main className="min-h-screen bg-base-200">
      <section className="max-w-5xl mx-auto p-5">
        <h1 className="text-lg font-bold">{board.name}</h1>
      </section>
      <section className="max-w-5xl mx-auto px-5 flex flex-col  md:flex-row md:items-start gap-8 pb-12">
        <FormNewPost boardId={boardId} />
        <ul className="space-y-4 ">
          {posts.map((post) => (
            <CardPost key={post._id} post={post} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    // check if user is logged in
    const session = await auth();

    // check if user has subscription
    await connectMongoDB();

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 }
      );
    }

    // check if user is the owner of the board with deleted post
    const post = await Post.findById(postId);
    //// check if post exists
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!user.boards.includes(post.PostId.toString())) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    // check if required data is provided
    if (!postId) {
      return NextResponse.json(
        { error: "postId is required" },
        { status: 400 }
      );
    }

    // delete post
    await Post.deleteOne({ _id: postId });

    return NextResponse.json({ message: "Post deleted" });
  } catch (e) {}
}
