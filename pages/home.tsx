import useUser from "@libs/client/useUser";
import { NextPage } from "next";

const Home: NextPage = () => {
  const user = useUser();
  console.log(user);
  return (
    <>
      <h1>Home</h1>
      {/* <strong>Welcome {user.name}</strong>
      <p>your email: {user.email}</p> */}
    </>
  );
};

export default Home;
