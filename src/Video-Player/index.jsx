import { useState, useEffect } from "react";
import { useRef } from "react";
import YodaPress from "../assets/gif/Sorted Gifs/yoda vader fix/yoda-press.mp4";
import YodaLoop from "../assets/gif/Sorted Gifs/yoda vader fix/yoda-loop.mp4";
import VaderPress from "../assets/gif/Sorted Gifs/yoda vader fix/vader-press.mp4";
import VaderLoop from "../assets/gif/Sorted Gifs/yoda vader fix/vader-loop.mp4";

export const GifData = [
  {
    thumbnail: VaderPress,
    pressedOne: VaderPress,
    waitingOne: VaderLoop,
    pressedTwo: YodaPress,
    waitingTwo: YodaLoop,
    timerOne: 2500,
    timerTwo: 1800,
    styles: {
      className: "herbAloStyles",
      variant: "SingleBox",
    },
  },
];

async function preloadImage(src) {
  // if (src === undefined) return;
  // return new Promise((resolve, reject) => {
  //   const img = new Image();
  //   img.onload = function () {
  //     resolve(img);
  //   };
  //   img.onerror = img.onabort = function () {
  //     reject(src);
  //   };
  //   img.src = src;
  //   window[src] = img;
  // });
  const res = await fetch(src);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

// async function preloadAudio(url) {
//   return new Promise((resolve, reject) => { cwq
//     const audio = new Audio();
//     audio.onload = function () {
//       resolve(audio);
//     };
//     audio.onerror = audio.onabort = function () {
//       reject(url);
//     };
//     audio.src = url;
//     window[url] = audio;
//   });
// }s
// function preloadAudio(url) {
//   var audio = new Audio();
//   // once this file loads, it will call loadedAudio()
//   // the file will be kept by the browser as cache
//   audio.addEventListener("canplaythrough", loadedAudio, true);
//   audio.src = url;
//   audio.loop = true;
//   audio.play();
//   // window[url] = audio;
// }

const VideoPlayer = () => {
  const divRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [preloadedAudio, setPreloadedAudio] = useState([]);
  const [tempAllocations, setTempAllocations] = useState({});
  const [playerBox, setPlayerBox] = useState(0);
  const [box1Ratio, setBox1Ratio] = useState(0);
  const [box2Ratio, setBox2Ratio] = useState(0);
  const lockChoice = false;
  const [tableType, setTableType] = useState("VERTICAL");
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(true);
  const [isBonusRound, setIsBonusRound] = useState(false);
  const [isFreeRound, setIsFreeRound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [isFlip, setIsFlip] = useState(false);
  const [isCoinShowing, setIsCoinShowing] = useState(true);

  console.log(tempAllocations);

  useEffect(() => {
    let isCancelled = false;
    async function effect() {
      if (isCancelled) {
        return;
      }
      const imagesPromiseList = [];
      for (const i of GifData) {
        imagesPromiseList.push(preloadImage(i.thummbnailOne));
        imagesPromiseList.push(preloadImage(i.thumbnailTwo));
        imagesPromiseList.push(preloadImage(i.pressedOne));
        imagesPromiseList.push(preloadImage(i.pressedTwo));
        imagesPromiseList.push(preloadImage(i.waitingOne));
        imagesPromiseList.push(preloadImage(i.waitingTwo));
        imagesPromiseList.push(preloadImage(i.thumbnail));
      }
      await Promise.all(imagesPromiseList);
      if (isCancelled) {
        return;
      }
      setAssetsLoaded(true);
    }
    effect();
    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    GifData.map((item) => {
      [
        "thumbnail",
        "pressedOne",
        "pressedTwo",
        "waitingOne",
        "waitingTwo",
      ].forEach((keyItem) => {
        fetch(item[keyItem])
          .then((response) => response.blob())
          .then((blob) => {
            const url = blob;
            setTempAllocations((prevAllocation) => {
              let tempAlloc = { ...prevAllocation };
              tempAlloc[keyItem] = url;
              // window[url] = url;
              return {
                ...tempAlloc,
              };
            });
          })
          .catch((error) => {
            console.error("Error fetching video:", error);
          });
      });
    });

    setIsLoading(false);
  }, []);

  const handleButton1Click = (e) => {
    // e.stopPropagation()
    setBtn1Clicked(true);
    setBtn2Clicked(false);
    setPlayerBox(1);
  };
  const handleButton2Click = () => {
    setBtn2Clicked(true);
    setBtn1Clicked(false);
    // audioPlayer("buttonclick")
    setPlayerBox(2);
  };

  const handleClick = (e) => {
    const divWidth = divRef.current.getBoundingClientRect().width;
    const halfDivWidth = divWidth / 2;
    const mouseXPos =
      window.innerWidth <= 560
        ? e.nativeEvent.offsetX * 2
        : e.nativeEvent.offsetX;
    if (mouseXPos <= halfDivWidth) {
      setWhichPart("first");
      setIsOneWaiting(false);
      handleButton1Click();
    } else {
        
      setWhichPart("second");
      setIsTwoWaiting(false);
      handleButton2Click();
    }
  };

  // Table Design Setup
  //   useEffect(() => {
  //     const tableTypeRef = ref(database, `users/table${currentTable}/tableType`);
  //     const bgColorRef = ref(
  //       database,
  //       `users/table${currentTable}/design/bgColor`
  //     );
  //     const buttonsTypeRef = ref(
  //       database,
  //       `users/table${currentTable}/design/buttonsType`
  //     );
  //     const resultTypeRef = ref(
  //       database,
  //       `users/table${currentTable}/design/resultType`
  //     );

  //     onValue(tableTypeRef, (snapshot) => {
  //       const tableType = snapshot.val();

  //       if (tableType) {
  //         setTableType(tableType);
  //       }
  //     });
  //     onValue(buttonsTypeRef, (snapshot) => {
  //       const buttonsType = snapshot.val();

  //       if (buttonsType) {
  //         setTableButtonsType(buttonsType);
  //       }
  //     });
  //     onValue(resultTypeRef, (snapshot) => {
  //       const resultType = snapshot.val();

  //       if (resultType) {
  //         setTableResultType(resultType);
  //       }
  //     });
  //     onValue(bgColorRef, (snapshot) => {
  //       const bgColorVal = snapshot.val();

  //       if (bgColorVal) {
  //         setTableBgColor(bgColorVal);
  //       }
  //     });
  //   }, [tableType, tableBgColor, tableButtonsType, tableResultType, tableType]);

  // closing of tab listener
  //   useEffect(() => {
  //     // tableAmountSet()
  //     document.addEventListener("visibilitychange", handleVisibilityChange);
  //     return () => {
  //       document.removeEventListener("visibilitychange", handleVisibilityChange);
  //       unMountCleanUp();
  //     };
  //   }, []);
  const [isOneWaiting, setIsOneWaiting] = useState(null);
  const [isTwoWaiting, setIsTwoWaiting] = useState(null);
  const [whichPart, setWhichPart] = useState("");

  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => {
        setIndex(-1);
        window[GifData[index]?.pressedOne] = undefined;
        window[GifData[index]?.pressedTwo] = undefined;
        window[GifData[index]?.waitingOne] = undefined;
        window[GifData[index]?.waitingTwo] = undefined;
        if (GifData[index]?.styles.variant === "SingleBox") {
          window[GifData[index]?.thumbnail] = undefined;
        } else {
          window[GifData[index]?.thummbnailOne] = undefined;
          window[GifData[index]?.thumbnailTwo] = undefined;
        }
        setIsFlip(true);
      }, 4500);

      return () => {
        clearTimeout(timer);
      };
    } else {
      const timerTwo = setTimeout(() => {
        setIsFlip(false);
      }, 0);

      return () => {
        clearTimeout(timerTwo);
      };
    }
  }, [isPaused]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (whichPart === "first") {
        setIsOneWaiting(true);
      }
    }, GifData[index]?.timerOne);

    return () => {
      clearTimeout(timer);
    };
  }, [isOneWaiting, whichPart]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (whichPart === "second") {
        setIsTwoWaiting(true);
      }
    }, GifData[index]?.timerTwo);

    return () => {
      clearTimeout(timer);
    };
  }, [isTwoWaiting, whichPart]);

  return isLoading ? (
    <></>
  ) : (
    <div
      className="sm:w-[500px] h-[100vh] sm:mx-auto overflow-y-scroll overflow-x-hidden scrollbar-hide mt-10"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10px",
      }}
    >
      {/* <audio ref={audioRef} preload="auto" src={TimerSound} /> */}
      {tableType === "VERTICAL" || tableType == "HORIZONTAL" ? (
        <div
          style={{
            position: "relative",
            background: isFlip && "black",
            width: "500px",
            height: "100vh",
          }}
        >
          <div>
            {/* box1 */}
            {GifData[index]?.styles?.variant === "SingleBox" ? (
              <div ref={divRef} onClick={handleClick}>
                {btn1Clicked ? (
                  isPaused ? (
                    box1Ratio > box2Ratio ? (
                      <video
                        playing={true}
                        src={URL.createObjectURL(tempAllocations.waitingOne)}
                        // width={"500px"}
                        // height={"100vh"}
                      />
                    ) : box1Ratio < box2Ratio ? (
                      <></>
                    ) : (
                      <video
                        playing={true}
                        url={URL.createObjectURL(tempAllocations?.waitingOne)}
                        // width={"500px"}
                        // height={"100vh"}
                      />
                    )
                  ) : (
                    <video
                    //   width={"500px"}
                    //   height={"100vh"}
                      playing={true}
                      loop={true}
                      // controls
                      preload={true}
                      autoPlay
                      // onEnded={handleVideoEnd}
                      src={
                        !isOneWaiting
                          ? URL.createObjectURL(tempAllocations.pressedOne)
                          : URL.createObjectURL(tempAllocations.waitingOne)
                      }
                      type="video/mp4"
                    />
                  )
                ) : // : (
                btn2Clicked ? (
                  isPaused ? (
                    box1Ratio < box2Ratio ? (
                      <video
                        playing={true}
                        loop={true}
                        src={URL.createObjectURL(tempAllocations?.waitingTwo)}
                        width={"500px"}
                        height={"100vh"}
                      />
                    ) : box1Ratio > box2Ratio ? (
                      isCoinShowing && <></>
                    ) : (
                      <video
                        playing={true}
                        src={URL.createObjectURL(tempAllocations?.waitingTwo)}
                        loop={true}
                        width={"500px"}
                        height={"100vh"}
                      />
                    )
                  ) : (
                    <video
                      playing={true}
                      loop={true}
                      width={"500px"}
                      height={"100vh"}
                      // controls
                      preload={true}
                      autoPlay
                      // onEnded={handleVideoEnd}
                      src={
                        !isTwoWaiting
                          ? URL.createObjectURL(tempAllocations.pressedTwo)
                          : URL.createObjectURL(tempAllocations.waitingTwo)
                      }
                      type="video/mp4"
                    />
                  )
                ) : (
                  <video
                    playing={false}
                    // url={GifData[index]?.thumbnail}
                    src={
                      tempAllocations?.thumbnail
                        ? URL.createObjectURL(tempAllocations?.thumbnail)
                        : ""
                    }
                    // style={{
                    //   width: "500px",
                    //   height: "100vh",
                    // }}
                  />
                )}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VideoPlayer;
