import * as React from "react";
import { Radio, RadioGroup, useRadio, Box } from "@chakra-ui/react"
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="10px"

        _checked={{
          background: "#1e1e1e1a"
        }}
        _hover={{
          background: "#a4a4a41a"
        }}
        transition="0.1s all ease"
        fontSize="20px"
        p="5px 10px"
        w="fit-content"
        m="0 15px 10px 0"
      >
        {props.children}
      </Box>
    </Box>
  )
}
export default RadioCard;
