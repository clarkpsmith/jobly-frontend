import React, { useContext } from "react";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import UserContext from "../common/UserContext";
import "./Home.css";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="background">
      <section className="offset-md-2 col-md-8 Home col-md-8 ">
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              <h2 className="font-weight-bold"> Jobly</h2>
            </CardTitle>
            <p>All the jobs in one, convenient place</p>
            {currentUser ? (
              <h3>Welcome Back, {currentUser.firstName}</h3>
            ) : (
              <>
                <Link to="/signup">
                  <Button className="Home-btn" color="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>

                <Link to="/login">
                  <Button className="Home-btn" color="primary" size="sm">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default Home;
