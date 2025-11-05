import Image from "next/image";
import { useGetMovieList } from "../data/movieList";
import { Popcorn } from "../svgStore/popcorn";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useEffect, useState } from "react";
import { ArrowSvg } from "./public/arrow";
import clsx from "clsx";

export const Body = () => {
  return (
    <div className="bg-black text-white pt-10">
      <div className="container flex flex-col gap-16">
        <Header />
        <MovieRanking />
        <section></section>
        <section></section>
      </div>
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
