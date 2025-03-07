import { Form, Link, NavLink, useLoaderData, type LoaderFunction } from "react-router"
import SubmitButton from "~/components/Buttons"
import { getDB } from "~/db/getDB"

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);

  //paging
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "5");
  const offset = (page - 1) * limit;

  //sorting
  const sortBy = url.searchParams.get("sortBy") || "full_name";
  const order = url.searchParams.get("order") || "asc";

  //search
  const query = url.searchParams.get("query") || "";
  const db = await getDB();
  let employees;
  if (query) {
    employees = await db.all(
      `SELECT * FROM employees WHERE full_name LIKE ? OR email LIKE ? ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`,
      [`%${query}%`, `%${query}%`, limit, offset]
    );
  } else {
    employees = await db.all(`SELECT * FROM employees ORDER BY ${sortBy} ${order} LIMIT ? OFFSET ?`, [limit, offset]);
  }

  return { employees, page, limit, sortBy, order, query };
}

export default function EmployeesPage() {
  let { employees, page, limit, sortBy, order, query } = useLoaderData();

  let currentPage = Number(page) || 1;
  limit = Number(limit) || 5;


  return (
    <div>
      <div
        className="container mt-4 mx-auto flex-col relative justify-items-center m-0 flex w-screen p-3"
      >
        <div className="flex justify-between flex-row mb-10">
          <h1 className="text-2xl font-bold">Employees</h1>
          <form method="get" action={`/employees?limit=${limit}`}
          // onChange={(e) => (e.target as HTMLFormElement).form.submit()}
          >
            <input type="hidden" name="limit" value={limit} />
            <select
              name="sortBy"
              className="bg-gray-100 p-2 rounded-md mr-2"
              defaultValue={sortBy}
            >
              <option value="id">Sort By</option>
              <option value="full_name">Name</option>
              <option value="department">Department</option>
              <option value="email">Email</option>
              <option value="phone">Phone Number</option>
              <option value="birth_date">Date of Birth</option>
              <option value="start_date">Start Date</option>
            </select>
            <select
              name="order"
              className="bg-gray-100 p-2 rounded-md mr-2"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            <input type="text"
              name="query"
              placeholder="Search employees..."
              className="bg-gray-100 p-2 rounded-md mr-2"
            />
            <SubmitButton text="Search" />
          </form>
        </div>
        <table
          className="table-auto w-[80vw] 2xl:w-[90%] mx-auto bg-gray-100 p-5"
        >
          <thead>
            <tr className="">
              <th className="text-start px-4 py-2">Employee ID</th>
              <th className="text-start px-4 py-2">Full Name</th>
              <th className="text-start px-4 py-2">Email</th>
              <th className="text-start px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => (
              <tr className="hover:bg-gray-200 hover:drop-shadow-sm">
                <td className="px-4 py-2">
                  <Link to={`/employees/${employee.id}`}>
                    {employee.id}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/employees/${employee.id}`}>
                    {employee.full_name}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/employees/${employee.id}`}>
                    {employee.email}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <Link to={`/employees/${employee.id}`}>
                    {employee.phone}
                  </Link>
                </td>
                <td>
                  <Link to={`/employees/${employee.id}`}
                    className="bg-gray-300 hover:bg-gray-700 hover:text-white text-black font-bold py-2 px-4 rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav className="flex justify-around w-[80vw] 2xl:w-[90%] mx-auto bg-gray-100 p-5 pt-16">
          <Form method="get" action={`/employees`}>
            <input type="hidden" name="page" value={currentPage} />
            <input type="hidden" name="sortBy" value={sortBy} />
            <input type="hidden" name="order" value={order} />
            <input type="hidden" name="query" value={query} />
            <label htmlFor="limit"
              className="justify-start text-start mr-2 text-gray-500"
            >
              Limit
            </label>
            <input
              type="number"
              name="limit"
              defaultValue={limit}
              className="bg-gray-50 p-2 rounded-md mr-2 w-[50%]"
            />
            <button type="submit" className="bg-gray-200 p-1 rounded-md mr-2 hover:bg-gray-500 hover:fill-white translate-y-0.5">
              <svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 17.837 17.837">
                <g>
                  <path d="M16.145,2.571c-0.272-0.273-0.718-0.273-0.99,0L6.92,10.804l-4.241-4.27
          c-0.272-0.274-0.715-0.274-0.989,0L0.204,8.019c-0.272,0.271-0.272,0.717,0,0.99l6.217,6.258c0.272,0.271,0.715,0.271,0.99,0
          L17.63,5.047c0.276-0.273,0.276-0.72,0-0.994L16.145,2.571z"/>
                </g>
              </svg>
            </button>
          </Form>
          {currentPage > 1 ? (
            <NavLink
              to={`?page=${currentPage - 1}&limit=${limit}&sortBy=${sortBy}&order=${order}&query=${query}`}
              className={'hover:bg-gray-500 bg-gray-200 rounded-sm p-5 py-2 hover:text-white'}
            >
              Previous
            </NavLink>
          ) : (
            <NavLink
              to={`?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&order=${order}&query=${query}`}
              className={'bg-gray-200 rounded-sm p-5 py-2 text-gray-400'}
            >
              Previous
            </NavLink>
          )}
          <NavLink
            to={`?page=${currentPage + 1}&limit=${limit}&sortBy=${sortBy}&order=${order}&query=${query}`}
            className={'hover:bg-gray-500 bg-gray-200 rounded-sm p-5 py-2 hover:text-white'}
          >
            Next
          </NavLink>
        </nav>
      </div>
    </div>
  )
}
