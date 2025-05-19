import Sidebar from "../../components/Sidebar"
import UserProfile from "../../components/userProfile/UserProfile"

const Attendance = () => {
  return (
    <div className="header-row">
        <Sidebar/>
       <main>
         <div className="top-header">
          <h3>Attendance</h3>
          <UserProfile/>
        </div>
       </main>
    </div>
  )
}

export default Attendance