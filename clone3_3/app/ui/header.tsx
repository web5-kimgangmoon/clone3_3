import { NetflexLogo } from "../svgStore/neflexLogo";

export const Header = () => {
  return (
    <header>
      <div>
        <span className="inline-block w-30 aspect-[111/30] text-logo">
          <NetflexLogo />
        </span>
      </div>
      <div></div>
      <div></div>
    </header>
  );
};
