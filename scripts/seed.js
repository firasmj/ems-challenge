import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, '../database.yaml');
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, 'utf8'));

const {
  'sqlite_path': sqlitePath,
} = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    "id": 1,
    "full_name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+123456789",
    "birth_date": "1985-06-15",
    "job_title": "Software Engineer",
    "department": "IT",
    "salary": 70000,
    "start_date": "2020-01-15",
    "end_date": null
  },
  {
    "id": 2,
    "full_name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+234567891",
    "birth_date": "1990-02-20",
    "job_title": "Project Manager",
    "department": "Operations",
    "salary": 85000,
    "start_date": "2019-03-01",
    "end_date": null
  },
  {
    "id": 3,
    "full_name": "Robert Brown",
    "email": "robert.brown@example.com",
    "phone": "+345678912",
    "birth_date": "1975-11-30",
    "job_title": "HR Manager",
    "department": "HR",
    "salary": 60000,
    "start_date": "2018-07-11",
    "end_date": null
  },
  {
    "id": 4,
    "full_name": "Emily Davis",
    "email": "emily.davis@example.com",
    "phone": "+456789123",
    "birth_date": "1988-05-22",
    "job_title": "Accountant",
    "department": "Finance",
    "salary": 55000,
    "start_date": "2021-06-18",
    "end_date": null
  },
  {
    "id": 5,
    "full_name": "Michael Wilson",
    "email": "michael.wilson@example.com",
    "phone": "+567891234",
    "birth_date": "1982-08-10",
    "job_title": "Sales Executive",
    "department": "Sales",
    "salary": 50000,
    "start_date": "2017-09-07",
    "end_date": null
  },
  {
    "id": 6,
    "full_name": "Emma Taylor",
    "email": "emma.taylor@example.com",
    "phone": "+678912345",
    "birth_date": "1995-12-25",
    "job_title": "Marketing Specialist",
    "department": "Marketing",
    "salary": 45000,
    "start_date": "2022-04-05",
    "end_date": null
  },
  {
    "id": 7,
    "full_name": "James Anderson",
    "email": "james.anderson@example.com",
    "phone": "+789123456",
    "birth_date": "1983-09-14",
    "job_title": "IT Support",
    "department": "IT",
    "salary": 40000,
    "start_date": "2020-10-12",
    "end_date": null
  },
  {
    "id": 8,
    "full_name": "Olivia Thomas",
    "email": "olivia.thomas@example.com",
    "phone": "+891234567",
    "birth_date": "1991-03-08",
    "job_title": "Business Analyst",
    "department": "Business",
    "salary": 65000,
    "start_date": "2018-12-20",
    "end_date": null
  },
  {
    "id": 9,
    "full_name": "Lucas Jackson",
    "email": "lucas.jackson@example.com",
    "phone": "+912345678",
    "birth_date": "1987-07-17",
    "job_title": "Web Developer",
    "department": "IT",
    "salary": 52000,
    "start_date": "2016-11-14",
    "end_date": null
  },
  {
    "id": 10,
    "full_name": "Sophia Martin",
    "email": "sophia.martin@example.com",
    "phone": "+123789456",
    "birth_date": "1993-01-30",
    "job_title": "Content Writer",
    "department": "Marketing",
    "salary": 38000,
    "start_date": "2019-05-25",
    "end_date": null
  }
];



const timesheets = [
  {
    "id": 1,
    "start_time": "2025-03-07T08:00:00",
    "end_time": "2025-03-07T16:00:00",
    "employee_id": 1,
    "summary": "Completed software feature A"
  },
  {
    "id": 2,
    "start_time": "2025-03-07T09:00:00",
    "end_time": "2025-03-07T17:00:00",
    "employee_id": 2,
    "summary": "Managed project updates"
  },
  {
    "id": 3,
    "start_time": "2025-03-07T10:00:00",
    "end_time": "2025-03-07T18:00:00",
    "employee_id": 3,
    "summary": "Conducted interviews"
  },
  {
    "id": 4,
    "start_time": "2025-03-07T07:30:00",
    "end_time": "2025-03-07T15:30:00",
    "employee_id": 4,
    "summary": "Prepared financial reports"
  },
  {
    "id": 5,
    "start_time": "2025-03-07T08:15:00",
    "end_time": "2025-03-07T16:15:00",
    "employee_id": 5,
    "summary": "Client sales calls"
  },
  {
    "id": 6,
    "start_time": "2025-03-07T09:45:00",
    "end_time": "2025-03-07T17:45:00",
    "employee_id": 6,
    "summary": "Planned marketing campaign"
  },
  {
    "id": 7,
    "start_time": "2025-03-07T08:30:00",
    "end_time": "2025-03-07T16:30:00",
    "employee_id": 7,
    "summary": "Resolved IT issues"
  },
  {
    "id": 8,
    "start_time": "2025-03-07T07:45:00",
    "end_time": "2025-03-07T15:45:00",
    "employee_id": 8,
    "summary": "Analyzed business performance"
  },
  {
    "id": 9,
    "start_time": "2025-03-07T09:30:00",
    "end_time": "2025-03-07T17:30:00",
    "employee_id": 9,
    "summary": "Fixed website bugs"
  },
  {
    "id": 10,
    "start_time": "2025-03-07T10:15:00",
    "end_time": "2025-03-07T18:15:00",
    "employee_id": 10,
    "summary": "Drafted content for campaign"
  }
];



const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(', ');
  const placeholders = Object.keys(data[0]).map(() => '?').join(', ');

  const insertStmt = db.prepare(`INSERT INTO ${table} (${columns}) VALUES (${placeholders})`);

  data.forEach(row => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData('employees', employees);
  insertData('timesheets', timesheets);
});

db.close(err => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Database seeded successfully.');
  }
});

