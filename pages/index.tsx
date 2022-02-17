import React, { useState } from "react";
import { useRouter } from 'next/router'
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

export default function Home() {
  const router = useRouter()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await fetch("https://frontend-test-api.aircall.io/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        sessionStorage.setItem(
          "access_token",
          JSON.stringify(data.access_token)
        );
        router.push("/home");
      })
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => setIsLoading(false));
  };

  return isLoading ? (
    <div className="center container ">
      <Dots />
    </div>
  ) : (
    <div >
      <div
        className="center container"
        style={{
          height: "250px",
          maxWidth: "500px",

            borderRadius: "10px",
            padding: "20px",
            marginTop: "150px",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          <form onSubmit={(e) => handleLoginForm(e)}>
            <div className="input-field center ">
              <label style={{
                fontWeight: "bold",
                fontStyle: "italic",
                fontSize: "25px",
                color: "gray",
              }}>Welcome</label>

              <div className="setting">
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  name="login"
                  placeholder="login"
                ></input>
              </div>
              <div className="setting2">
                <input
                  type="password"
                  name="login"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>

            </div>
          <button type="submit" className="btn btn-success setting2" value="Log In">
            Login
          </button>
        </form>
      </div >
    </div >
  );
}
