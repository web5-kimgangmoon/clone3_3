import clsx from "clsx";
import { NetflexLogo } from "../svgStore/neflexLogo";

export const Header = () => {
  return (
    <header
      className={clsx(
        "relative w-full min-h-[888px] pt-16 aspect-[1.77778] -mt-10"
      )}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <img
          className="w-full h-full"
          src={"/bgTop.jpg"}
          style={{ objectFit: "cover", objectPosition: "center" }}
        ></img>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: clsx(
              "linear-gradient(",
              "180deg,",
              "rgba(0,0,0,1) 2%,",
              "rgba(0,0,0,0.85) 7%,",
              "rgba(0,0,0,0.825) 7.4%,",
              "rgba(0,0,0,0.8) 7.85%,",
              "rgba(0,0,0,0.775) 8.35%,",
              "rgba(0,0,0,0.75) 9.9%,",
              "rgba(0,0,0,0.725) 10.5%,",
              "rgba(0,0,0,0.7) 11.15%,",
              "rgba(0,0,0,0.675) 11.85%,",
              "rgba(0,0,0,0.65) 12.6%,",
              "rgba(0,0,0,0.625) 13.4%,",
              "rgba(0,0,0,0.6) 30%,",
              "rgba(0,0,0,0.8) 80%,",
              "rgba(0,0,0,1) 100%",
              ")"
            ),
          }}
        ></div>
      </div>
      <div className="container relative z-1">
        <div className="flex justify-between items-center">
          <span className="w-36 aspect-[111/30] text-logo cursor-pointer">
            <NetflexLogo />
          </span>
          <button className="bg-red-600 text-white text-sm font-semibold px-4 py-[0.35rem] rounded-sm">
            로그인
          </button>
        </div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};
