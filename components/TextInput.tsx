import React, { memo } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { TextInput as Input, Text } from 'react-native-paper';
import { theme } from '~/utils/theme';

type Props = React.ComponentProps<typeof Input> & {
  labelText?: string;
  errorText?: string;
  textColor?: string;
  inputTextColor?: string;
  customViewStyle?: StyleProp<ViewStyle>;
  customLabelTextStyle?: StyleProp<TextStyle>;
  customInputStyle?: StyleProp<TextStyle>;
  outlineStyle?: StyleProp<ViewStyle>;
};

const TextInput = ({
  labelText,
  errorText,
  textColor,
  inputTextColor,
  customViewStyle,
  customLabelTextStyle,
  customInputStyle,
  outlineStyle,
  ...props
}: Props) => (
  <View style={[styles.container, customViewStyle]}>
    <Text
      style={[
        {
          color: textColor ? textColor : theme.colors.primary,
          fontFamily: 'Poppins-Regular',
          fontSize: 16,
        },
        customLabelTextStyle,
      ]}>
      {labelText}
    </Text>
    <Input
      style={[styles.input, customInputStyle]}
      contentStyle={{
        fontFamily: 'Poppins-Medium',
        color: theme.colors.inputText,
        height: 'auto',
      }}
      textContentType="name"
      textColor={inputTextColor}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      outlineStyle={[
        {
          borderRadius: 20,
          borderColor: theme.colors.borderColor,
          // elevation: 5,
        },
        outlineStyle,
      ]}
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 12,
  },
  input: {
    marginTop: 5,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 6.25,
    height: 50,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
