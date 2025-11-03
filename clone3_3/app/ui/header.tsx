import clsx from "clsx";
import { NetflexLogo } from "../svgStore/neflexLogo";
import { motion } from "motion/react";
import { useId, useState } from "react";
import { Popcorn } from "../svgStore/popcorn";

export const Header = () => {
  return (
    <header
      className={clsx(
        "relative w-full min-h-[888px] pt-16 pb-[2.5641027%] aspect-[1.95] -mt-10 overflow-visible"
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
      <Content />
      <div className="absolute top-[95%] left-0 w-full h-[8%] bg-black">
        <div
          className="w-full h-full border-t-4 border-transparent"
          style={{
            background:
              "border-box linear-gradient(90deg,rgba(0, 0, 0, 1), oklch(59.2% 0.249 0.584) 30%, oklch(66% 0.29 18.72),oklch(59.2% 0.249 0.584) 60%, rgba(0,0,0,1))",
            borderTopLeftRadius: "52% 100%",
            borderTopRightRadius: "52% 100%",
          }}
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(50% 800% at 50% -600%, oklch(0.24 0.06 253.32) 77%, rgb(0, 0, 0)), black",
              borderTopLeftRadius: "52% 100%",
              borderTopRightRadius: "52% 100%",
            }}
          ></div>
        </div>
      </div>
    </header>
  );
};

const Content = () => {
  const inputId = useId();
  const [email, setEmail] = useState<string>("");
  return (
    <div className="container relative z-1 w-full h-full">
      <div className="flex justify-between items-center">
        <span className="w-36 aspect-[111/30] text-logo cursor-pointer">
          <NetflexLogo />
        </span>
        <button className="bg-red-600 text-white text-sm font-semibold px-4 py-[0.35rem] rounded-sm">
          로그인
        </button>
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full text-white">
        <h1 className="text-[2.7rem] xl:text-[4rem] text-center font-bold xl:font-black leading-[5rem]">
          영화, 시리즈 등을
          <br className="hidden xl:inline" /> 무제한으로
        </h1>
        <h3 className="py-6 text-xl font-semibold">
          7,000원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.
        </h3>
        <h4 className="pb-4">
          시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
          입력하세요.
        </h4>
        <div className="flex items-center gap-1 w-auto h-16">
          <div className="relative w-110 h-full">
            <div className="relative z-1 w-full h-full bg-transparent p-[0.1rem] border-transparent border-[3px] focus-within:border-white rounded-md">
              <input
                className="relative pt-3 px-4 w-full h-full noAutofill outline-none bg-black/30 text-white peer border border-neutral-500 rounded-md"
                type="email"
                name="email"
                autoComplete="email"
                id={inputId}
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              ></input>
              <label
                className={clsx(
                  "absolute z-1 top-4 left-5 text-lg text-stone-400 font-semibold transition transition-150 peer-focus:-translate-y-3 peer-focus:-translate-x-[0.6rem] peer-focus:scale-75",
                  email !== "" &&
                    "-translate-y-3 -translate-x-[0.6rem] scale-75"
                )}
                htmlFor={inputId}
              >
                이메일 주소
              </label>
            </div>
          </div>

          <button className="flex justify-center items-center gap-4 bg-red-600 text-center w-40 h-13 text-[1.5rem] font-semibold rounded-md">
            <span>시작하기</span>
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 aspect-square"
            >
              <path
                stroke="currentColor"
                fill="currentColor"
                d="M2 0 L10 10 L2 22 L4 22 L12 10 L4 0 Z"
              ></path>
            </svg>
            {/* <span children=">" className="font-normal"></span> */}
          </button>
        </div>
      </div>
      <div></div>
    </div>
  );
};
