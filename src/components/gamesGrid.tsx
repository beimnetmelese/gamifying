import {
  Badge,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";

interface Platform {
  id: number;
  name: string;
}

interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platform: { platform: Platform }[];
  metacritic: number;
}

interface Props {
  errors: string;
  isGameLoading: Boolean;
  games: Game[];
}

function GamesGrid({ errors, isGameLoading, games }: Props) {
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      {errors && <Text> {errors}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
        padding="10px"
        spacing={10}
      >
        {isGameLoading &&
          skeleton.map((skel) => (
            <Card key={skel} width={300}>
              <Skeleton height={200}></Skeleton>
              <CardBody>
                <SkeletonText></SkeletonText>
              </CardBody>
            </Card>
          ))}
        {games.map((game) => (
          <Card width={300} key={game.id} borderRadius={10} overflow="hidden">
            <Image src={game.background_image} />
            <CardBody>
              <HStack justifyContent={"space-between"}>
                <Heading fontSize="1.5xl">{game.name}</Heading>
                <Badge
                  colorScheme={
                    game.metacritic > 70
                      ? "green"
                      : game.metacritic > 50
                      ? "yellow"
                      : "red"
                  }
                  fontSize="14px"
                >
                  {game.metacritic}
                </Badge>
              </HStack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </>
  );
}

export default GamesGrid;
