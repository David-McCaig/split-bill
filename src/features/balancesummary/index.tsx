import { useState } from "react";
import { useAppSelector } from "../../hooks/reduxTypeScriptHooks";
import { selectUser } from "../authentication/userSlice";
import { useFetchUserGroupQuery } from "../expensetable/expenseTableSlice";
import BalanceSummaryColumn from "./Component/BalanceSummaryColumn";
import BalanceSummaryCard from "./Component/BalanceSummaryCard";
import { useEffect } from "react";

interface UserGroup {
  id: string;
  user_group_id: string;
  user_group_name: string;
  user_expense_description: string;
  user_expense_amount: number;
  user_expense_name: string;
}

type UserGroups = UserGroup[];

interface People {
  name: string;
  expenses: number[];
}

function Index() {
  const [expensesArray, setExpensesArray] = useState<
    string[] | { userString: string; userNumber: number }[]
  >([]);
  const { groupId } = useAppSelector((state) => state.groupId.groupId);

  const user = useAppSelector(selectUser);
  const { data } = useFetchUserGroupQuery(groupId);

  function calculateOwes(people: People[]) {
    const numPeople = people.length;

    const totalExpenses = people.map((person) =>
      person.expenses.reduce((acc: number, expense: number) => acc + expense, 0)
    );

    const totalExpenseSum = totalExpenses.reduce(
      (acc: number, total: number) => acc + total,
      0
    );
    const averageExpense = totalExpenseSum / numPeople;
    const balances = new Array(numPeople).fill(0);
    for (let i = 0; i < numPeople; i++) {
      balances[i] = totalExpenses[i] - averageExpense;
    }

    const transactions = [];

    for (let i = 0; i < numPeople; i++) {
      if (balances[i] < 0) {
        for (let j = 0; j < numPeople; j++) {
          if (balances[j] > 0) {
            const transferAmount = Math.min(Math.abs(balances[i]), balances[j]);
            balances[i] += transferAmount;
            balances[j] -= transferAmount;
            transactions.push({
              from:
                people[i].name === user.displayName ? "You" : people[i].name,
              to: people[j].name === user.displayName ? "You" : people[j].name,
              amount: transferAmount,
            });
          }
        }
      }
    }
    const results = transactions.map((transaction) =>
      transaction.from === "You"
        ? {
            userString: `${transaction.from?.split(" ")[0]} owe ${
              transaction.to
            }`,
            userNumber: parseInt(transaction.amount.toFixed(2)),
          }
        : {
            userString: `${transaction.from?.split(" ")[0]} owes ${
              transaction.to
            }`,
            userNumber: parseInt(transaction.amount?.toFixed(2)),
          }
    );
    return results.length > 0 ? results : ["All people are settled up"];
  }

  const createUserObject = (groupData: UserGroups) => {
    const expenseData: { name: string; expenses: number[] }[] = [];
    groupData?.filter((expense) => {
      if (expenseData.length === 0) {
        expenseData.push({
          name: expense.user_expense_name,
          expenses: [expense.user_expense_amount],
        });
      } else {
        const userExists = expenseData.find(
          (user) => user.name === expense.user_expense_name
        );
        if (userExists) {
          userExists.expenses.push(expense.user_expense_amount);
        } else {
          expenseData.push({
            name: expense.user_expense_name,
            expenses: [expense.user_expense_amount],
          });
        }
      }
    });
    expenseData.find((info) => {
      if (info.name === user.displayName) {
        info.name = "You";
      }
    });
    return expenseData;
  };

  useEffect(() => {
    if (data) {
      const userObject = createUserObject(data);
      const result = calculateOwes(userObject);
      setExpensesArray(result);
    }
  }, [data]);

  return (
    <>
      <BalanceSummaryColumn>
        {expensesArray?.map((expense,i) => (
            <BalanceSummaryCard
            key={i}
              userName={
                typeof expense === "string" ? expense : expense.userString
              }
              userAmount={
                typeof expense === "string" ? 0 : expense.userNumber || 0
              }
            />
        ))}
      </BalanceSummaryColumn>
    </>
  );
}

export default Index;
