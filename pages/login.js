import React from "react";
import Header from "components/layouts/Header";

const Login = () => {
  return (
    <div className="p-4">
      <h3>Login</h3>
    </div>
  );
};

export default Login;

Login.getLayout = function getLayout(page) {
  return (
    <>
      <Header />
      {page}
    </>
  );
};
