// force refesh
export const dynamic = "force-dynamic";

import ButtonLogout from "@/components/ButtonLogout";
import ButtonCheckout from "@/components/ButtonCheckout";
import ButtonSubscriptionPortal from "@/components/ButtonSubscriptionPortal";
import FormNewBoard from "@/components/FormNewBoard";
import { auth } from "@/auth";
import connectMongoDB from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";
import Link from "next/link";

async function getUser() {
  const session = await auth();

  await connectMongoDB();

  const user = await User.findById(session.user.id).populate("boards").lean();

  return user;
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <main className="bg-base-200 min-h-screen">
      {/* Header */}
      <section className="bg-base-100">
        <div className="bg-base-100 px-5 py-3 flex justify-between max-w-5xl mx-auto">
          {user.hasAccess ? <ButtonSubscriptionPortal /> : <ButtonCheckout />}
          <ButtonLogout />
        </div>
      </section>

      {/* Content */}
      <section className="px-5 py-12 max-w-5xl mx-auto space-y-12">
        {/* New board form */}
        <FormNewBoard />

        {/* user boards list */}
        <div>
          <h1 className="font-extrabold text-xl mb-4">
            {user.boards.length} Boards
          </h1>
          <ul className="space-y-4">
            {user.boards.map((board) => {
              return (
                <li key={board.id}>
                  <Link
                    className="block bg-base-100 p-6 rounded-3xl hover:bg-neutral hover:text-neutral-content duration-200"
                    href={`/dashboard/board/${board._id}`}
                  >
                    {board.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
