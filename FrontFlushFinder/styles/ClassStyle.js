// styles.js

import { StyleSheet } from 'react-native';

const FONT_SIZES = {
  small: 10,
  medium: 20,
  large: 60,
};

const COLORS = {
  background: '#3451C6',
};

const styles = StyleSheet.create({
  textSmall: {
    fontSize: FONT_SIZES.small,
  },
  textMedium: {
    fontSize: FONT_SIZES.medium,
  },
  textLarge: {
    fontSize: FONT_SIZES.large,
  },
  background: {
    backgroundColor: COLORS.background,
  },
});

export default styles;
