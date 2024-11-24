# MapView bug in Expo SDK 52

MapView component does not render properly after upgrade to Expo SDK 52.
When the sample app (attached) runs with Expo Go, Google Map's initial region bounds are ignored although the map center seems to be correct. None of map controls render on Android. Markers are also ignored. The map is a ghost map as far as I can tell.

If I make a change to the code of the app and save it when Expo server is running, then sometimes it renders proper boundaries. But 99% of time it never renders a correct map. It never renders a correct map at the start without saving the code.

This code works "perfectly" fine under Expo SDK 51.

## Reproduction steps

1. run **npm install expo@latest** (hence it was latest 52 version).
2. run **npx expo install --fix**
3. Run Expo server using: **npx expo start**
4. Debug using Expo Go, or run Android simulator. Bug is reproducible using both



