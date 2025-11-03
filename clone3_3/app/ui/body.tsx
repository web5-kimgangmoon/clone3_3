import { Popcorn } from "../svgStore/popcorn";

export const Body = () => {
  return (
    <div className="bg-black text-white pt-10">
      <div className="container flex flex-col gap-16">
        <Header />
        <section>
          <h3>지금 뜨는 컨텐츠</h3>
        </section>
        <section></section>
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
