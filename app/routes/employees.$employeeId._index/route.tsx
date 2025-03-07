import { redirect, useLoaderData, type ActionFunction, type LoaderFunction } from "react-router";
import EmployeesForm from "~/components/EmployeeForms";
import { getDB } from "~/db/getDB";


export const loader: LoaderFunction = async ({ params }) => {
  const { employeeId } = params;
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [
    employeeId,
  ]);

  return { employee };
};

export const action: ActionFunction = async ({ request, params }) => {
  const { employeeId } = params;
  const formData = await request.formData();

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
  const result = await db.run(
    "UPDATE employees SET full_name = ?,email = ?,phone = ?,birth_date = ?,job_title = ?,department = ?,salary = ?,start_date = ?,end_date = ? WHERE id = ?",
    [...data, employeeId]
  );

  if (result.changes === 0) {
    throw new Response("Failed to update employee", { status: 500 });
  }
  console.log(JSON.stringify(data));
  return redirect("/employees");
}

export default function EmployeePage() {
  const { employee } = useLoaderData();
  // console.log(JSON.stringify(employee));

  return (
    <div
      className="container mt-4 mx-auto relative justify-items-center m-0 flex w-screen"
    >
      <EmployeesForm method="put" employee={employee} />
    </div>
  );
}
