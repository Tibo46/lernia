import { Typography } from "@mui/material";

const CloseIcon: React.FC<{ fontSize?: string; color?: string }> = ({
  fontSize = "1rem",
  color = "#49454F",
}) => {
  return (
    <>
      <Typography sx={{ color: color, fontSize: fontSize, lineHeight: 0 }}>
        ✖
      </Typography>
    </>
  );
};

export default CloseIcon;
