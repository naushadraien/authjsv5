import { TableData } from "@/components/ReusableTable";

export const tableData: TableData = {
  headers: [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "rollNo", label: "Roll No" },
    { key: "email", label: "Email" },
  ],
  body: [
    {
      id: `1`,
      name: "Ram",
      rollNo: "Hello 1",
      email: "Hello@mail.com",
    },
    {
      id: `2`,
      name: "Laxman",
      rollNo: "Hey man",
      email: "heyman@mail.com",
    },
    {
      id: `3`,
      name: "Bharat",
      rollNo: "ok xa ta",
      email: "okman@mail.com",
    },
    {
      id: `4`,
      name: "Udemy",
      rollNo: "kina ok",
      email: "kinaman@mail.com",
    },
  ],
};

export const buttonData: Array<{ title: string; data: string[] }> = [
  {
    title: "Test Todos",
    data: ["TOdos Test 1", "TOdos Test 2", "Test3", "Test4"],
  },
  {
    title: "Open Test Versions",
    data: ["This is not side menu", "This is side menu", "Test3", "Test4"],
  },
];
