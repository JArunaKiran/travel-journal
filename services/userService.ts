import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session?.user?.email) {
    return null;
  }

  let user =
    await prisma.user.findUnique({
      where: {
        email:
          session.user.email,
      },
    });

  if (!user) {
    user =
      await prisma.user.create({
        data: {
          id:
            session.user.email,

          email:
            session.user.email,

          name:
            session.user.name,

          image:
            session.user.image,
        },
      });
  }

  return user;
}