import { StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '~/utils/theme';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#171a23',
  },
});
