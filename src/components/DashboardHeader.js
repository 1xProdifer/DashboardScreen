// Importing core React and React Native modules
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Vector icons library
import {theme} from '../styles/theme'; // Theme object for consistent colors and spacing
import {wp, hp, isTablet, getAdaptivePadding} from '../utils/responsive'; // Responsive utility functions

// DashboardHeader Component
// Displays the top header bar for the dashboard, including title, menu, notifications, and profile icon
const DashboardHeader = ({
  title = 'Dashboard', 
  subtitle, 
  showMenu = true, // Toggle menu icon visibility
  showNotifications = true, // Toggle notifications icon visibility
  onMenuPress, // Function triggered when menu icon is pressed
  onNotificationPress, // Function triggered when notification icon is pressed
  onProfilePress, // Function triggered when profile icon is pressed
}) => {
  const isTab = isTablet(); // Check if the device is a tablet for layout scaling

  return (
    <>
      {/* Configure Status Bar appearance */}
      <StatusBar
        backgroundColor={theme.colors.primary.main} // Primary theme color for Android
        barStyle="light-content" // Light text/icons for dark background
        translucent={Platform.OS === 'android'} // Transparent overlay for Android
      />

      {/* Header container */}
      <View style={[styles.container, isTab && styles.tabletContainer]}>
        {/* ------------------ LEFT SECTION ------------------ */}
        <View style={styles.leftSection}>
          {/* Menu icon button (only shown if enabled) */}
          {showMenu && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onMenuPress}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Open menu">
              <Icon
                name="menu"
                size={isTab ? 28 : 24}
                color={theme.colors.primary.contrast}
              />
            </TouchableOpacity>
          )}

          {/* Title and Subtitle container */}
          <View style={styles.titleContainer}>
            <Text style={[styles.title, isTab && styles.tabletTitle]}>
              {title}
            </Text>
            {subtitle && (
              <Text style={[styles.subtitle, isTab && styles.tabletSubtitle]}>
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* ------------------ RIGHT SECTION ------------------ */}
        <View style={styles.rightSection}>
          {/* Notifications button with badge */}
          {showNotifications && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onNotificationPress}
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="View notifications">
              <Icon
                name="notifications"
                size={isTab ? 28 : 24}
                color={theme.colors.primary.contrast}
              />
              {/* Small red badge showing notification count */}
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Profile avatar icon */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={onProfilePress}
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Open profile">
            <View style={styles.profileAvatar}>
              <Icon
                name="person"
                size={isTab ? 24 : 20}
                color={theme.colors.primary.main}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

// ------------------ STYLES ------------------
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.main,
    paddingHorizontal: getAdaptivePadding(), // Dynamic padding for responsive design
    paddingTop: Platform.OS === 'ios' ? hp('6%') : hp('4%'), // Adjust header top padding per platform
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...theme.shadows.medium, // Adds shadow for depth
  },
  tabletContainer: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: hp('4%'),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Takes available space on left
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: theme.spacing.sm,
    marginRight: theme.spacing.sm,
    position: 'relative', // Needed for notification badge positioning
  },
  titleContainer: {
    marginLeft: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.h3,
    fontWeight: 'bold',
    color: theme.colors.primary.contrast,
  },
  tabletTitle: {
    fontSize: theme.typography.h2,
  },
  subtitle: {
    fontSize: theme.typography.caption,
    color: theme.colors.primary.contrast,
    opacity: 0.8,
    marginTop: 2,
  },
  tabletSubtitle: {
    fontSize: theme.typography.body,
  },
  profileButton: {
    marginLeft: theme.spacing.sm,
  },
  profileAvatar: {
    width: isTablet() ? 44 : 40,
    height: isTablet() ? 44 : 40,
    borderRadius: isTablet() ? 22 : 20,
    backgroundColor: theme.colors.primary.contrast,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: theme.colors.accent.main,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
  },
  badgeText: {
    fontSize: 10,
    color: theme.colors.accent.contrast,
    fontWeight: 'bold',
  },
});

export default DashboardHeader;
