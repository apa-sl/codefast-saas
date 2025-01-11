import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongoDB from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

export async function POST(req) {
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
    console.log("User object before adding board:", user);
    console.log("Board object before adding board:", board);
    console.log("User boards before adding board:", user.boards);

    user.boards.push(board._id);
    await user.save();

    return NextResponse.json({});
  } catch (e) {
    console.log("there was an error");
    console.log(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
