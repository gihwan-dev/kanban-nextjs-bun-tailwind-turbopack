const OvalSvg: React.FC<{
  fill: string;
}> = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
    >
      <circle
        cx="7.5"
        cy="7.5"
        r="7.5"
        fill={fill}
      />
    </svg>
  );
};

export default OvalSvg;
