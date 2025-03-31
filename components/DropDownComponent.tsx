import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { theme } from '~/utils/theme';

interface DropDownComponentProps {
  label?: string;
  placeholder?: string;
  data?: any[];
  value?: string | null;
  onChange?: (value: string) => void;
  onFocus?: () => void;
}

const DropdownComponent = ({ value, onChange, data }: DropDownComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data ?? []}
        search
        maxHeight={300}
        labelField="value"
        valueField="value"
        placeholder={!isFocus ? 'Select a currency' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
        }}
        onChange={(item) => onChange && onChange(item.value)}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#20232c',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: theme.colors.inputText,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: theme.colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
    tintColor: theme.colors.white,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
