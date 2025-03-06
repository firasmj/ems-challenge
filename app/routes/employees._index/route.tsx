import { Link, useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"

export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData()

  return (
    <div>
      <div
        className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen p-3"
      >
        <table
          className="table-auto w-[80vw] mx-auto bg-gray-100 p-5"
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

        {/* {employees.map((employee: any) => (
          <div>
            <ul>
              <li>Employee #{employee.id}</li>
              <ul>
                <li>Full Name: {employee.full_name}</li>
                <li>Full Name: {employee.email}</li>
                <li>Full Name: {employee.phone}</li>
              </ul>
            </ul>
          </div>
        ))} */}
      </div>
      {/* <hr /> */}
      {/* <ul>
        <li><a href="/employees/new">New Employee</a></li>
        <li><a href="/timesheets/">Timesheets</a></li>
      </ul> */}
    </div>
  )
}
