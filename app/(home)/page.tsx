import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { db } from "../lib/prisma";
import Nav from "../components/nav";
import App from "../components/app";

const fetch = async ({ id }: { id: string }) => {
  const getUser = await db.user.findUnique({
    where: {
      id: id,
    },
    include: {
      banks: {
        orderBy: {
          created_at: "desc",
        },
        include: {
          incomes: {
            orderBy: {
              created_at: "desc",
            },
          },
          expenses: {
            orderBy: {
              created_at: "desc",
            },
          },
        },
      },
      incomes: {
        include: {
          bank: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
      expenses: {
        include: {
          bank: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });

  const [user] = await Promise.all([getUser]);

  return { user };
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <>
        <Nav />
      </>
    );
  }

  const { user } = await fetch({ id: session?.user?.id });

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <>
      <App user={user} />
    </>
  );
}
