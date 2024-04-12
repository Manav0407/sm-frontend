import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Toggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      m={0}
      p={0}
      colorScheme={""}
      onClick={() => {
        toggleColorMode();
        localStorage.setItem("colorMode", colorMode);
      }}
      w={"full"}
    >
      {colorMode === "dark" ? (
        <SunIcon color={"orange.200"} />
      ) : (
        <MoonIcon color={"blue.700"} />
      )}
    </Button>
  );
};

export default Toggle;
