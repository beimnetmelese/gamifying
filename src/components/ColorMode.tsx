import { Switch, Text, useColorMode, HStack } from "@chakra-ui/react";

function ColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <HStack>
        <Switch
          isChecked={colorMode === "dark"}
          onChange={toggleColorMode}
        ></Switch>
        <Text whiteSpace={"nowrap"}>Dark Mode</Text>
      </HStack>
    </>
  );
}

export default ColorMode;
