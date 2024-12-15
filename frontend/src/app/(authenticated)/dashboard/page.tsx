"use client";

import { signOut } from "next-auth/react";

const Dashboard = () => {
  return (
    <div>
      <p>DASHBOARD</p>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
};

export default Dashboard;
