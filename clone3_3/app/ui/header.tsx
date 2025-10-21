import clsx from "clsx";
import { NetflexLogo } from "../svgStore/neflexLogo";

export const Header = () => {
  return (
    <header className={clsx("relative w-full h-[800px] pt-10")}>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <img
          className="w-full h-full"
          src={"/bgTop.jpg"}
          style={{ objectFit: "cover", objectPosition: "center" }}
        ></img>
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,1), rgba(0,0,0,0.6) 10rem)",
          }}
        ></div>
      </div>
      <div className="relative z-1">
        <div>
          <span className="inline-block w-30 aspect-[111/30] text-logo cursor-pointer">
            <NetflexLogo />
          </span>
          <button>로그인</button>
        </div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};
