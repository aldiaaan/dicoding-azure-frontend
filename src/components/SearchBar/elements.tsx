import React from "react";
import { Box, chakra } from "@chakra-ui/react";

export const SearchInput = React.forwardRef<HTMLInputElement>((props, ref) => {
  return (
    <Box shadow="xs" rounded="md" width={420}>
      <Box
        bg="gray.50"
        rounded="md"
        ringWidth="medium"
        ringColor="red.300"
        overflow="hidden"
        _focusWithin={{
          bg: "white",
          shadow: "md",
        }}
        zIndex={999}
      >
        <chakra.input
          spellCheck={false}
          height="10"
          ref={ref}
          w="full"
          px="3"
          placeholder="Search book..."
          _focus={{
            outline: "none",
            bg: "white",
          }}
          bg="transparent"
          {...props}
        ></chakra.input>
      </Box>
    </Box>
  );
});
