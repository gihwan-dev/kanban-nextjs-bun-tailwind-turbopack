import React from "react";

const CheckBoxIcon: React.FC<{
  state: boolean;
}> = ({ state }) => {
  return (
    <div
      style={{
        borderRadius: "0.125rem",
        border: "1px solid rgba(130, 143, 163, 0.25)",
        background: "var(--White, #FFF)",
      }}
      className={"w-4 h-4 border"}
    >
      {state && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <rect width="16" height="16" rx="2" fill="#635FC7" />
          <path
            d="M4.27583 8.0658L7.03229 10.8223L12.0323 5.82227"
            stroke="white"
            strokeWidth="2"
          />
        </svg>
      )}
    </div>
  );
};

export default CheckBoxIcon;
