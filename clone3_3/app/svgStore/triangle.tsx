export const Triangle = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 20 10"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path d="M0 0 L20 0 L10 10 L0 0 Z" />
    </svg>
  );
};
