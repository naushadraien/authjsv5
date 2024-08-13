import { getAllUsers } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { getSession } from "@/utils/getSession";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const Settings = async () => {
  const session = await getSession();

  if (session?.user?.role !== "admin") {
    redirect("/dashboard");
  }
  const users = await getAllUsers();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Users</h1>
      <table className="w-full rounded shadow">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">First Name</th>
            <th className="p-2">Last Name</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* We will render user here and all the actions */}
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">
                <form
                  action={async () => {
                    "use server";
                    await User.findByIdAndDelete(user._id);
                    revalidatePath("/settings");
                  }}
                >
                  <Button variant="destructive" type="submit">
                    Delete
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Settings;
