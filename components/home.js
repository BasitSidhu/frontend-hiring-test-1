import React, { useEffect, useState } from "react";
import Pagination from "./pagination";
import { useRouter } from "next/router";
import { Dots } from "react-activity";
import "react-activity/dist/Dots.css";

export default function Home() {
  const [callItems, setCallItems] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [archive, setArchive] = useState(false);
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
    const accessToken = JSON.parse(sessionStorage.getItem("access_token"))
    const fetchData = async () => {
      await fetch(
        `https://frontend-test-api.aircall.io/calls?offset=0&limit=${limit}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setpageCount(Math.ceil(data.totalCount / limit));
          setCallItems(data.nodes);
        })
        .catch((error) => {
          console.log(error);
          // alert("Your session has expired!");
          sessionStorage.removeItem("access_token");
          router.push("/");
        });
    }
    fetchData()
      , [archive]
  }

  )
  return !callItems.length ? (
    <div className="center container">
      <Dots />
    </div>
  ) : (
    <Pagination
      callItems={callItems}
      totalPages={pageCount}
      limit={limit}
      archive={archive}
      setArchive={setArchive}
    ></Pagination>
  );
}
