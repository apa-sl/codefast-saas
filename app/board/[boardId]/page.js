import { redirect } from "next/navigation";
import connectMongoDB from "@/libs/mongoose";
import Board from "@/models/Board";

const getBoard = async (boardId) => {
  await connectMongoDB();

  const board = await Board.findById(boardId);

  if (!board) {
    console.log("board not found");
    redirect("/");
  }

  return board;
};

export default async function PublicFeedbackBoard(props) {
  const boardId = props.params.boardId;

  // get board with ObjectId = boardId
  const board = await getBoard(boardId);

  return <main>{board.name}</main>;
}
