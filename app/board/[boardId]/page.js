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
