import Sidebar from "../../components/Sidebar"
import UserProfile from "../../components/userProfile/UserProfile"

const Employee = () => {
  return (
    <div className="header-row">
        <Sidebar/>
        <main>
          <div className="top-header">
          <h3>Employee</h3>
          <UserProfile/>
        </div>
        </main>
    </div>
  )
}

export default Employee