import { Stack } from 'expo-router';
import { Container } from '~/components/Container';
import TextInput from '~/components/TextInput';
import { useEffect, useState, useTransition } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { theme } from '~/utils/theme';
import DropdownComponent from '~/components/DropDownComponent';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';

type ErrorResponse = {
  success: boolean;
  error: {
    code: number;
    info: string;
  };
};

export default function Home() {
  const [symbols, setSymbols] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  const [targetValue, setTargetValue] = useState<number>(1);
  const [inputOne, setInputOne] = useState<string>('');
  const [inputTwo, setInputTwo] = useState<string>('');

  const [conversionRate, setConversionRate] = useState<number>(0);

  useEffect(() => {
    // fetch symbols from API
    try {
      const fetchSymbols = async () => {
        const response = await fetch(
          `https://api.exchangeratesapi.io/v1/symbols?access_key=${process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY}` // Replace with your API key
        );
        const data = await response.json();
        const symbolsArray = Object.entries(data.symbols).map(([key, value]) => ({
          label: value as string,
          value: key,
        }));
        setSymbols(symbolsArray);
        ToastAndroid.showWithGravityAndOffset(
          'Symbols fetched successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
      };
      fetchSymbols();
    } catch (error: any) {
      const errorResponse = error as ErrorResponse;
      console.log(errorResponse.error.info);
      ToastAndroid.showWithGravityAndOffset(
        `Error: ${errorResponse.error.info}`,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
  }, []);

  useEffect(() => {
    // convert inputOne to inputTwo
    if (inputOne === '' || inputTwo === '') return;
    try {
      const fetchConversion = async () => {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.EXPO_PUBLIC_EXCHANGE_RATE_API_KEY_TWO}/latest/${inputOne}` // Replace with your API key
        );
        const data = await response.json();
        const conversionRate = data.conversion_rates[inputTwo];

        setConversionRate(conversionRate);
      };

      fetchConversion();
    } catch (error: any) {
      console.log(error?.message);
    }
  }, [inputOne, inputTwo, targetValue]);

  return (
    <>
      <Stack.Screen options={{ title: 'Currency Converter' }} />
      <Container>
        <TextInput
          onChangeText={(value) => {
            const parsedValue = parseFloat(value);
            setTargetValue(isNaN(parsedValue) ? 0 : parsedValue);
          }}
          value={targetValue.toString()}
          labelText="Enter Amount"
          placeholder="Enter Amount"
          keyboardType="numeric"
          errorText={targetValue === 0 ? 'Please enter a valid amount' : ''}
          textColor={theme.colors.white}
          inputTextColor={theme.colors.white}
          customInputStyle={{
            backgroundColor: theme.colors.boyScreenBackground,
            borderColor: theme.colors.boyScreenBackground,
            borderWidth: 0,
            borderRadius: 20,
            height: 50,
            paddingHorizontal: 6.25,
            marginTop: 5,
            color: theme.colors.white,
          }}
          outlineStyle={{
            borderRadius: 10,
            borderColor: theme.colors.inputText,
            backgroundColor: 'transparent',
            elevation: 0,
          }}
          customLabelTextStyle={{
            color: theme.colors.white,
            fontSize: 16,
            marginTop: 5,
            marginBottom: 5,
          }}
          placeholderTextColor={theme.colors.white}
        />
        <DropdownComponent
          value={inputOne}
          data={symbols}
          onChange={(value) => {
            setInputOne(value);
          }}
        />
        <Ionicons
          name="chevron-up"
          size={18}
          color={theme.colors.white}
          style={{
            alignSelf: 'center',
          }}
        />
        <Ionicons
          name="chevron-down"
          size={18}
          color={theme.colors.white}
          style={{
            alignSelf: 'center',
          }}
        />

        <DropdownComponent
          value={inputTwo}
          data={symbols}
          onChange={(value) => {
            setInputTwo(value);
          }}
        />

        <View style={{ marginLeft: 20 }}>
          <Text style={styles.text}>
            {targetValue && inputOne && inputTwo
              ? `${targetValue} ${inputOne} = `
              : 'Please select currencies and enter amount to convert'}
          </Text>

          {targetValue && conversionRate && inputOne && inputTwo ? (
            <Text style={styles.text2}>
              {`${(targetValue * conversionRate).toFixed(2)} ${inputTwo}`}
            </Text>
          ) : null}
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    textAlign: 'left',
  },
  text2: {
    color: theme.colors.white,
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    marginTop: 20,
    textAlign: 'left',
  },
});
