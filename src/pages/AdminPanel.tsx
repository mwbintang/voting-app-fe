import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/authContext";
import Navbar from "@/components/Navbar";
import UserManagement from "@/components/UserManagement";
import VoteResults from "@/components/VoteResults";
import { VoteOption as VoteOptionType } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { createCandidate, deleteCandidate, voteStatService } from "@/lib/services/admin";

const AdminPanel: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("results");
  const [options, setOptions] = React.useState<VoteOptionType[]>([]);
  const [newOption, setNewOption] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("/");
    } else if (authState.user && authState.user.role !== "admin") {
      navigate("/vote");
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin panel.",
        variant: "destructive"
      });
    }
  }, [authState.isAuthenticated, authState.user, navigate, toast]);

  const fetchVoteStats = async () => {
    try {
      setLoading(true);
      const candidates = await voteStatService();
      setOptions(candidates);
    } catch (err: any) {
      toast(err.message || "Failed to fetch vote stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVoteStats();
  }, []);

  const handleAddOption = async () => {
    if (!newOption.trim()) return;

    await createCandidate(newOption)
    await fetchVoteStats()
    setNewOption("");

    toast({
      title: "Option Added",
      description: `"${newOption}" has been added as a voting option.`
    });
  };

  const handleDeleteOption = async (id: string) => {
    await deleteCandidate(id)
    await fetchVoteStats()

    toast({
      title: "Option Deleted",
      description: "The voting option has been removed."
    });
  };

  // Calculate total votes for the VoteResults component
  const totalVotes = options.reduce((sum, option) => sum + option.votes, 0);

  if (!authState.user || authState.user.role !== "admin") {
    return null; // Don't render anything if not admin
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Panel</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="results">Poll Results</TabsTrigger>
            <TabsTrigger value="manage-poll">Manage Poll</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card loading={loading}>
                <CardHeader>
                  <CardTitle>Current Poll Results</CardTitle>
                  <CardDescription>
                    Results from the current active poll
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <VoteResults options={options} totalVotes={totalVotes} />
                </CardContent>
              </Card>

              <Card loading={loading}>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                  <CardDescription>
                    Overall statistics for the current poll
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-blue-700 text-lg font-semibold mb-1">Total Votes</div>
                      <div className="text-2xl font-bold">
                        {totalVotes}
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-green-700 text-lg font-semibold mb-1">Options</div>
                      <div className="text-2xl font-bold">{options.length}</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-purple-700 text-lg font-semibold mb-1">Custom Options</div>
                      <div className="text-2xl font-bold">
                        {options.filter(o => o.isCustom).length}
                      </div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="text-yellow-700 text-lg font-semibold mb-1">Leading Option</div>
                      <div className="text-xl font-bold truncate">
                        {options.sort((a, b) => b.votes - a.votes)[0]?.name || "None"}
                      </div>
                    </div>
                  </div>

                  {/* <Button variant="outline" className="w-full" onClick={handleResetVotes}>
                    Reset All Votes
                  </Button> */}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="manage-poll">
            <Card loading={loading}>
              <CardHeader>
                <CardTitle>Manage Poll Options</CardTitle>
                <CardDescription>
                  Add or remove voting options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter a new voting option..."
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                    />
                    <Button onClick={handleAddOption}>Add Option</Button>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <h3 className="font-medium">Current Options</h3>
                    {options.map((option) => (
                      <div
                        key={option._id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                      >
                        <div>
                          <span className="font-medium">{option.name}</span>
                          {option.isCustom && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                              Custom
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2 items-center">
                          <span className="text-sm text-muted-foreground">
                            {option.votes} votes
                          </span>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteOption(option._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
