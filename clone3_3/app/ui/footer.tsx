import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-20">
      <h4 className="text-center">
        질문이 있으신가요? 문의 전화:{" "}
        <Link href={"tel:/"} className="underline">
          00-XXX-XXX-0161
        </Link>{" "}
        (수신자 부담)
      </h4>
    </footer>
  );
};
