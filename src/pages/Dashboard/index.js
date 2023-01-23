import { collection, onSnapshot } from "firebase/firestore"
import { useState, useEffect } from "react"
import db, { auth } from "./../../firebase"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import Swal from 'sweetalert2'
import "./style.css"

function Dashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const [dataOfUser, setDataOfUser] = useState({})
  const [user, setUser] = useState("")

  useEffect(() => {
    setDataOfUser(JSON.parse(localStorage.getItem("user")))
   
    setTimeout(() => {
    //     if(dataOfUser.providerData[0] != undefined){
    //     // setUser(dataOfUser?.providerData[0])
    // }    
    }, 500)

  }, [])

 
  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setData(snapshot.docs.map((doc) => doc.data()))
    });
  }, [])

  const handleLogout = () => {
    signOut(auth).then(() => {
      Swal.fire({
        title: '',
        text: "Are you sure you want to logout?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {

          navigate("/");
          localStorage.removeItem("user")

        }
      })
    }).catch((error) => {
    });
  }
  return (
    <>
      <div className="dashboard-container">
        <div className={`sidebar ${active ? "sidebar active" : "sidebar"}`}>
          <div className="logo_content">
            <div className="logo">
              <div className="logo_name">World Peace</div>
            </div>
            <i className='bx bx-menu' id="btn" onClick={() => setActive(!active)}></i>
          </div>
          <ul className="nav_list">
            <li>
              <Link to="/dashboard">
                <i className='bx bx-user'></i>
                <span className="links_name">Users</span>
              </Link>
              <span className="tooltip">Users</span>
            </li>
          </ul>

          <div className="content">
            <div className="user">
              <div className="user_details">
                {/* <img src={user?.photoURL} alt="" /> */}
                <div className="name_job">
                      <div className="name">{dataOfUser?.email}</div>
                  {/* <div className="name">{dataOfUser?.providerData?.map(user => {
                    {user.email}
                  })}</div> */}
                </div>
              </div>
              <i className='bx bx-log-out' id="log_out" onClick={handleLogout}></i>
            </div>
          </div>

        </div>

        <div className="home_content container-table">
          <table className="content-table table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.map(user => (
                <tr key={user.uid}>
                  <td data-title="Name">
                    {user.displayName}
                  </td>

                  <td data-title="Email">
                    {user.email}
                  </td>
                  <td data-title="Type">
                    {user.userType}
                  </td>
                  <td data-title="Phone">
                    {user.phone}
                  </td>
                  <td data-title="Address">
                    {user.address}
                  </td>
                  <td data-title="Address">
                    {new Date(user.createdAt * 1000).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}

export default Dashboard

