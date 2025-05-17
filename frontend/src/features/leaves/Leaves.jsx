import Sidebar from "../../components/Sidebar"
import UserProfile from "../../components/userProfile/UserProfile"

const Leaves = () => {
  return (
    <div className="header-row">
      <Sidebar/>
      <div className="top-header">
        <h3>Leaves</h3>
        <UserProfile/>
      </div>
    </div>
  )
}

export default Leaves