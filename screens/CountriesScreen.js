import {
  Text,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  VStack,
  Box,
  Avatar,
  FlatList,
  ArrowForwardIcon,
  Spacer
} from "native-base";
import { TouchableOpacity } from "react-native";
import React, { useState, useEffect } from 'react';
import CountryFlag from "react-native-country-flag";

const CountriesScreen = ({navigation}) => {

  let [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = () => {
    fetch(`https://api.covid19api.com/summary`)
      .then(response => response.json())
      .then(json => setData(json))
  }

  const GotoPage = (countryName,flag) => {
    navigation.navigate('Country', {
      countryName: countryName,
      flag:flag
    });
  };


  return (
    <Box
      flex={1}
      pt="3"
      _dark={{ bg: "darkBlue.900" }}
      _light={{ bg: "#FFF" }}
      px={4}
      flex={1}
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <FlatList
        data={data.Countries}
        renderItem={({ item }) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: "gray.600",
            }}
            borderColor="coolGray.200"
            pl="2"
            pr="2"
            py="2"
          >
            <TouchableOpacity   onPress={() => GotoPage(item.Country,item.CountryCode)}
            >
              <HStack space={3} justifyContent="space-between">
                <CountryFlag isoCode={item.CountryCode} size={25} style={{
                  borderRadius: 100, height: 40, width: 40
                }} />
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.Country}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Total Confirmed: {item.TotalConfirmed}
                  </Text>
                </VStack>
                <Spacer />
                <ArrowForwardIcon size="sm" mt="0.5" color="#4B4F72" _dark={{
                  color: "#4B4F72",
                }}
                  alignSelf="center" />

              </HStack>
            </TouchableOpacity>
          </Box>
        )}
        keyExtractor={(item) => item.ID}
      />
    </Box>
  );
}

export default CountriesScreen;