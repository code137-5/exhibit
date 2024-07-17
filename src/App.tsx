import "./App.css";
import React, { useEffect, useMemo, useState } from "react";
import Iframe from "react-iframe";
import Countdown, { CountdownRenderProps } from "react-countdown";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import json from "./data.json";
import { isMobile } from "react-device-detect";

let artworkIdx = 0;
const urlPath = location.pathname;
let sortingNum = 0;
if (urlPath.indexOf("page1") !== -1) {
  sortingNum = 1;
} else if (urlPath.indexOf("page2") !== -1) {
  sortingNum = 2;
}
const filterData = json.data.filter((d) => {
  if (urlPath === "/") {
    return true;
  }
  return d.sort === sortingNum;
});
filterData.sort(() => Math.random() - 0.5);
console.log("filterData : ", filterData);

function toggleFullScreen(element) {
  if (!document.fullscreenElement) {
    if (element.requestFullscreen) return element.requestFullscreen();
    if (element.webkitRequestFullscreen)
      return element.webkitRequestFullscreen();
    if (element.mozRequestFullScreen) return element.mozRequestFullScreen();
    if (element.msRequestFullscreen) return element.msRequestFullscreen();
  } else {
    if (document.exitFullscreen) return document.exitFullscreen();
    if (document.webkitCancelFullscreen)
      return document.webkitCancelFullscreen();
    if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
    if (document.msExitFullscreen) return document.msExitFullscreen();
  }
}

const container = document.getElementById("root");
// document.addEventListener("click", (e, url) => {
//   console.log("click");
//   if (!isMobile) {
//     toggleFullScreen(container);
//   }
// });

const timerRenderer = ({
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  if (completed) {
    // Render a completed state
    return <span>다음작품으로 넘어갑니다</span>;
  }

  const displayTime = minutes * 50 + seconds;
  // Render a countdown
  return <span>{displayTime}초 후 다음작품으로 넘어갑니다</span>;
};
function App() {
  //   console.log("json : ", json);
  const [nextUrl, setNextUrl] = useState<string>(filterData[0].art.url);
  const [nextQrImage, setNextQrImage] = useState<string>(
    filterData[0].artist.qr
  );
  const [nextTimer, setNextTimer] = useState<number>(
    filterData[0].timer.milliseconds
  );

  useEffect(() => {
    setTimeout(() => {
      artworkIdx++;
      if (artworkIdx > filterData.length) {
        artworkIdx = 0;
      }
      setNextUrl(filterData[artworkIdx].art.url);
      setNextQrImage(filterData[artworkIdx].artist.qr);
      setNextTimer(filterData[artworkIdx].timer.milliseconds);
    }, nextTimer + 2000);
  }, [nextUrl]);

  const crntTimer = useMemo(() => {
    return nextTimer;
  }, [nextTimer]);

  function linkArtistSite(url) {
    // console.log("linkArtistSite url : ", url);
    if (url !== "") {
      window.open(
        url,
        "_blank" // <- This is what makes it open in a new window.
      );
    }
  }

  if (!isMobile) {
    document.addEventListener("click", (e, url) => {
      //   console.log("click");
      if (!isMobile) {
        toggleFullScreen(container);
      }
    });
  }
  return (
    <>
      <Iframe
        url={nextUrl}
        allow="camera;autoplay;"
        width="100%"
        height="100%"
        id=""
        className=""
        display="block"
        position="relative"
      />
      <div className="art-desc" id="artDesc">
        {isMobile ? (
          <TableContainer component={Paper} className="desc-table-con">
            <Table sx={{ minWidth: 700 }} className="desc-table">
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="countdown"
                  style={{ padding: "10px" }}
                >
                  <Countdown
                    key={Date.now() + crntTimer}
                    date={Date.now() + crntTimer}
                    intervalDelay={0}
                    precision={3}
                    renderer={timerRenderer}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                onClick={() =>
                  linkArtistSite(filterData[artworkIdx].artist.site)
                }
              >
                <TableCell className="title" style={{ textAlign: "center" }}>
                  {filterData[artworkIdx].art.title}
                </TableCell>
                <TableCell className="name">
                  {filterData[artworkIdx].artist.name}
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>
        ) : (
          <TableContainer component={Paper} className="desc-table-con">
            <Table sx={{ minWidth: 700 }} className="desc-table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5} className="countdown">
                    <Countdown
                      key={Date.now() + crntTimer}
                      date={Date.now() + crntTimer}
                      intervalDelay={0}
                      precision={3}
                      renderer={timerRenderer}
                    />
                  </TableCell>
                </TableRow>

                {filterData[artworkIdx].art.use !== "" ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="use"
                      style={{ color: "#FBA830" }}
                    >
                      {filterData[artworkIdx].art.use}
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )}
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="title">
                    {filterData[artworkIdx].art.title}
                  </TableCell>

                  <TableCell className="name">
                    {filterData[artworkIdx].artist.name}
                  </TableCell>
                  {nextQrImage !== "" ? (
                    <TableCell className="qr">
                      <img
                        src={nextQrImage}
                        alt={filterData[artworkIdx].artist.name + " site"}
                      />
                    </TableCell>
                  ) : (
                    <></>
                  )}
                </TableRow>

                <TableRow>
                  <TableCell colSpan={5} className="desc">
                    {filterData[artworkIdx].art.desc}
                    {/* *{filterData[artworkIdx].art.git} */}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export default App;
