import { User } from "@/models/user";
import { getSession } from "@/utils/getSession";
import { redirect } from "next/navigation";
import TestTable from "./TestTable";

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
      <div className="max-w-[600px] mx-auto">
        <TestTable />
      </div>
    </section>
  );
};

export default Home;
