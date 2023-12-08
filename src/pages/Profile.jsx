import SidebarComponent from "../components/Sidebar.jsx";

const Profile = ({ userId }) => {
  return (
    <div className="flex">
      <SidebarComponent />
      <div>profile {userId}</div>
    </div>
  );
};

export default Profile;
