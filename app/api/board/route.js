import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongoDB from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

export async function POST(req) {
  console.log("api/board POST hitted");
  try {
    // check if user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }
    const body = await req.json();

    // check if board name has been provided
    if (!body.name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
      );
    }

    // connect to MongoDB
    await connectMongoDB();

    // get logged in user id
    const user = await User.findById(session.user.id);

    // create new board
    const board = await Board.create({
      userId: user._id,
      name: body.name,
    });

    // add created board id to the user

    user.boards.push(board._id);
    await user.save();

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const boardId = searchParams.get("boardId");

    // check if user is authenticated
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    // check if boardId is provided
    if (!boardId) {
      return NextResponse.json(
        { error: "Board ID is required" },
        { status: 400 }
      );
    }

    // remove board from DB
    await Board.deleteOne({
      _id: boardId,
      userId: session?.user?.id,
    });

    // iterate through the user.boards array and remove the boardId
    const user = await User.findById(session?.user?.id);
    user.boards = user.boards.filter((id) => id.toString() !== boardId);
    await user.save();
    return NextResponse.json({});
  } catch (e) {
    return NextResponse.son({ error: e.message }, { status: 500 });
  }
}
