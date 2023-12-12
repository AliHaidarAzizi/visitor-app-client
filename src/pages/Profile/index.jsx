import { toast } from "react-toastify";
import SidebarComponent from "../../components/Sidebar.jsx";
import { viewUser } from "../../utils/api/user.js";
import { useEffect, useState } from "react";
import EditInput from "./components/EditInput.jsx";

const Profile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const response = await viewUser(userId);
      setUser(response.data.data);
    } catch (error) {
      console.log(">>>>>>>>>>>>", error);
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex">
      <SidebarComponent />
      {user && (
        <div>
          profile {userId}
          <EditInput userData={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
