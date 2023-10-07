import { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxTypeScriptHooks";
import { selectUser } from "../features/authentication/userSlice";
import { useFetchUserGroupsQuery } from "../features/groupexpense/groupExpenseTableSlice";
import { useFetchRecentActivityQuery } from "../features/recentactivity/recentActivitySlice";
import { useFetchRecentActivityPaginationQuery } from "../features/recentactivity/recentActivitySlice";
import { usePagination } from "../features/groupexpense/hooks/usePagination";
import ExpenseTableRow from "../features/groupexpense/Components/ExpenseTableRow";
import {
  PoweroffOutlined,
  WifiOutlined,
  CarOutlined,
  PhoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { getFormattedDate } from "../utils";
import { UserGroup } from "../types";
import { Button } from "../Components/ui/button"; 

function RecentActivityPage() {
  const { email, displayName } = useAppSelector(selectUser);
  const { data: groupId } = useFetchUserGroupsQuery(email);
  const [expensesArray, setExpensesArray] = useState<UserGroup[]>([]);

  const { data: recentActivity, refetch:refetchRecentActivity } = useFetchRecentActivityQuery(groupId);

  const { data: recentActivityPagination, refetch: paginationFetch } =
    useFetchRecentActivityPaginationQuery(groupId);


  useEffect(() => {
    if (recentActivity) {
      setExpensesArray(recentActivity);
      refetchRecentActivity();
    }
  }, [groupId, recentActivity, refetchRecentActivity]);

  const nextPageClick = async () => {
    paginationFetch();
  };

  usePagination(recentActivityPagination || [], setExpensesArray);

  const selectIcon = (billType: JSX.Element | string) => {
    const billTypeString =
      typeof billType === "string" ? billType : billType?.toString();

    if (billTypeString.split(" ")[0].toLowerCase() === "power") {
      return <PoweroffOutlined className="text-xl" />;
    } else if (billTypeString.split(" ")[0].toLowerCase() === "internet") {
      return <WifiOutlined className="text-xl" />;
    } else if (billTypeString.split(" ")[0].toLowerCase() === "car") {
      return <CarOutlined className="text-xl" />;
    } else if (billTypeString.split(" ")[0].toLowerCase() === "phone") {
      return <PhoneOutlined className="text-xl" />;
    } else if (billTypeString.split(" ")[0].toLowerCase() === "parking") {
      return <FileTextOutlined className="text-xl" />;
    } else {
      return <FileTextOutlined className="text-xl" />;
    }
  };

  return (
    <div className="w-full">
      {expensesArray?.map((expense, i) => (
        <div key={i}>
          <ExpenseTableRow
            expenseIcon={selectIcon(expense?.user_expense_description)}
            expenseDescription={expense?.user_expense_description}
            expenseDate={getFormattedDate(
              expense?.created_at?.seconds,
              expense?.created_at?.nanoseconds
            )}
            expenseAmount={`$${expense?.user_expense_amount}`}
            expenseId={expense?.id}
            billPaidBy={
              displayName === expense?.user_expense_name
                ? "You paid"
                : expense?.user_expense_name?.split(" ")?.slice(0, 1) + " paid"
            }
          />
        </div>
      ))}
      <div className="w-full flex justify-center mt-4">
        <Button className="bg-gray-200 w-40 text-black hover:bg-gray-300 " onClick={nextPageClick}>
          Show more
        </Button>
      </div>
    </div>
  );
}

export default RecentActivityPage;
