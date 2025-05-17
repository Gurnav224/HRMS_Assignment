import { useSelector } from "react-redux";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
    const {user} = useSelector((state) => state.auth)

  return (
    <section>
        <Sidebar/>
        <h1>Welcome to Dashboard</h1>
        {user && <p>{user.fullName}</p>}
    </section>
  )
}

export default Dashboard