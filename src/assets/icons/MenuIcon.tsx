const MenuIcon: React.FC<{ height: string; width: string; color?: string }> = ({
  height,
  width,
  color = "#49454F",
}) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 7L4 7"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M20 12L4 12"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M20 17L4 17"
          stroke={color}
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </>
  );
};

export default MenuIcon;
