import { HStack } from "@chakra-ui/react";
import ColorMode from "./ColorMode";
import SearchGame from "./searchGame";

interface Props {
  onSubmit: (value: string) => void;
}

function NavBar({ onSubmit }: Props) {
  return (
    <HStack justifyContent={"space-between"}>
      <SearchGame onSubmit={onSubmit} />
      <ColorMode />
    </HStack>
  );
}

export default NavBar;
