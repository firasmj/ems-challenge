import { Form, redirect, type ActionFunction } from "react-router";
import EmployeesForm from "~/components/EmployeeForms";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  // const full_name = formData.get("full_name");

  const data = [
    formData.get("full_name"),
    formData.get("email"),
    formData.get("phone"),
    formData.get("birth_date"),
    formData.get("job_title"),
    formData.get("department"),
    formData.get("salary"),
    formData.get("start_date"),
    formData.get("end_date"),
  ];

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone, birth_date, job_title, department, salary, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    data
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return (
    <div
      className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen"
    >
      <EmployeesForm method="post" />
    </div>
  );
}
