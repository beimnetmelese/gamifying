import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

interface Platform {
  id: number;
  name: string;
}

interface Props {
  platforms: Platform[];
  errors: string;
  onClick: (platform: Platform) => void;
  selectedPlatform: Platform | null;
}

function PlatformLIst({ platforms, errors, selectedPlatform, onClick }: Props) {
  return (
    <>
      {errors && <Text> {errors}</Text>}
      <Menu>
        <MenuButton width={"226px"} as={Button} rightIcon={<ChevronDownIcon />}>
          {selectedPlatform === null ? "Platform" : selectedPlatform?.name}
        </MenuButton>
        <MenuList>
          {platforms.map((platform) => (
            <MenuItem key={platform.id} onClick={() => onClick(platform)}>
              <Box>{platform.name}</Box>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
}

export default PlatformLIst;
