import { Box, styled } from "@mui/material";
import PaginationTable from "./PaginationTable";
import SimpleTable from "./SimpleTable";
import {Breadcrumb, SimpleCard} from "../../../components";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>

      <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard>

      <SimpleCard title="Pagination Table">
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
