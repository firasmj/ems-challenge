import { Form, redirect, type ActionFunction } from "react-router";
import EmployeesForm from "~/components/Forms";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name) VALUES (?)',
    [full_name]
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div
      className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen"
    >
      {/* <h1>Create New Employee</h1>
      <Form method="post">
        <div>
          <label htmlFor="full_name">Full Name</label>
          <input type="text" name="full_name" id="full_name" required />
        </div>
        <button type="submit">Create Employee</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul> */}
      <EmployeesForm method="post" />
    </div>
  );
}
