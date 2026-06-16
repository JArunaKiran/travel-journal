type Traveler = {
  id: string;
  name: string;
};

type Expense = {
  amount: number;

  paidById: string;

  participants: {
    travelerId: string;
  }[];
};

export function calculateBalances(
  travelers: Traveler[],
  expenses: Expense[]
) {
  return travelers.map(
    (traveler) => {
      let paid = 0;
      let owed = 0;

      expenses.forEach(
        (expense) => {
          if (
            expense.paidById ===
            traveler.id
          ) {
            paid += expense.amount;
          }

          const participates =
            expense.participants.some(
              (participant) =>
                participant.travelerId ===
                traveler.id
            );

          if (
            participates &&
            expense.participants
              .length > 0
          ) {
            owed +=
              expense.amount /
              expense.participants
                .length;
          }
        }
      );

      return {
        travelerId:
          traveler.id,

        travelerName:
          traveler.name,

        paid,

        owed,

        balance:
          paid - owed,
      };
    }
  );
}
export function calculateSettlements(
  balances: {
    travelerName: string;
    balance: number;
  }[]
) {
  const creditors =
    balances
      .filter(
        (b) => b.balance > 0
      )
      .map((b) => ({
        ...b,
      }));

  const debtors =
    balances
      .filter(
        (b) => b.balance < 0
      )
      .map((b) => ({
        ...b,
        balance: Math.abs(
          b.balance
        ),
      }));

  const settlements = [];

  let creditorIndex = 0;
  let debtorIndex = 0;

  while (
    creditorIndex <
      creditors.length &&
    debtorIndex <
      debtors.length
  ) {
    const creditor =
      creditors[
        creditorIndex
      ];

    const debtor =
      debtors[debtorIndex];

    const amount =
      Math.min(
        creditor.balance,
        debtor.balance
      );

    settlements.push({
      from:
        debtor.travelerName,

      to:
        creditor.travelerName,

      amount,
    });

    creditor.balance -= amount;
    debtor.balance -= amount;

    if (
      creditor.balance <
      0.01
    ) {
      creditorIndex++;
    }

    if (
      debtor.balance <
      0.01
    ) {
      debtorIndex++;
    }
  }

  return settlements;
}