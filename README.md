# MapView bug in Expo Go

MapView component does not render anything! This was working up until last Friday, and now it is completely broken in Expo Go.
A build with EAS that is deployed to an Android device works fine with my own API key.

Currently older versions of Expo Go also do not work! 

## Reproduction steps

1. run **npm install expo@latest** (hence it was latest 52 version).
2. run **npx expo install --fix**
3. Run Expo server using: **npx expo start**
4. Debug using Expo Go



