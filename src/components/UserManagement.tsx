
import React, { useState } from "react";
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

// Mock users for the demo
const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "admin"
  },
  {
    id: "2",
    username: "user1",
    email: "user1@example.com",
    role: "user"
  },
  {
    id: "3",
    username: "user2",
    email: "user2@example.com",
    role: "user"
  },
  {
    id: "4",
    username: "manager",
    email: "manager@example.com",
    role: "admin"
  }
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const { toast } = useToast();
  
  const handleDelete = (userId: string) => {
    // In a real app, this would call an API to delete the user
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User Deleted",
      description: "The user has been successfully removed."
    });
  };
  
  const handleToggleRole = (userId: string) => {
    // In a real app, this would call an API to update the user role
    setUsers(users.map(user => {
      if (user.id === userId) {
        const newRole = user.role === "admin" ? "user" : "admin";
        return { ...user, role: newRole };
      }
      return user;
    }));
    
    toast({
      title: "Role Updated",
      description: "The user's role has been successfully updated."
    });
  };
  
  return (
    <Card>
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
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === "admin" 
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
                      onClick={() => handleToggleRole(user.id)}
                    >
                      {user.role === "admin" ? "Make User" : "Make Admin"}
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(user.id)}
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
