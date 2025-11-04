import Image from "next/image";
import { useGetMovieList } from "../data/movieList";
import { Popcorn } from "../svgStore/popcorn";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { ArrowSvg } from "./public/arrow";

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

  // useEffect(()=>{
  //   if(emblaApi){
  //   emblaApi.on("resize",(e)=>{e.})
  //   }
  // },[emblaApi])

  return (
    <section className="relative">
      <div className="absolute top-0 left-0 z-10 flex items-center h-full bg-black">
        <button
          className="flex justify-start items-center w-5 h-5 bg-red-400 py-3"
          onClick={() => {
            let f = emblaApi?.slidesInView()[0];
            if (f === undefined) return;
            emblaApi?.scrollTo(f - 5);
          }}
        >
          <ArrowSvg className="w-4 aspect-square rotate-180" />
        </button>
      </div>
      <div className="absolute top-0 right-0 z-10 flex items-center h-full bg-black">
        <button
          className="flex justify-end items-center w-5 h-5 bg-red-400"
          onClick={() => {
            let f = emblaApi?.slidesInView()[0];
            if (f === undefined) return;
            emblaApi?.scrollTo(f + 5);
          }}
        >
          <ArrowSvg className="w-4" />
        </button>
      </div>
      <h3 className="relative z-11 text-4xl font-bold tracking-wide pb-4">
        지금 뜨는 컨텐츠
      </h3>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex px-8 gap-10">
          {!(isFetching || isPending) &&
            data!.results.map((v, idx) => {
              if (idx > 9) return;
              return (
                <li
                  key={idx}
                  className="relative aspect-[0.6] grow-0 shrink-0 basis-[14rem] min-0 hover:scale-105 transition-transform duration-300 cursor-pointer"
                >
                  <Image
                    className="rounded-md"
                    src={`https://image.tmdb.org/t/p/w500/${v.poster_path}`}
                    alt={v.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
};
