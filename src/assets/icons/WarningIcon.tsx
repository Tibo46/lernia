import { Typography } from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const WarningIcon: React.FC<{ fontSize?: string; color?: string }> = ({
  fontSize = "1rem",
  color = "#49454F",
}) => {
  return (
    <>
      <Typography sx={{ color: color, fontSize: fontSize, lineHeight: 0 }}>
        <PriorityHighIcon />
      </Typography>
    </>
  );
};

export default WarningIcon;
