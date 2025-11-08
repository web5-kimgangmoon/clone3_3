export const ArrowSvg = ({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) => {
  return (
    <svg
      viewBox="0 0 12 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
    >
      <path
        stroke="currentColor"
        fill="currentColor"
        d="M1 2 L2 1 L11 12 L2 23 L1 22 L9 12 L1 2 Z"
      ></path>
    </svg>
  );
};

// export const ArrowSvg = ({ className }: { className?: string }) => {
//   return (
//     <svg
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//       className={className}
//     >
//       <path
//         stroke="currentColor"
//         fill="currentColor"
//         d="M2 0 L10 10 L2 22 L4 22 L12 10 L4 0 Z"
//       ></path>
//     </svg>
//   );
// };
