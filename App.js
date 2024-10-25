import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './Screens/HomeScreen';
import SalesScreen from './Screens/SalesScreen';
import NewWorker from './Screens/NewWorker';
import ExpensesScreen from './Screens/ExpensesScreen';
import ProductScreen from './Screens/ProductScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';  // Ensure you have react-native-vector-icons installed

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Home':
                  iconName = 'home-outline';
                  break;
                case 'Sales':
                  iconName = 'cash-outline';
                  break;
                case 'New Worker':
                  iconName = 'person-add-outline';
                  break;
                case 'Expenses':
                  iconName = 'wallet-outline';
                  break;
                case 'Products':
                  iconName = 'pricetag-outline';
                  break;
                default:
                  iconName = 'help-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#0047AB',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              display: 'flex',
            },
            headerShown: false, // Optional: if you want to hide the header
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Sales" component={SalesScreen} />
          <Tab.Screen name="New Worker" component={NewWorker} />
          <Tab.Screen name="Expenses" component={ExpensesScreen} />
          <Tab.Screen name="Products" component={ProductScreen} />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
