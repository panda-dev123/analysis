import React, { useEffect, useState } from "react";
import firebase from '../util/firebase'
import axios from "axios";
import Link from "next/link";
import "../styles/global.scss";


const useAuth = () => {
  const fireUser = firebase.auth().currentUser;
  const [user, setUser] = useState(fireUser);

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null);
    });
    return () => {
      unsub();
    };
  });
  return user;
};


function AnalyticsPage(props) {
  const auth = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(result => setData(result.data));
  }, []);

  return (
    <div className="analysis">
      {auth ?
        <div>
          <span className="text-primary col-lg-6">User email:</span>
          <span className="text-info col-lg-6">{auth.email}</span>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>name</th>
                <th>username</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map(item =>
                  <tr className="trow"> <td> {item.username}
                  </td> <td> {item.name} </td><td> {item.email} </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div> :
        <Link href="/auth/signout" passHref>
          <div className="moredata">
            <button type="button" className="btn btn-outline-info">MORE DATA</button>
          </div>
        </Link>
      }
    </div>
  );
}

export default AnalyticsPage;
