import ReusableTable, { TableData } from "@/components/ReusableTable";
import { User } from "@/models/user";
import { getSession } from "@/utils/getSession";
import { redirect } from "next/navigation";

const getUsers = async () => {
  try {
    const res = await User.find({});
    return res;
  } catch (error: any) {
    console.error(error.message);
  }
};

const Home = async () => {
  const session = await getSession();
  if (!session?.user) {
    redirect("/login");
  }
  const data = await getUsers();

  const tableData:TableData={
    headers:[
      {key: 'name', label: 'Name'},
      {key: 'rollNo', label: 'Roll No'},
      {key: 'email', label: 'Email'},
    ],
    body:[
      {
        name: 'Ram',
        rollNo: 'Hello 1',
        email: 'Hello@mail.com'
      },
      {
        name: 'Laxman',
        rollNo: 'Hey man',
        email: 'heyman@mail.com'
      },
      {
        name: 'Bharat',
        rollNo: 'ok xa ta',
        email: 'okman@mail.com'
      },
      {
        name: 'Udemy',
        rollNo: 'kina ok',
        email: 'kinaman@mail.com'
      },
    ]
  }

  return (
    <section>
      {data?.map((user) => (
        <div key={user._id.toString()} className="font-bold flex gap-2">
          Name:
          <p className="text-purple-600">
            {user.firstName + " " + user.lastName}
          </p>
        </div>
      ))}
      <div className="max-w-[600px] mx-auto"><ReusableTable tableData={tableData}/></div>
    </section>
  );
};

export default Home;
