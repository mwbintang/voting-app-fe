
import React, { useEffect, useState } from "react";
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { changeRole, deleteUser, fetchUsers } from "@/lib/services/admin";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const getUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err: any) {
      toast(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    // In a real app, this would call an API to delete the user
    await deleteUser(userId)
    await getUsers();

    toast({
      title: "User Deleted",
      description: "The user has been successfully removed."
    });
  };

  const handleToggleRole = async (userId: string, roleName: string) => {
    // In a real app, this would call an API to update the user role
    await changeRole(userId, roleName)
    await getUsers();

    toast({
      title: "Role Updated",
      description: "The user's role has been successfully updated."
    });
  };

  return (
    <Card loading={loading}>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of all users in the system.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${user.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                    }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleRole(user._id, user.role === "admin" ? "user" : "admin")}
                    >
                      {user.role === "admin" ? "Make User" : "Make Admin"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
