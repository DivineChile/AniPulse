import useCountdown from "../../../utils/hooks/useCountdown";
import { Flex, Text } from "@chakra-ui/react";

const CountDown = ({ releaseDate }) => {
  const { days, hours, minutes, seconds, completed } =
    useCountdown(releaseDate);

  const countDownArr = [
    {
      label: "d",
      value: days,
    },
    {
      label: "h",
      value: hours,
    },
    {
      label: "m",
      value: minutes,
    },
    {
      label: "s",
      value: seconds,
    },
  ];

  if (completed) {
    return <p>Released!</p>;
  }
  return (
    <Flex gap="20px" mt="10px">
      {countDownArr.map((unit, index) => (
        <Text
          key={unit.label}
          as="span"
          color="var(--primary-background-color)"
          p="10px"
          bg="var(--text-color)"
          borderRadius="8px"
          boxShadow="0 0 10px 0 var(--secondary-color)"
          fontSize={{
            base: "29.63px",
            md: "40px",
            lg: "65px",
            xl: "70px",
            "2xl": "90px",
          }}
          fontWeight="bold"
        >
          {unit.value || "--"}
          <Text
            as="sub"
            ms="5px"
            fontSize={{
              base: "15px",
              md: "19px",
              "2xl": "23px",
            }}
            fontWeight="light"
            color="var(--primary-background-color)"
          >
            {unit.label}
          </Text>
        </Text>
      ))}
    </Flex>
  );
};

export default CountDown;
