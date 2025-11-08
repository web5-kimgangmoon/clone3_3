import Image from "next/image";
import { useGetMovieList } from "../data/movieList";
import { Popcorn } from "../svgStore/popcorn";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ArrowSvg } from "./public/arrow";
import clsx from "clsx";
import { MediaImage } from "../svgStore/mediaImage";
import { DownImage } from "../svgStore/downImage";
import { Telescope } from "../svgStore/telescope";
import { SmileEmoticon } from "../svgStore/smileEmoticon";

import Link from "next/link";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";

export const Body = () => {
  return (
    <div className="container flex flex-col gap-16 pt-10">
      <Header />
      <MovieRanking />
      <Introduction />
      <QnAList />
      <RegisterSection />
    </div>
  );
};

const Header = () => {
  return (
    <header className="group flex items-end hover:scale-105 transition-transform duration-450">
      <div className="scale-80">
        <Popcorn />
      </div>
      <div className="relative w-full px-10 py-4 rounded-xl">
        <div
          className="absolute top-0 left-0 w-full h-full opacity-60 group-hover:opacity-100 rounded-xl transition-opacity duration-450"
          style={{
            background:
              "linear-gradient(45deg, rgb(98 26 111), rgb(31 42 131) 80%)",
          }}
        ></div>
        <div className="relative bg-transparent flex justify-between items-center">
          <div className="">
            <h4 className="font-semibold text-lg">
              7,000원이면 만날 수 있는 넷플릭스.
            </h4>
            <span>가장 경제적인 광고형 멤버십을 이용해 보세요.</span>
          </div>
          <button className="bg-gray-600 hover:bg-gray-700 h-max px-3 py-2 rounded-md text-[1.1rem] font-semibold cursor-pointer transition-colors duration-300">
            자세히 알아보기
          </button>
        </div>
      </div>
    </header>
  );
};

const MovieRanking = () => {
  const { isFetching, isPending, data } = useGetMovieList();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    watchDrag: false,
  });
  const [slideStat, setSlideStat] = useState("start");

  // const slideStartRef = useRef<HTMLLIElement | null>(null);
  // const slideEndRef = useRef<HTMLLIElement | null>(null);

  // useEffect(() => {
  //   if (slideStartRef.current === null) return;

  //   const observer = new IntersectionObserver((e) => {
  //     if (e[0].intersectionRatio > 0.8) setSlideStat("start");
  //   });
  //   observer.observe(slideStartRef.current);
  //   return () => observer.disconnect();
  // }, [slideStartRef]);

  // useEffect(() => {
  //   if (slideEndRef.current === null) return;

  //   const observer = new IntersectionObserver((e) => {
  //     console.log("dsad");
  //     if (e[0].intersectionRatio > 0.8) setSlideStat("end");
  //   });
  //   observer.observe(slideEndRef.current);
  //   return () => observer.disconnect();
  // }, [slideEndRef]);

  useEffect(() => {
    if (emblaApi) {
      const ctlBtnFn = (e: Extract<UseEmblaCarouselType[1], Object>) => {
        if (e.slidesInView()[0] === 0) return setSlideStat("start");
        if (e.slidesInView().at(-1) === 9) return setSlideStat("end");
        return setSlideStat("medium");
      };
      emblaApi.on("resize", ctlBtnFn);
      emblaApi.on("scroll", ctlBtnFn);
      return () => {
        emblaApi.off("resize", ctlBtnFn);
        emblaApi.off("slidesChanged", ctlBtnFn);
      };
    }
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">
      <div
        className={clsx(
          "absolute top-6 left-0 z-10 flex items-center h-full bg-black pr-2 transition-transform duration-500 delay-200",
          { "-translate-x-8": slideStat === "start" }
        )}
      >
        <button
          className={
            "flex justify-center items-center px-2 py-12 bg-[rgba(255,255,255,0.1)] text-neutral-300 hover:bg-[rgba(255,255,255,0.2)] hover:text-white rounded-xl cursor-pointer"
          }
          onClick={() => {
            let f = emblaApi?.slidesInView()[0];
            if (f === undefined) return;
            emblaApi?.scrollTo(f - 5);
          }}
        >
          <ArrowSvg className="w-2 rotate-180" strokeWidth={2} />
        </button>
      </div>
      <div
        className={clsx(
          "absolute top-6 right-0 z-10 flex items-center h-full bg-black pl-2 transition-transform duration-500 delay-200",
          { "translate-x-8": slideStat === "end" }
        )}
      >
        <button
          className="flex justify-center items-center px-2 py-12 bg-[rgba(255,255,255,0.1)] text-neutral-300 hover:bg-[rgba(255,255,255,0.2)] hover:text-white rounded-xl cursor-pointer"
          onClick={() => {
            let f = emblaApi?.slidesInView()[0];
            if (f === undefined) return;
            emblaApi?.scrollTo(f + 5);
          }}
        >
          <ArrowSvg className="w-2" strokeWidth={2} />
        </button>
      </div>
      <h3 className="relative z-11 text-4xl font-bold tracking-wide pb-4">
        지금 뜨는 컨텐츠
      </h3>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex px-8 py-4 gap-10">
          {!(isFetching || isPending) &&
            data!.results.map((v, idx) => {
              if (idx > 9) return;
              return (
                <li
                  key={idx}
                  className="relative aspect-[0.7] grow-0 shrink-0 basis-[13rem] min-0 hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    className="rounded-md"
                    src={`https://image.tmdb.org/t/p/w500/${v.poster_path}`}
                    alt={v.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  <strong
                    data-content={`${idx + 1}`}
                    className={clsx(
                      "absolute z-9 -left-4 -bottom-5 text-[8.5rem] text-black",
                      "before:absolute before:top-0 before:left-0 before:z-10 before:w-full before:h-full before:text-[8.5rem] before:text-black before:content-[attr(data-content)] fillWord"
                    )}
                    style={{ WebkitTextStroke: "0.25rem rgba(255,255,255,1)" }}
                  >
                    {idx + 1}
                  </strong>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};

export const Introduction = () => {
  const cardListData = [
    {
      title: "TV로 즐기세요",
      content:
        "스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이 플레이어 등 다양한 디바이스에서 시청하세요.",
      imageComponent: <MediaImage />,
    },
    {
      title: "즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요",
      content: "간편하게 저장하고 빈틈없이 즐겨보세요.",
      imageComponent: <DownImage />,
    },
    {
      title: "다양한 디바이스로 시청하세요",
      content:
        "각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로 스트리밍하세요.",
      imageComponent: <Telescope />,
    },
    {
      title: "어린이 전용 프로필을 만들어 보세요",
      content:
        "자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.",
      imageComponent: <SmileEmoticon />,
    },
  ];
  return (
    <section className="">
      <h2 className="relative z-11 text-4xl font-bold tracking-wide pb-4">
        가입해야 하는 또 다른 이유
      </h2>
      <ul className="grid grid-rows-1 grid-cols-4 w-full h-90 gap-4">
        {cardListData.map((v, idx) => (
          <IntroCardLi {...v} key={idx} />
        ))}
      </ul>
    </section>
  );
};

export const IntroCardLi = ({
  title,
  content,
  imageComponent,
}: {
  title: string;
  content: string;
  imageComponent: React.ReactNode;
}) => {
  return (
    <li
      className={clsx(
        "relative rounded-3xl overflow-hidden px-6 pt-8 pb-6",
        "before:content-[''] before:block before:bg-[linear-gradient(-45deg,rgba(98,26,111,0.8),rgba(31,42,131,0.9)100%)] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:opacity-55"
      )}
    >
      <div className="relative z-1 h-full">
        <h3 className="text-2xl font-semibold pb-6 break-keep">{title}</h3>
        <p className="font-semibold tracking-wide break-keep text-neutral-400">
          {content}
        </p>
        <div className="absolute bottom-0 right-0">{imageComponent}</div>
      </div>
    </li>
  );
};

const QnAList = () => {
  const disclosureListData = [
    {
      title: "넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?",
      content: (
        <>
          <p>
            넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을
            수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다.
            마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하실 수 있습니다.
          </p>
          <br />
          <p className="underline">
            <Link href={"/"}>넷플릭스 콘텐츠를 한번 살펴보세요.</Link>
          </p>
        </>
      ),
    },
    {
      title: "넷플릭스란 무엇인가요?",
      content: (
        <>
          <p>
            넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션,
            다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의
            디바이스에서 시청할 수 있는 스트리밍 서비스입니다.
          </p>
          <br />
          <p>
            저렴한 월 요금으로 원하는 시간에 원하는 만큼 즐길 수 있습니다.
            무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가
            제공됩니다.
          </p>
        </>
      ),
    },
    {
      title: "넷플릭스 요금은 얼마인가요?",
      content: (
        <p>
          스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한
          디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 멤버십 요금은
          월 7,000원부터 17,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.
        </p>
      ),
    },
    {
      title: "어디에서 시청할 수 있나요?",
      content: (
        <>
          <p>
            언제 어디서나 시청할 수 있습니다. 넷플릭스 계정으로 로그인하면
            PC에서 netflix.com을 통해 바로 시청할 수 있으며, 인터넷이 연결되어
            있고 넷플릭스 앱을 지원하는 디바이스(스마트 TV, 스마트폰, 태블릿,
            스트리밍 미디어 플레이어, 게임 콘솔 등)에서도 언제든지 시청할 수
            있습니다.
          </p>
          <br />
          <p>
            iOS 또는 Android용 앱에서는 좋아하는 시리즈를 저장할 수도 있습니다.
            저장 기능을 이용해 이동 중이나 인터넷에 연결할 수 없는 곳에서도
            시청하세요. 넷플릭스는 어디서든 함께니까요.
          </p>
        </>
      ),
    },
    {
      title: "멤버십을 해제하려면 어떻게 하나요?",
      content: (
        <p>
          넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도 없으니까요.
          멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다. 해지
          수수료도 없으니 원할 때 언제든 계정을 시작하거나 종료하세요.
        </p>
      ),
    },
    {
      title: "아이들이 넷플릭스를 봐도 좋을까요?",
      content: (
        <>
          <p>
            멤버십에 넷플릭스 키즈 환경이 포함되어 있어 자녀가 자기만의 공간에서
            가족용 시리즈와 영화를 즐기는 동안 부모가 이를 관리할 수 있습니다.
          </p>
          <br />
          <p>
            키즈 프로필과 더불어 PIN 번호를 이용한 자녀 보호 기능도 있어, 자녀가
            시청할 수 있는 콘텐츠의 관람등급을 제한하고 자녀의 시청을 원치 않는
            특정 작품을 차단할 수도 있습니다.
          </p>
        </>
      ),
    },
  ];
  return (
    <section>
      <h3 className="relative z-11 text-4xl font-bold tracking-wide pb-4">
        자주 묻는 질문
      </h3>
      <DisclosureGroup dataList={disclosureListData} />
    </section>
  );
};

const DisclosureGroup = ({
  dataList,
}: {
  dataList: { title: string; content: React.ReactNode }[];
}) => {
  const [openIdx, setOpenIdx] = useState(-1);
  const checkState = useCallback(
    (idx: number) => {
      console.log(`idx=${idx}, current=${openIdx}`);
      if (openIdx === -1) return "close";
      if (idx !== openIdx) return "closeN";
      return "open";
    },
    [openIdx]
  );
  return (
    <div className={"flex flex-col gap-2 overflow-hidden"}>
      {dataList.map((v, idx) => (
        <PopoverItem
          {...v}
          key={idx}
          idx={idx}
          state={checkState(idx)}
          setState={setOpenIdx}
        />
      ))}
    </div>
  );
};

const PopoverItem = ({
  title,
  content,
  idx,
  state,
  setState,
}: {
  title: string;
  content: React.ReactNode;
  idx: number;
  state: "open" | "close" | "closeN";
  setState: (n: number) => void;
}) => {
  return (
    <div className={"break-keep"}>
      <button
        className={clsx(
          "relative z-5 flex justify-between items-center w-full bg-stone-700 p-6 transition-colors transition-200 hover:bg-stone-600 cursor-pointer outline-none",
          "text-2xl font-medium"
        )}
        onClick={() => {
          if (state === "open") return setState(-1);
          setState(idx);
        }}
      >
        <h3>{title}</h3>
        <span className="block w-9 aspect-square">
          {state === "open" ? <XMarkIcon /> : <PlusIcon />}
        </span>
      </button>
      <motion.div
        onClick={(e) => e.preventDefault()}
        className={clsx(
          "overflow-hidden border-t-[1.5px] border-t-black bg-stone-700 w-full h-max",
          "text-2xl font-medium"
        )}
        initial={{
          maxHeight: 0,
          transition: { duration: 0.3, ease: "easeInOut" },
        }}
        animate={{
          maxHeight: state === "open" ? 400 : 0,
          transition:
            state === "closeN"
              ? { duration: 0, ease: "easeInOut" }
              : { duration: 0.3, ease: "easeInOut" },
        }}
      >
        <div className="p-6">{content}</div>
      </motion.div>
    </div>
  );
};

const RegisterSection = () => {
  const inputId = useId();
  const [email, setEmail] = useState<string>("");

  return (
    <section className="mx-auto">
      <h4 className="text-center font-semibold pb-2">
        시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를
        입력하세요.
      </h4>
      <div className="flex items-center gap-1 w-auto h-16">
        <div className="relative w-150 h-full">
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
                email !== "" && "-translate-y-3 -translate-x-[0.6rem] scale-75"
              )}
              htmlFor={inputId}
            >
              이메일 주소
            </label>
          </div>
        </div>
        <button className="flex justify-center items-center gap-4 bg-red-600 text-center w-40 h-13 text-[1.5rem] font-semibold rounded-md">
          <span>시작하기</span>
          <ArrowSvg className="w-2" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
};
// <PopoverPanel
//   transition
//   className={clsx(
//     "overflow-hidden border-t-[1.5px] border-t-black bg-stone-700 w-full p-6 max-h-[300px]",
//     "text-2xl font-medium",
//     "data-closed:max-h-0 transition-[max-height] duration-200 ease-linear"
//   )}
// >
//   {content}
// </PopoverPanel>
