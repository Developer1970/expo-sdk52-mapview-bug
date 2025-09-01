import { useCallback, useRef } from "react";
import { Dimensions, View } from "react-native";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

const EARTH_RADIUS = 6371; // in KM

export default function App() {
    const mapCenter: LatLng = {
        latitude: 49.271412,
        longitude: -122.9725585
    };
    const radius = 1; // 1 KM

    // create a region center around mapCenter with a boundary with 1 KM radius
    // in either latitude or longitude direction whichever is smaller. The longer
    // axis will be larger than 1 KM depending on devices aspect ratio
    const initialRegion: Region = getRegion(mapCenter, radius);

    const mapRef = useRef<MapView>(null);

    // create markers for events with coordinates in the vicinity of the mapCenter
    // see events array at the bottom of this module.
    const markers = events.map((e, i: number) => {
        return <Marker coordinate={{ latitude: e.lat, longitude: e.long }} key={i} />;
    });

    const handleMapReady = useCallback(() => {
        setTimeout(() => {
            console.log('Map is loaded ', mapRef.current);
            mapRef.current?.animateCamera({ center: mapCenter }, { duration: 150 });
        }, 500);
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={initialRegion}
                ref={mapRef}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsScale={true}
                onMapReady={handleMapReady}
                style={{
                    width: "99%",
                    height: "99%",
                    borderWidth: 1,
                }}
            >
                {markers}
            </MapView>
        </View>
    );
}

/**
 * This code sets the map region such that distance from center along the shortest axis 
 * of display is equal radius
 * 
 * @param currentLocation   center of the map
 * @param radius            minium radius from center
 * @returns                 initial map region
 */
function getRegion(currentLocation: LatLng, radius: number): Region {
    const aspect = getAspectRatio();

    /**
     * if aspect ration (i.e., width/height of device) is larger than 1, then latitude span is 
     * smaller than longitude span of the map. Thus distance along latitude is set to radius, 
     * and latitude delta angel is obtained accordingly
     **/
    const latDistance = (aspect > 1 ? radius : radius / aspect) * 2;
    const latDelta = (latDistance / EARTH_RADIUS / Math.PI) * 180;

    // same logic as above is applied to longitude axis
    const longDistance = ((aspect < 1 ? radius : radius / aspect)) * 2;
    const longDelta = longDistance / EARTH_RADIUS / Math.PI * 180;

    return {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
    };
}

/**
 * Aspect as reported by React Native framework
 * 
 * @returns device's aspect ratio
 */
export function getAspectRatio(): number {
    const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("screen");
    return SCREEN_WIDTH / SCREEN_HEIGHT;
}


const events = [
    {
        "sessions": [
            {
                "recurrence": [

                ],
                "startDateTime": "2025-01-01T03:00:00Z",
                "id": 1374,
                "endDateTime": "2025-01-01T05:00:00Z"
            },
            {
                "recurrence": [

                ],
                "startDateTime": "2025-01-01T05:00:00Z",
                "id": 1375,
                "endDateTime": "2025-01-01T07:00:00Z"
            }
        ],
        "address": "6083 McKay Avenue, Burnaby, BC, V5H 2W7, Canada",
        "externalLink": "https://is.gd/WBijf7",
        "displayName": "Hilton_Vancouver_Metrotown",
        "bookmarked": 0,
        "description": "New Year's Eve 2025 Glitz & Glamour Dinner and Dance Party\n\nMain act: Glitz & Glamour New Year's Eve Gala\n\nOpening acts: \nNew Years Eve\n\nStart counting down to 2025 at the NYE Glitz & Glamour Dinner & Dance, presented by Melo Productions. On December 31st, Vancouvers top DJs are spinning the best in Top 40, Funk, R&B, Latin, Old School, Caribbean and Afrobeat on three different dance floors at the Hilton Vancouver Metrotown. In the luxurious Crystal Ballroom, start celebrating the New Year with an extravagant buffet dinner catered by the Hilton's Executive Chef, and be serenaded by Dinner Band Rossi Music. Then, DJ Alibaba and Earl da Pearl will keep the party going all night long into 2025! Get your groove on in the Time & Place Lounge and dance to Salsa, Bachata, Cuban & Latin rhythms by Latin DJ Kemo and DJ Daddy Mikey. Si, muy calient In the Waterford Ballroom, show off your wild, sassy and sexy moves to the best Top 40, Afrobeat, Caribbean, Reggae & Soca vibes with DJ Arems and DJ Hoppa!\n\n#miscellaneous #ticketmaster",
        "ownerId": 2632,
        "title": "New Year's Eve 2025 Glitz & Glamour...",
        "friendEvent": 0,
        "long": -123.004795,
        "attending": 0,
        "id": 1179,
        "lat": 49.228676,
        "timeCaptured": "2024-10-31T12:00:13Z"
    },
    {
        "sessions": [
            {
                "recurrence": [

                ],
                "startDateTime": "2024-11-27T03:00:00Z",
                "id": 1272,
                "endDateTime": "2024-11-27T05:00:00Z"
            }
        ],
        "address": ", Pne Grounds, Vancouver, BC, V5K3N7, Canada",
        "externalLink": "https://is.gd/0YmqdR",
        "displayName": "PNE_Forum",
        "bookmarked": 0,
        "description": "Latto - Sugar Honey Iced Tea Tour\n\nMain act: Latto\n\nOpening acts: \nMariah the Scientist\n\n\nKARRAHBOOO\nspotify: https://is.gd/QkmE0T\n\n#music #hiphop_rap #hiphop #rap #french_rap #french #rap #urban #rnb #ticketmaster",
        "ownerId": 2499,
        "title": "Latto - Sugar Honey Iced Tea Tou",
        "friendEvent": 0,
        "long": -123.0440748,
        "attending": 0,
        "id": 1122,
        "lat": 49.288227,
        "timeCaptured": "2024-10-31T12:00:12Z"
    },
    {
        "sessions": [
            {
                "recurrence": [

                ],
                "startDateTime": "2025-01-21T03:00:00Z",
                "id": 1273,
                "endDateTime": "2025-01-21T05:00:00Z"
            }
        ],
        "address": ", Pne Grounds, Vancouver, BC, V5K3N7, Canada",
        "externalLink": "https://is.gd/LlIvMF",
        "displayName": "PNE_Forum",
        "bookmarked": 0,
        "description": "Jamie XX\n\nAbout: Jamie XX\nyoutube: https://is.gd/emgeGe\nspotify: https://is.gd/rDcd0D\ninstagram: https://is.gd/aad1DZ\nhomepage: https://is.gd/lK1eMT\n\n#music #dance_electronic #dance #electronic #witchstep #club_dance #club #dance #ticketmaster",
        "ownerId": 2499,
        "title": "Jamie XX",
        "friendEvent": 0,
        "long": -123.0440748,
        "attending": 0,
        "id": 1123,
        "lat": 49.288227,
        "timeCaptured": "2024-10-31T12:00:13Z"
    },
    {
        "sessions": [
            {
                "recurrence": [

                ],
                "startDateTime": "2025-01-26T03:00:00Z",
                "id": 1766,
                "endDateTime": "2025-01-26T05:00:00Z"
            }
        ],
        "address": ", Pne Grounds, Vancouver, BC, V5K3N7, Canada",
        "externalLink": "https://is.gd/FbG4xI",
        "displayName": "PNE_Forum",
        "bookmarked": 0,
        "description": "Dr. Fresch w/ special guest Tape B\n\nMain act: Dr. Fresch\ninstagram: https://is.gd/h7M6mL\n\nOpening acts: \nTape B\n\n#music #dance_electronic #dance #electronic #witchstep #club_dance #club #dance #ticketmaster",
        "ownerId": 2499,
        "title": "Dr. Fresch w/ special guest Tape",
        "friendEvent": 0,
        "long": -123.0440748,
        "attending": 0,
        "id": 1419,
        "lat": 49.288227,
        "timeCaptured": "2024-11-15T12:00:14Z"
    },
    {
        "sessions": [
            {
                "recurrence": [
                ],
                "startDateTime": "2025-02-09T04:00:00Z",
                "id": 1767,
                "endDateTime": "2025-02-09T06:00:00Z"
            }
        ],
        "address": ", Pne Grounds, Vancouver, BC, V5K3N7, Canada",
        "externalLink": "https://is.gd/J7ZGih",
        "displayName": "PNE_Forum",
        "bookmarked": 0,
        "description": "Knock2: nolimit TOUR\n\n\n#music #dance_electronic #dance #electronic #witchstep #ticketmaster",
        "ownerId": 2499,
        "title": "Knock2: nolimit TOUR",
        "friendEvent": 0,
        "long": -123.0440748,
        "attending": 0,
        "id": 1420,
        "lat": 49.288227,
        "timeCaptured": "2024-11-15T12:00:15Z"
    },
    {
        "sessions": [
            {
                "recurrence": [
                ],
                "startDateTime": "2024-12-09T04:00:00Z",
                "id": 1507,
                "endDateTime": "2024-12-09T06:00:00Z"
            }
        ],
        "address": "1882 Adanac Street, Vancouver, BC, V5L 2E5, Canada",
        "externalLink": "https://is.gd/VxGxTO",
        "displayName": "The_Wise_Hall",
        "bookmarked": 0,
        "description": "Allegra Krieger with Special Guests\n\n\nLegal Age 19+ (Valid Photo I.D. Required)MODO-LIVE, I am the Eggplant, Programme present...Allegra Kriegerw/ Special Guests Sunday December 8th, 2024Wise HallVancouver, BC\n\n#music #pop #singersongwriter #rock #ticketmaster",
        "ownerId": 2471,
        "title": "Allegra Krieger with Special Gue",
        "friendEvent": 0,
        "long": -123.06607099999998,
        "attending": 0,
        "id": 1268,
        "lat": 49.277269,
        "timeCaptured": "2024-11-02T12:00:12Z"
    },
    {
        "sessions": [
            {
                "recurrence": [
                ],
                "startDateTime": "2025-01-16T04:00:00Z",
                "id": 1508,
                "endDateTime": "2025-01-16T06:00:00Z"
            }
        ],
        "address": "1882 Adanac Street, Vancouver, BC, V5L 2E5, Canada",
        "externalLink": "https://is.gd/j1TLCv",
        "displayName": "The_Wise_Hall",
        "bookmarked": 0,
        "description": "Legal Age 19+ (Valid Photo I.D. Required)MODO-LIVE, Programme present...Olive Klugw/ Moselle Wednesday January 15th, 2025Wise HallVancouver, BC\nNOTE: image(s) are stock images. For real images click on the top link in the description\n#music #folk #ticketmaster",
        "ownerId": 2471,
        "title": "Olive Klug with Moselle",
        "friendEvent": 0,
        "long": -123.06607099999998,
        "attending": 0,
        "id": 1269,
        "lat": 49.277269,
        "timeCaptured": "2024-11-02T12:00:13Z"
    },
    {
        "sessions": [
            {
                "recurrence": [
                    {
                        "period": null,
                        "dayOfWeek": null,
                        "dayOfMonth": null,
                        "startTime": null,
                        "endTime": null,
                        "recurrenceType": null
                    }
                ],
                "startDateTime": "2024-11-23T17:00:00Z",
                "id": 1787,
                "endDateTime": "2024-11-23T19:00:00Z"
            }
        ],
        "address": "777 Pacific Blvd., Vancouver, BC, V6B 4Y8, Canada",
        "externalLink": "https://is.gd/qpB6lb",
        "displayName": "BC_Place",
        "bookmarked": 0,
        "description": "BC School Sports 2024 Football Championship Semi Finals\n\n\nNovember 23rd - Semi Finals Doors - 8:00am First Game - 9:00am\n\n#sports #football #high_school #high #school #ticketmaster",
        "ownerId": 2490,
        "title": "BC School Sports 2024 Football Championship...",
        "friendEvent": 0,
        "long": -123.1127117,
        "attending": 0,
        "id": 1437,
        "lat": 49.2760688,
        "timeCaptured": "2024-11-19T12:00:09Z"
    },
    {
        "sessions": [
            {
                "recurrence": [
                    {
                        "period": null,
                        "dayOfWeek": null,
                        "dayOfMonth": null,
                        "startTime": null,
                        "endTime": null,
                        "recurrenceType": null
                    }
                ],
                "startDateTime": "2024-12-07T03:00:00Z",
                "id": 501,
                "endDateTime": "2024-12-07T05:00:00Z"
            },
            {
                "recurrence": [
                    {
                        "period": null,
                        "dayOfWeek": null,
                        "dayOfMonth": null,
                        "startTime": null,
                        "endTime": null,
                        "recurrenceType": null
                    }
                ],
                "startDateTime": "2024-12-08T03:00:00Z",
                "id": 502,
                "endDateTime": "2024-12-08T05:00:00Z"
            },
            {
                "recurrence": [
                    {
                        "period": null,
                        "dayOfWeek": null,
                        "dayOfMonth": null,
                        "startTime": null,
                        "endTime": null,
                        "recurrenceType": null
                    }
                ],
                "startDateTime": "2024-12-09T03:00:00Z",
                "id": 503,
                "endDateTime": "2024-12-09T05:00:00Z"
            }
        ],
        "address": "777 Pacific Blvd., Vancouver, BC, V6B 4Y8, Canada",
        "externalLink": "https://is.gd/OmdLoV",
        "displayName": "BC_Place",
        "bookmarked": 0,
        "description": "This is a Ticketmaster event\nTaylor Swift | The Eras Tour\n\nMain act: Taylor Swift\nyoutube: https://is.gd/dOr4BK\nwiki: https://is.gd/VQnXnx\ninstagram: https://is.gd/Xfr0Gv\nhomepage: https://is.gd/lIw7di\n\nOpening acts: \nGracie Abrams\nspotify: https://is.gd/wIT9bi\ninstagram: https://is.gd/GFTcBD\n\n#music #pop #rock",
        "ownerId": 2490,
        "title": "Taylor Swift | The Eras Tour",
        "friendEvent": 0,
        "long": -123.1127117,
        "attending": 0,
        "id": 510,
        "lat": 49.2760688,
        "timeCaptured": "2024-06-18T08:37:58Z"
    },
    {
        "sessions": [
            {
                "recurrence": [
                ],
                "startDateTime": "2024-12-07T03:00:00Z",
                "id": 820,
                "endDateTime": "2024-12-07T05:00:00Z"
            },
            {
                "recurrence": [
                ],
                "startDateTime": "2024-12-08T03:00:00Z",
                "id": 821,
                "endDateTime": "2024-12-08T05:00:00Z"
            },
            {
                "recurrence": [
                ],
                "startDateTime": "2024-12-09T03:00:00Z",
                "id": 822,
                "endDateTime": "2024-12-09T05:00:00Z"
            }
        ],
        "address": "777 Pacific Blvd., Vancouver, BC, V6B 4Y8, Canada",
        "externalLink": "https://is.gd/OmdLoV",
        "displayName": "BC_Place",
        "bookmarked": 0,
        "description": "Taylor Swift | The Eras Tour\n\nMain act: Taylor Swift\nyoutube: https://is.gd/dOr4BK\nwiki: https://is.gd/VQnXnx\ninstagram: https://is.gd/Xfr0Gv\nhomepage: https://is.gd/lIw7di\n\nOpening acts: \nGracie Abrams\nspotify: https://is.gd/wIT9bi\ninstagram: https://is.gd/GFTcBD\n\n#music #pop #rock #ticketmaster",
        "ownerId": 2490,
        "title": "Taylor Swift | The Eras Tour",
        "friendEvent": 0,
        "long": -123.1127117,
        "attending": 0,
        "id": 732,
        "lat": 49.2760688,
        "timeCaptured": "2024-06-23T04:25:16Z"
    },
    {
        "sessions": [
            {
                "recurrence": [

                ],
                "startDateTime": "2025-02-08T21:00:00Z",
                "id": 1232,
                "endDateTime": "2025-02-08T23:00:00Z"
            }
        ],
        "address": "777 Pacific Blvd., Vancouver, BC, V6B 4Y8, Canada",
        "externalLink": "https://is.gd/qsNcKN",
        "displayName": "BC_Place",
        "bookmarked": 0,
        "description": "INVICTUS GAMES Vancouver Whistler 2025 - Opening Ceremony \n\nMain act: Invictus Games\n\nOpening acts: \nNoah Kahan\nyoutube: https://is.gd/ZOHs9W\nspotify: https://is.gd/yz8yBW\ninstagram: https://is.gd/m1n8lo\nhomepage: https://is.gd/fhDHcA\n\n\nNelly Furtado\n\n#sports #miscellaneous #music #rock #pop #alternative_rock #alternative #rock #ticketmaster",
        "ownerId": 2490,
        "title": "INVICTUS GAMES Vancouver Whistler...",
        "friendEvent": 0,
        "long": -123.1127117,
        "attending": 0,
        "id": 1091,
        "lat": 49.2760688,
        "timeCaptured": "2024-10-31T12:00:13Z"
    }
]