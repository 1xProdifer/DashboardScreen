// Imports React Native utilities for screen measurement and pixel handling
import {Dimensions, PixelRatio, Platform} from 'react-native';

// ---------------------- SCREEN CONFIGURATION ----------------------

// Get initial screen dimensions (width & height)
let screenData = Dimensions.get('window');

// Define responsive breakpoints for different device categories
export const breakpoints = {
  small: 350,   // Small phones
  medium: 400,  // Regular phones
  large: 500,   // Large phones
  tablet: 768,  // Tablets
  desktop: 1024 // Large tablets or desktop screens
};

// ---------------------- DEVICE TYPE DETECTION ----------------------

// Determine device type based on screen width
export const getDeviceType = () => {
  const {width} = screenData;
  if (width < breakpoints.small) return 'small';
  if (width < breakpoints.medium) return 'medium';
  if (width < breakpoints.large) return 'large';
  if (width < breakpoints.tablet) return 'tablet';
  return 'desktop';
};

// ---------------------- RESPONSIVE HELPERS ----------------------

// Convert width percentage to responsive pixels
export const wp = (percentage) => {
  const value = (percentage * screenData.width) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Convert height percentage to responsive pixels
export const hp = (percentage) => {
  const value = (percentage * screenData.height) / 100;
  return Math.round(PixelRatio.roundToNearestPixel(value));
};

// Calculate responsive font size based on device width
export const rf = (size) => {
  const scale = screenData.width / 320; // Base scaling factor
  const newSize = size * scale;
  // Apply platform-specific font adjustment
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

// ---------------------- GRID CONFIGURATION ----------------------

// Determine number of grid columns depending on device type
export const getGridColumns = () => {
  const deviceType = getDeviceType();
  switch (deviceType) {
    case 'small': return 1;
    case 'medium': return 2;
    case 'large': return 2;
    case 'tablet': return 3;
    default: return 4;
  }
};

// ---------------------- ORIENTATION HANDLING ----------------------

// Update screen data when device orientation changes
export const updateScreenData = () => {
  screenData = Dimensions.get('window');
};

// Listen for screen orientation changes and trigger callback
export const listenForOrientationChange = (callback) => {
  const subscription = Dimensions.addEventListener('change', () => {
    updateScreenData();
    callback();
  });
  return subscription;
};

// ---------------------- SPACING & TYPOGRAPHY ----------------------

// Responsive spacing units (scales with screen width)
export const spacing = {
  xs: wp('1%'),
  sm: wp('2%'),
  md: wp('4%'),
  lg: wp('6%'),
  xl: wp('8%'),
};

// Responsive font sizes
export const typography = {
  h1: rf(28),
  h2: rf(24),
  h3: rf(20),
  h4: rf(18),
  body: rf(16),
  caption: rf(14),
  small: rf(12),
};

// ---------------------- UTILITY FUNCTIONS ----------------------

// Detect if device is tablet or larger (desktop)
export const isTablet = () => {
  return getDeviceType() === 'tablet' || getDeviceType() === 'desktop';
};

// Adaptive horizontal padding based on device type
export const getAdaptivePadding = () => {
  const deviceType = getDeviceType();
  switch (deviceType) {
    case 'small': return spacing.md;
    case 'medium': return spacing.md;
    case 'large': return spacing.lg;
    default: return spacing.xl;
  }
};
