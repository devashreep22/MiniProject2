import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  UserCheck,
  UserX,
  Loader2,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Users,
  Eye,
  MessageSquare,
  User2
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";
import { useUsers } from "@/services/Users/useUsers";
import type { User } from "@/services/Users/userApi";

// User Card Component
const UserCard = ({ 
  user, 
  onVerify, 
  onToggleActive,
  verifyingId,
  togglingId 
}: { 
  user: User;
  onVerify: (id: string) => void;
  onToggleActive: (id: string) => void;
  verifyingId: string | null;
  togglingId: string | null;
}) => (
  <Card className="p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-4">
      {/* User Info */}
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <div className="relative flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold ${
            user.role === "farmer" ? "bg-green-600" :
            user.role === "buyer" ? "bg-blue-600" :
            "bg-purple-600"
          }`}>
            {user.fullName?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || "U"}
          </div>
          {user.isActive && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>
        
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 truncate">
              {user.fullName || user.username}
            </h3>
            <Badge variant="outline" className="text-xs">
              {user.role}
            </Badge>
            {user.role === "farmer" && (
              <Badge variant={user.isVerified ? "default" : "secondary"} className="text-xs">
                {user.isVerified ? (
                  <><CheckCircle2 className="w-3 h-3 mr-1" />Verified</>
                ) : (
                  <><AlertCircle className="w-3 h-3 mr-1" />Pending</>
                )}
              </Badge>
            )}
          </div>

          {user.fullName && user.username !== user.fullName && (
            <p className="text-sm text-gray-600">@{user.username}</p>
          )}

          <div className="space-y-1 text-sm text-gray-600">
            {user.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="truncate">{user.email}</span>
              </div>
            )}
            
            {user.mobileNo && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{user.mobileNo}</span>
              </div>
            )}

            {user.createdAt && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {user.role === "farmer" && !user.isVerified && (
          <Button
            size="sm"
            onClick={() => onVerify(user.id)}
            disabled={verifyingId === user.id}
            className="bg-green-600 hover:bg-green-700"
          >
            {verifyingId === user.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Shield className="w-4 h-4 mr-1" />
                Verify
              </>
            )}
          </Button>
        )}
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Message
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => onToggleActive(user.id)}
              disabled={togglingId === user.id}
            >
              {togglingId === user.id ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : user.isActive ? (
                <>
                  <UserX className="w-4 h-4 mr-2 text-red-600" />
                  Deactivate
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 mr-2 text-green-600" />
                  Activate
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  </Card>
);

// Empty State Component
const EmptyState = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: any;
  title: string;
  description: string;
}) => (
  <Card className="text-center p-12 bg-gray-50">
    <Icon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Card>
);

// Main Component
export default function UserManagement() {
  const { users, loading, error, fetchUsers, handleVerifyFarmer, handleToggleActive } = useUsers();
  const [activeTab, setActiveTab] = useState("all");
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const handleVerify = async (userId: string) => {
    setVerifyingId(userId);
    try {
      await handleVerifyFarmer(userId);
    } finally {
      setVerifyingId(null);
    }
  };

  const handleToggle = async (userId: string) => {
    setTogglingId(userId);
    try {
      await handleToggleActive(userId);
    } finally {
      setTogglingId(null);
    }
  };

  // Tab-based filtering
  const farmers = users.filter(u => u.role === "farmer");
  const buyers = users.filter(u => u.role === "buyer");
  const admins = users.filter(u => u.role === "admin");

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600 mt-1">Manage all platform users</p>
          </div>
          <Button onClick={fetchUsers} disabled={loading} variant="outline">
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="all">
              <Users className="w-4 h-4 mr-2" />
              All
              <Badge variant="secondary" className="ml-2">{users.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="farmers">
              <Shield className="w-4 h-4 mr-2" />
              Farmers
              <Badge variant="secondary" className="ml-2">{farmers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="buyers">
              <User2 className="w-4 h-4 mr-2" />
              Buyers
              <Badge variant="secondary" className="ml-2">{buyers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="admins">
              <UserCheck className="w-4 h-4 mr-2" />
              Admins
              <Badge variant="secondary" className="ml-2">{admins.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {users.length === 0 ? (
              <EmptyState 
                icon={Users}
                title="No users found"
                description="No users are currently registered"
              />
            ) : (
              <div className="space-y-4">
                {users.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user}
                    onVerify={handleVerify}
                    onToggleActive={handleToggle}
                    verifyingId={verifyingId}
                    togglingId={togglingId}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="farmers" className="space-y-4">
            {farmers.length === 0 ? (
              <EmptyState 
                icon={Shield}
                title="No farmers found"
                description="No farmers are currently registered"
              />
            ) : (
              <div className="space-y-4">
                {farmers.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user}
                    onVerify={handleVerify}
                    onToggleActive={handleToggle}
                    verifyingId={verifyingId}
                    togglingId={togglingId}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="buyers" className="space-y-4">
            {buyers.length === 0 ? (
              <EmptyState 
                icon={User2}
                title="No buyers found"
                description="No buyers are currently registered"
              />
            ) : (
              <div className="space-y-4">
                {buyers.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user}
                    onVerify={handleVerify}
                    onToggleActive={handleToggle}
                    verifyingId={verifyingId}
                    togglingId={togglingId}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="admins" className="space-y-4">
            {admins.length === 0 ? (
              <EmptyState 
                icon={UserCheck}
                title="No admins found"
                description="No admins are currently registered"
              />
            ) : (
              <div className="space-y-4">
                {admins.map(user => (
                  <UserCard 
                    key={user.id} 
                    user={user}
                    onVerify={handleVerify}
                    onToggleActive={handleToggle}
                    verifyingId={verifyingId}
                    togglingId={togglingId}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}