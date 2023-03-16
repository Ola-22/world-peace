import { useState, useEffect } from "react"
import db, { auth } from "./../../firebase"
import { Link, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import Swal from 'sweetalert2'
import "./style.css"
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore"

function Dashboard({rounded = false}) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false)
  const [data, setData] = useState([])
  const [dataOfUser, setDataOfUser] = useState({})

  useEffect(() => {
    setDataOfUser(JSON.parse(localStorage.getItem("user")))

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


  const [isToggleOn, setToggleOn] = useState(false)

    
  function handleClick(id) {
   setToggleOn(!isToggleOn)
     updateDoc(doc(db, "users", `${id}`), datass)
     .then(docRef => {
         console.log("A New Document Field has been added to an existing document");
     })
     .catch(error => {
         console.log(error);
     })
   }

   const datass = {
    status: isToggleOn ? 0 : 1,
  };
   
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
                <div className="name_job">
                      <div className="name">{dataOfUser?.email}</div>
                  
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
                <th>Status</th>
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
                  <td data-title="Status">
                  <div>
              
<div onClick={() => handleClick(user.id)} className="ToggleSwitch">
          <div className={user.status === 1 ? 'knob active' : 'knob'} />
        </div>
      </div>

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

