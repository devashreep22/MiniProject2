import { useAuth } from "@/context/AuthContext";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-4 flex flex-col items-center">
        <h1>Profile</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-2">Profile</h1>
      <p>Welcome to your profile page!</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      {user.farmName && <p><strong>Farm Name:</strong> {user.farmName}</p>}
      {user.farmAddress && <p><strong>Farm Address:</strong> {user.farmAddress}</p>}
      {user.cropTypes && user.cropTypes.length > 0 && (
        <p><strong>Crop Types:</strong> {user.cropTypes.join(", ")}</p>
      )}
    </div>
  );
}

export default Profile;
