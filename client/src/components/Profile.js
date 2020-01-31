// src/components/Profile.js

import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom"

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>Welcome back, {user.nickname}</h2>
      <Link to="/new-entry">Add Comics</Link>
      <Link to="/my-collection">View Your Collection</Link>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;