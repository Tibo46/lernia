const GraphIcon: React.FC<{
  height: string;
  width: string;
  color?: string;
}> = ({ height, width, color = "#49454F" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.4443 3.6853C6.97115 3.33327 7.52766 3.03383 8.10577 2.7894C9.50868 2.19627 10.2101 1.8997 11.1051 2.49296C12 3.08623 12 4.05748 12 6V8C12 9.88561 12 10.8284 12.5858 11.4142C13.1716 12 14.1144 12 16 12H18C19.9425 12 20.9138 12 21.507 12.8949C22.1003 13.7899 21.8037 14.4913 21.2106 15.8942C20.9662 16.4723 20.6667 17.0288 20.3147 17.5557C19.2159 19.2002 17.6541 20.4819 15.8268 21.2388C13.9996 21.9957 11.9889 22.1937 10.0491 21.8078C8.10929 21.422 6.32746 20.4696 4.92894 19.0711C3.53041 17.6725 2.578 15.8907 2.19215 13.9509C1.8063 12.0111 2.00433 10.0004 2.76121 8.17316C3.51809 6.3459 4.79981 4.78412 6.4443 3.6853Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M14.5 2.31506C18.014 3.21951 20.7805 5.986 21.685 9.50002"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default GraphIcon;