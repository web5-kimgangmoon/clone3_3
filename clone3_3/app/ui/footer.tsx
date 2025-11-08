import Link from "next/link";
import { ArrowSvg } from "./public/arrow";
import { useId, useState } from "react";
import clsx from "clsx";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Triangle } from "../svgStore/triangle";
import { LanguageSmall } from "../svgStore/languageSmall";

export const Footer = () => {
  return (
    <footer className="flex flex-col gap-10 container pt-20 pb-40 text-neutral-300">
      <h4 className="text-left text-center pl-[0.15rem]">
        질문이 있으신가요? 문의 전화:
        <Link href={"tel:/"} className="underline">
          00-XXX-XXX-0161
        </Link>
        (수신자 부담)
      </h4>
      <LinkList />
      <LanguageSelectBtn />
      <h4 className="text-[0.9rem] pl-[0.15rem]">XXXX 대한민국</h4>
      <p className="text-[0.8rem] leading-5">
        XXXX서비시스코리아 XX회사 통신판매업신고번호: 제2018-XXXX-XXXX호
        전화번호: XX-XXX-XXX-XXXX (수신자 부담)
        <br />
        대표: XXXX X XXX
        <br />
        이메일 주소: XXXXX@XXXXXXX.com
        <br />
        주소: 대한민국 서울특별시 XX구 XXXX XX, XXXXXX X동 XX층 우편번호 XXXXX
        <br />
        사업자등록번호: XXX-XX-XXXXX
        <br />
        클라우드 호스팅: XXXXXX XXX XXXXXXX XXX.
        <br />
        <Link className="underline" href={"/"}>
          공정거래위원회 웹사이트
        </Link>
      </p>
      <h4 className="text-[0.9rem] text-neutral-400">
        이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 로봇이 아님을
        확인합니다.
        <Link href={"/"} className="text-blue-400 underline">
          자세히 알아보기.
        </Link>
      </h4>
    </footer>
  );
};

const LinkList = () => {
  const dataList = [
    ["자주 묻는 질문", "/"],
    ["고객 센터", "/"],
    ["계정", "/"],
    ["미디어 센터", "/"],
    ["투자 정보(IR)", "/"],
    ["입사 정보", "/"],
    ["넷플릭스 지원 디바이스", "/"],
    ["이용 약관", "/"],
    ["개인정보 처리방침", "/"],
    ["쿠키 설정", "/"],
    ["회사 정보", "/"],
    ["문의하기", "/"],
    ["속도 테스트", "/"],
    ["법적 고지", "/"],
    ["오직 넷플릭스에서", "/"],
  ];
  return (
    <ul className="grid grid-rows-4 grid-cols-4 underline gap-y-2 text-[0.9rem] pl-[0.15rem]">
      {dataList.map((v, idx) => (
        <li key={idx} className="">
          <Link href={v[1]}>{v[0]}</Link>
        </li>
      ))}
    </ul>
  );
};

const LanguageSelectBtn = () => {
  const [language, setLanguage] = useState("korean");
  const selectId = useId();
  return (
    <div className="relative z-1 w-35 h-full bg-transparent p-[0.1rem] border-transparent border-[0.15rem] focus-within:border-white rounded-md">
      <label className="absolute top-1/2 left-3 z-1 -translate-y-1/2 text-white">
        <LanguageSmall />
      </label>
      <select
        className={clsx(
          "relative flex items-center py-[0.1rem] px-8 w-full h-full noAutofill outline-none bg-black/30 text-white peer border border-neutral-500 rounded-md appearance-none text-lg"
        )}
        name="language"
        autoComplete="email"
        id={selectId}
        value={language}
        onChange={(e) => {
          setLanguage(e.currentTarget.value);
        }}
      >
        <option className="text-black bg-neutral-200 text-lg" value={"korean"}>
          한국어
        </option>
        <option className="text-black bg-neutral-200 text-lg" value={"English"}>
          English
        </option>
      </select>
      <label
        className={clsx(
          "absolute z-1 top-1/2 -translate-y-1/2 right-4.5 text-white"
        )}
        htmlFor={selectId}
      >
        <Triangle className="w-[0.6rem] h-[0.3rem]" />
      </label>
    </div>
  );
};
