import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, ArrowLeft, Loader2, User, Mail, Lock, Building } from "lucide-react";

function Register() {
  useEffect(() => {
    document.title = "Create Account - Your App Name";
  }, []);

  const [role, setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    farmName: "",
    farmAddress: "",
    cropTypes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      console.log("Registering...", { ...formData, role });
      // Add your registration logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-50/30 px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Registration Card */}
        <Card className="shadow-xl border-0 backdrop-blur-sm bg-white/70">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex justify-center mb-2">
              <div className="p-3 rounded-full bg-green-100">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center text-slate-900">
              Create Account
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              Join our platform and start your journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-sm font-medium text-slate-700">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-11 pl-10 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="role" className="text-sm font-medium text-slate-700">
                    Account Type
                  </Label>
                  <Select value={role} onValueChange={setRole} disabled={isSubmitting}>
                    <SelectTrigger className="h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="farmer">Farmer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Farmer Specific Fields */}
              {role === "farmer" && (
                <div className="space-y-4 p-4 border border-green-200 rounded-lg bg-green-50/50 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="h-4 w-4 text-green-600" />
                    <Label className="text-sm font-medium text-green-800">
                      Farm Information
                    </Label>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="farmName" className="text-sm font-medium text-slate-700">
                      Farm Name
                    </Label>
                    <Input
                      id="farmName"
                      type="text"
                      placeholder="Enter your farm name"
                      value={formData.farmName}
                      onChange={(e) => handleInputChange("farmName", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="farmAddress" className="text-sm font-medium text-slate-700">
                      Farm Address
                    </Label>
                    <Input
                      id="farmAddress"
                      type="text"
                      placeholder="Enter your farm address"
                      value={formData.farmAddress}
                      onChange={(e) => handleInputChange("farmAddress", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="cropTypes" className="text-sm font-medium text-slate-700">
                      Crop Types
                    </Label>
                    <Input
                      id="cropTypes"
                      type="text"
                      placeholder="e.g., Wheat, Corn, Vegetables"
                      value={formData.cropTypes}
                      onChange={(e) => handleInputChange("cropTypes", e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 border-slate-300"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                disabled={isSubmitting || !role}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white/70 px-2 text-slate-600">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                className="w-full h-11 border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium transition-colors"
                onClick={() => navigate("/login")}
              >
                Sign In to Existing Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Text */}
        <p className="text-center text-xs text-slate-500 px-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}

export default Register;