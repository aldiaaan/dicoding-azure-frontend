import { Spinner, Box } from "@chakra-ui/react";

function DefaultFallback() {
  return (
    <Box
      position="fixed"
      inset={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <div>
        <Spinner />
      </div>
    </Box>
  );
}

export default DefaultFallback;
