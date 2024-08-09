import { User } from "@/models/user";

const getUsers = async () => {
  try {
    const res = await User.find({});
    return res;
  } catch (error: any) {
    console.error(error.message);
  }
};

const Home = async () => {
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
    </section>
  );
};

export default Home;
