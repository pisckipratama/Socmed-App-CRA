import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import { UserContext } from '../../App';

const LoginComponent = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const PostData = () => {
    fetch('https://lamport.pisckitama.my.id/api/users/v1/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json())
      .then(data => {
        if (!data.success) {
          M.toast({ html: data.message, classes: "#e57373 red lighten-2" });
        } else {
          localStorage.setItem('jwt', data.data.token);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          dispatch({ type: "USER", payload: data.data.user });
          M.toast({ html: data.message, classes: "#a5d6a7 green lighten-2" });
          history.push('/');
        };
      })
      .catch(err => {
        console.log(err);
        M.toast({ html: err.message, classes: "#e57373 red lighten-2" });
      });
  }

  return (
    <div className="myCard">
      <div className="card auth-card input-field">
        <h2 className="text-instagram">Instagram</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="btn waves-effect waves-light #64b5f6 blue lighten-2" onClick={() => PostData()}>Login</button>
        <h5>
          <Link to="/signup">Don't have an account</Link>
        </h5>
      </div>
    </div>
  )
};

export default LoginComponent;