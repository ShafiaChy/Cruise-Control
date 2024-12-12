import { ChangeEvent, useState } from "react";
import { FaTrashAlt, FaUserShield, FaUserAltSlash } from "react-icons/fa";
import { TUser } from "../../types/user";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  usePromoteUserToAdminMutation,
} from "../../redux/features/user/userApi";
import LoadingError from "../LoadingError";
import Spinner from "../Spinner";
import { toast } from "sonner";
import ConfirmationModal from "../ConfirmationModal";

const UserManagement = () => {
  const {
    data: usersResponse,
    error,
    isLoading,
    refetch,
  } = useGetAllUsersQuery(undefined);
  const [deleteUser] = useDeleteUserMutation();
  const [promoteUserToAdmin] = usePromoteUserToAdminMutation();

  const [filter, setFilter] = useState("");
  const [changingRole, setChangingRole] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  const users: TUser[] = usersResponse?.data || [];

  const handleDeleteUser = async () => {
    console.log(userToDelete);
    const userId = userToDelete;
    console.log(userId);
    if (userToDelete) {
      try {
        await deleteUser(userId).unwrap();
        refetch();
        toast.success("User deleted successfully", {
          duration: 2000,
          className: "text-orange-600",
        });
      } catch (error) {
        console.error("Failed to delete user", error);
        toast.error("Failed to delete user", {
          duration: 2000,
        });
      } finally {
        setUserToDelete(null);
      }
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setChangingRole(userId);

    const toastId = toast.loading("Changing user role...");

    try {
      await promoteUserToAdmin({
        userId,
        role: newRole,
      }).unwrap();

      refetch();

      toast.success(`User role updated to ${newRole}`, {
        id: toastId,
        duration: 2000,
        className: "text-orange-600",
      });
    } catch (error) {
      toast.error("Failed to change user role", {
        id: toastId,
        duration: 2000,
      });
      console.error("Failed to change user role", error);
    } finally {
      setChangingRole(null);
    }
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredUsers = users.filter((user: TUser) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-screen-lg bg-transparent">
      {userToDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete this user?"
          onConfirm={handleDeleteUser}
          onCancel={() => setUserToDelete(null)}
        />
      )}
      <div className="md:flex md:items-center md:justify-between flex-col md:flex-row">
        <p className="flex-1 text-base font-semibold text-gray-300">
          Number of users: {filteredUsers.length}
        </p>

        <div className="mt-4 md:mt-0 text-white w-full md:w-9/12">
          <div className="flex flex-col gap-4 md:flex-row items-stretch md:items-center md:justify-end md:mb-0 mb-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-x-2 w-full md:w-auto">
                <label className="w-1/3 md:w-auto text-sm font-medium text-white/80">
                  Search By Name:
                </label>
                <input
                  type="text"
                  placeholder="Search by name"
                  value={filter}
                  onChange={handleFilterChange}
                  className="block w-full md:w-auto flex-grow rounded-none border-transparent bg-gray-100 text-gray-800 p-1 pr-10 text-base outline-none focus:shadow sm:text-sm hover:bg-gray-200 focus:bg-gray-200 transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <LoadingError />
      ) : !filteredUsers.length ? (
        <div className="flex justify-center items-center py-6 mt-24">
          <div className="bg-transparent text-gray-100 text-2xl px-4 py-3">
            <strong className="font-bold">No Data Found</strong>
          </div>
        </div>
      ) : (
        <div className="mt-3 overflow-hidden rounded-none shadow bg-gray-300">
          <div className="md:overflow-hidden overflow-x-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-200">
            <table className="min-w-full border-collapse border border-black/80 whitespace-nowrap">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th className="py-2 text-sm font-medium text-gray-200 px-2 md:px-4 border-b border-gray-500 w-8">
                    #
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Name
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Email
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Phone
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 px-4 md:px-6 border-b border-gray-500">
                    Address
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 border-b border-gray-500 text-center w-28">
                    Role
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 border-b border-gray-500 text-center w-20">
                    Change Role
                  </th>
                  <th className="py-2 text-sm font-medium text-gray-200 border-b border-gray-500 text-center w-20">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-300">
                {filteredUsers.map((user: TUser, index: number) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-4 text-sm font-bold text-gray-800 px-2 md:px-4 text-center w-8">
                      {index + 1}
                    </td>
                    <td className="text-sm font-semibold text-gray-900 px-4 md:px-6">
                      {user.name}
                    </td>
                    <td className="text-sm text-gray-900 px-4 md:px-6">
                      {user.email}
                    </td>
                    <td className="text-sm text-gray-900 px-4 md:px-6">
                      {user.phone}
                    </td>
                    <td className="text-sm text-gray-500 px-4 md:px-6">
                      {user.address}
                    </td>
                    <td className="text-sm text-center w-28">
                      <span
                        className={`py-1 px-3 rounded-full text-white text-xs ${
                          user.role === "admin" ? "bg-orange-600" : "bg-gray-500"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="text-sm text-center w-20">
                      <button
                        onClick={() => handleToggleRole(user._id!, user.role)}
                        className={` bg-transparent border-none focus:outline-none p-2 rounded-full ${
                          user.role === "admin"
                            ? "text-red-600"
                            : "text-blue-600"
                        }`}
                        aria-label={
                          user.role === "admin"
                            ? "Demote to User"
                            : "Promote to Admin"
                        }
                      >
                        {changingRole === user._id ? (
                          <div className="text-gray-700">...</div>
                        ) : user.role === "admin" ? (
                          <FaUserAltSlash
                            className="w-5 h-5"
                            title="Demote to User"
                          />
                        ) : (
                          <FaUserShield
                            className="w-5 h-5"
                            title="Promote to Admin"
                          />
                        )}
                      </button>
                    </td>
                    <td className="text-sm text-center flex justify-center gap-1 mx-4 text-gray-500 w-20 px-4 md:px-8 py-4">
                      <button
                        onClick={() => setUserToDelete(user._id!)}
                        className="text-red-600 bg-transparent border-none hover:text-red-800 focus:outline-none"
                      >
                        <FaTrashAlt
                          className="w-4 h-4"
                          aria-label="Delete User"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
