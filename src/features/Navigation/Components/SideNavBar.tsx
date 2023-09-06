import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../Components/ui/accordion";
import { useFetchHighScoresTablesQuery } from '../../expensetable/expenseTableSlice';

type NavBarProps = {
  showNavBar: boolean;
};

function NavBar({ showNavBar }: NavBarProps) {

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useFetchHighScoresTablesQuery();
console.log(data)
  return (
    <nav className="">
      <div className="sticky top-24 sm:top-16 ">
        <aside
          className={
            showNavBar
              ? `fixed top-16 sm:static left-0 z-40 w-64 rounded-medium  transition-transform -translate-x-full sm:translate-x-0  `
              : "fixed top-0 left-0 sm:static z-40 w-64 h-screen transition-transform  sm:translate-x-0"
          }
        >
          <div className="h-screen py-12 overflow-y-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg sm:pt-0 ">
            <ul className="space-y-2 font-medium">
              <li></li>
              <li>
                <Link
                  className="flex items-center p-2 text-gray-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  to={"/dashboard"}
                >
                  <span className="ml-3 mt-2 text-2xl">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center p-2 text-gray-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  to={"/postaride"}
                >
                  <span className="flex-1 ml-3 whitespace-nowrap mt-1 text-2xl">
                    Recent Activity
                  </span>
                </Link>
              </li>
              <li>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Group</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </li>
              <li>
                <a className="flex items-center p-2 text-gray-800 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <span className="flex-1 ml-3 whitespace-nowrap mt-1 text-2xl">
                    Profile
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </nav>
  );
}

export default NavBar;
