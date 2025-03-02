import { useCurrentUser } from "../../hooks/useCurrentUser";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid2 as Grid,
  Skeleton,
  Stack,
} from "@mui/material";
import { useStats } from "../../hooks/useStats";
import DownIcon from "../../assets/icons/DownIcon";
import UpIcon from "../../assets/icons/UpIcon";
import { colors } from "../../constants";
import UsersTable from "../../components/Admin/UsersTable";

const AdminDashboard = () => {
  const { user } = useCurrentUser();
  const {
    usersStats,
    exercisesStats,
    error: statsError,
    isLoading: statsLoading,
  } = useStats();

  if (!user?.isAdmin) {
    return <div>Nope.</div>;
  }

  if (statsError) {
    return <>Error</>;
  }

  return (
    <Box
      height="100%"
      sx={{
        paddingTop: {
          xs: "50px",
          sm: "50px",
          md: "0",
        },
      }}
    >
      <Grid container={true} spacing={4} height="100%">
        <Grid
          size={{
            sm: 12,
          }}
          container={true}
          spacing={2}
          alignContent="baseline"
        >
          <Typography variant="h1" mb={2}>
            Hola {user.name}
          </Typography>
          <Grid container spacing={2} justifyContent="space-between">
            {statsLoading || !usersStats ? (
              <>
                <CardStatsLoading />
                <CardStatsLoading />
                <CardStatsLoading />
              </>
            ) : (
              <>
                <CardStats
                  title="Total No. of users"
                  value={usersStats.numberOfUsers}
                />
                <CardStats
                  title="Users active this month"
                  value={usersStats.activeThisMonth}
                  comparedValue={usersStats.activeLastMonth}
                />
                <CardStats
                  title="Users created this month"
                  value={usersStats.createdThisMonth}
                  comparedValue={usersStats.createdLastMonth}
                />
              </>
            )}
            {statsLoading || !exercisesStats ? (
              <>
                <CardStatsLoading />
                <CardStatsLoading />
                <CardStatsLoading />
              </>
            ) : (
              <>
                <CardStats
                  title="Total Completed exercises"
                  value={exercisesStats.totalCompletedExercises}
                />
                <CardStats
                  title="Total In Progress exercises"
                  value={exercisesStats?.inProgressExercises}
                />
                <CardStats
                  title="Exercises started this month"
                  value={exercisesStats.createdThisMonth}
                  comparedValue={exercisesStats.createdLastMonth}
                />
              </>
            )}
            <Grid size={12}>
              <Card
                sx={{
                  height: "100%",
                  transition: "box-shadow 0.5s ease",
                }}
              >
                <CardContent sx={{ height: "100%" }}>
                  <UsersTable />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

type VariationCalculation = {
  status: "equal" | "more" | "less";
  percentage: number;
};
const calculateVariation = (
  newValue: number,
  previousValue: number
): VariationCalculation => {
  const isMore = newValue > previousValue;
  const isEqual = newValue === previousValue;
  const status = isEqual ? "equal" : isMore ? "more" : "less";
  const percentage = isEqual
    ? 0
    : previousValue === 0
    ? 100
    : (Math.abs(newValue - previousValue) / previousValue) * 100;

  return {
    status,
    percentage,
  };
};

const CardStats = ({
  title,
  value,
  comparedValue,
}: {
  title: string;
  value: number;
  comparedValue?: number;
}) => {
  const difference =
    comparedValue !== undefined
      ? calculateVariation(value, comparedValue)
      : null;

  const diffPercentage = (diff: VariationCalculation) => {
    if (diff.status === "equal") {
      return (
        <>
          <Typography component="span" color="warning">
            <Stack direction="row" spacing={1} alignItems="center">
              <UpIcon width="30px" height="30px" color={colors.warning} />{" "}
              <Typography component="span">Same as last month</Typography>
            </Stack>
          </Typography>
        </>
      );
    }
    if (diff.status === "less") {
      return (
        <>
          <Typography component="span" color="error">
            <Stack direction="row" spacing={1} alignItems="center">
              <DownIcon width="30px" height="30px" color={colors.invalid} />{" "}
              <Typography component="span">
                -
                {Intl.NumberFormat("es-ES", {
                  style: "percent",
                  maximumFractionDigits: 2,
                }).format(diff.percentage / 100)}
                <Typography component="span" color="textPrimary">
                  compared to last month ({comparedValue})
                </Typography>
              </Typography>
            </Stack>
          </Typography>
        </>
      );
    }
    return (
      <>
        <Typography component="span" color="success">
          <Stack direction="row" spacing={1} alignItems="center">
            <UpIcon width="30px" height="30px" color={colors.valid} />{" "}
            <Typography component="span">
              +
              {Intl.NumberFormat("es-ES", {
                style: "percent",
                maximumFractionDigits: 2,
              }).format(diff.percentage / 100)}
              <Typography component="span" color="textPrimary">
                compared to last month ({comparedValue})
              </Typography>
            </Typography>
          </Stack>
        </Typography>
      </>
    );
  };

  return (
    <Grid
      size={{
        xs: 12,
        sm: 4,
      }}
    >
      <Card
        sx={{
          height: "100%",
          transition: "box-shadow 0.5s ease",
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h2" sx={{ fontSize: "1rem" }}>
            {title}
          </Typography>
          <Typography sx={{ fontSize: "2rem" }}>{value}</Typography>
          {difference && <>{diffPercentage(difference)}</>}
        </CardContent>
      </Card>
    </Grid>
  );
};

const CardStatsLoading = () => {
  return (
    <Grid
      size={{
        xs: 12,
        sm: 4,
      }}
    >
      <Card
        sx={{
          height: "100%",
          transition: "box-shadow 0.5s ease",
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          <Typography variant="h2">
            <Skeleton />
          </Typography>
          <Typography>
            <Skeleton />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default AdminDashboard;
