import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Modal from "react-modal";
import CallItem from "./callItem";
import CallModal from "./callModal";
import { Dots } from "react-activity";
import { Table } from "react-bootstrap";
import "react-activity/dist/Dots.css";
import ArchiveModal from "./archiveModal";
import UnArchiveModal from "./unArchiveModal";

function HMS(seconds:any) {
  var date = new Date(0);
  date.setSeconds(seconds);
  return `${date.toISOString().substr(11, 8)}`;
}

function Items({ callItems, isLoading, archive, setArchive }:any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [archiveModalVisible, setArchiveModalVisible] = useState(false);
  const [unArchiveModalVisible, setUnArchiveModalVisible] = useState(false);

  const [callItem, setCallItem] = useState({});
  const [callDuration, setCallDuration] = useState(0);

  async function archiveCall(id:number) {
    const access_token = JSON.parse((sessionStorage.getItem("access_token"))??'');
    await fetch(`https://frontend-test-api.aircall.io/calls/${id}/archive`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${access_token}` },
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => {
        setArchive(!archive);
      });
  }
  function modalHandler(item:any) {
    setModalVisible(true);
    setCallItem(item);
    setCallDuration(HMS(item.duration) as unknown as number);
  }
  function archiveHandler(archived:boolean, id:number) {
    archived ? setArchiveModalVisible(true) : setUnArchiveModalVisible(true);
    setTimeout(() => {
      setArchiveModalVisible(false);
      setUnArchiveModalVisible(false);
    }, 1500);

    archiveCall(id);
    setArchive(archived);
  }

  return isLoading ? (
    <div className="center container gray">
      <Dots />
    </div>
  ) : (
    <div>
      <h3 className="text-center text-bold">CALL DATA</h3>
      <table
        className="table table-hover table-striped table-bordered"
        style={{

          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <thead style={{
          border: "1px solid black",
          backgroundColor: "black",
          color: "white",
          textAlign: "center",
          borderRadius: "4rem",
        }}>
          <tr>
            <th className="center blue">CALLER</th>
            <th className="center blue">RECEVIER</th>
            <th className="center blue">THROUGH</th>
            <th className="center blue">CALL DURATION</th>
            <th className="center blue">STATUS</th>
            <th className="center blue">DATE</th>
            <th className="center blue"></th>

          </tr>
        </thead>
        <tbody>
          {callItems.map((item:any) =>
            modalVisible ? (
              <>
                <CallModal
                  item={callItem}
                  modalState={modalVisible}
                  setModalState={setModalVisible}
                  duration={callDuration}
                />
              </>
            ) : (
              <>
                {archiveModalVisible && (
                  <ArchiveModal
                    item={callItem}
                    modalState={archiveModalVisible}
                    setModalState={setArchiveModalVisible}
                  />
                )}
                {unArchiveModalVisible && (
                  <UnArchiveModal
                    item={callItem}
                    modalState={unArchiveModalVisible}
                    setModalState={setUnArchiveModalVisible}
                  />
                )}
                <CallItem
                  item={item}
                  modalHandler={modalHandler}
                  archiveHandler={archiveHandler}
                  HMS={HMS}
                />
              </>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function Pagination({ limit, callItems, totalPages, archive, setArchive }:any) {
  // We start with an empty list of items
  const pageCount = totalPages;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [items, setItems] = useState(callItems);
  const [isLoading, setIsLoading] = useState(false);

  // Invoke when user click to request another page.
  const handlePageClick = async (event: any) => {
    setIsLoading(true);
    const access_token = JSON.parse(sessionStorage.getItem("access_token")??'');
    setItemOffset(itemOffset + limit);
    await fetch(
      `https://frontend-test-api.aircall.io/calls?offset=${itemOffset + limit
      }&limit=${limit}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.nodes);
        // this gives an object with dates as keys
        const groups = data.nodes.reduce((groups:any, call:any) => {
          const date = call.created_at.split("T")[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(call);
          return groups;
        }, {});

        // Edit: to add it in the array format instead
        const groupArrays = Object.keys(groups).map((date) => {
          return {
            date,
            calls: groups[date],
          };
        });

      })
      .catch((error) => {
        console.log(error);
        alert("Looks like you aren't connected to the internet!");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="container">
      <div className="row m-1" >
        <Items
          callItems={items}
          isLoading={isLoading}
          archive={archive}
          setArchive={setArchive}
        />
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"blue"}
        />
      </div>
    </div>
  );
}

export default Pagination;
