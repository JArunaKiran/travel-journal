import { prisma } from "@/lib/prisma";

export async function getExpensesByTrip(
  tripId: string
) {
  return prisma.expense.findMany({
    where: {
      tripId,
    },

    include: {
      paidBy: true,
      participants: {
        include: {
          traveler: true,
        },
      },
    },

    orderBy: {
      date: "desc",
    },
  });
}

export async function createExpense(
  data: {
    title: string;
    amount: number;
    category:
      | "ACCOMMODATION"
      | "FOOD"
      | "TRANSPORT"
      | "ACTIVITIES"
      | "SHOPPING"
      | "OTHER";

    date?: Date;

    notes?: string;

    tripId: string;

    paidById: string;

    participantIds: string[];
  }
) {
  return prisma.expense.create({
    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      notes: data.notes,
      tripId: data.tripId,
      paidById: data.paidById,

      participants: {
        create: data.participantIds.map(
          (travelerId) => ({
            travelerId,
          })
        ),
      },
    },
  });
}

export async function deleteExpense(
  id: string
) {
  await prisma.expenseParticipant.deleteMany({
    where: {
      expenseId: id,
    },
  });

  return prisma.expense.delete({
    where: {
      id,
    },
  });
}
export async function getExpenseById(
  id: string
) {
  return prisma.expense.findUnique({
    where: {
      id,
    },

    include: {
      participants: true,
    },
  });
}
export async function updateExpense(
  expenseId: string,
  data: {
    title: string;
    amount: number;
    category:
      | "ACCOMMODATION"
      | "FOOD"
      | "TRANSPORT"
      | "ACTIVITIES"
      | "SHOPPING"
      | "OTHER";

    date?: Date;

    notes?: string;

    paidById: string;

    participantIds: string[];
  }
) {
  await prisma.expenseParticipant.deleteMany({
    where: {
      expenseId,
    },
  });

  return prisma.expense.update({
    where: {
      id: expenseId,
    },

    data: {
      title: data.title,
      amount: data.amount,
      category: data.category,
      date: data.date,
      notes: data.notes,
      paidById: data.paidById,

      participants: {
        create: data.participantIds.map(
          (travelerId) => ({
            travelerId,
          })
        ),
      },
    },
  });
}