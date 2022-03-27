import {Platform} from 'react-native';

export const HapticOptions = {
  enableVibrateFallback: false,
  ignoreAndroidSystemSettings: true,
};

export const HapticTriggerType = Platform.select({
  ios: 'selection',
  android: 'impactMedium',
});
