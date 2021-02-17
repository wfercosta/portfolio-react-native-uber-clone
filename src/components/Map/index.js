import React, { useEffect, useState, useRef, Fragment } from 'react';
import { View, Image } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

import config from '../../config';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {
    LocationBox,
    LocationText,
    LocationTimeBox,
    LocationTimeText,
    LocationTimeTextSmall,
    Back,
} from './styles';

Geocoder.init(config.apiKey);

export default function Map() {
    const [region, setRegion] = useState({
        latitude: -23.185708,
        longitude: -46.897806,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
    });

    const [duration, setDuration] = useState(0);
    const [destination, setDestination] = useState(null);
    const [location, setLocation] = useState(null);
    const mapViewRef = useRef();

    useEffect(() => {
        console.log('useEffect() - executed');

        Geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134,
                });

                Geocoder.from({
                    latitude,
                    longitude,
                })
                    .then((response) => {
                        const address = response.results[0].formatted_address;
                        const currentLocation = address.substring(
                            0,
                            address.indexOf(','),
                        );

                        setLocation(currentLocation);
                    })
                    .catch((error) => {
                        setLocation('Not available');
                    });
            },
            () => {},
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            },
        );
    }, []);

    const handleBack = () => {
        setDestination(null);
    };

    const handleLocationSelected = (data, { geometry }) => {
        const {
            location: { lat: latitude, lng: longitude },
        } = geometry;

        setDestination({
            latitude,
            longitude,
            title: data.structured_formatting.main_text,
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
                ref={mapViewRef}>
                {destination && (
                    <Fragment>
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={(result) => {
                                setDuration(Math.floor(result.duration));

                                mapViewRef.current.fitToCoordinates(
                                    result.coordinates,
                                    {
                                        edgePadding: {
                                            right: 50,
                                            left: 50,
                                            top: 50,
                                            bottom: 350,
                                        },
                                    },
                                );
                            }}
                        />
                        <Marker
                            coordinate={destination}
                            anchor={{ x: 0, y: 0 }}
                            image={markerImage}>
                            <LocationBox>
                                <LocationText>{destination.title}</LocationText>
                            </LocationBox>
                        </Marker>
                        <Marker coordinate={region} anchor={{ x: 0, y: 0 }}>
                            <LocationBox>
                                <LocationTimeBox>
                                    <LocationTimeText>
                                        {duration}
                                    </LocationTimeText>
                                    <LocationTimeTextSmall>
                                        MIN
                                    </LocationTimeTextSmall>
                                </LocationTimeBox>
                                <LocationText>{location}</LocationText>
                            </LocationBox>
                        </Marker>
                    </Fragment>
                )}
            </MapView>

            {destination ? (
                <Fragment>
                    <Back onPress={handleBack}>
                        <Image source={backImage} />
                    </Back>
                    <Details />
                </Fragment>
            ) : (
                <Search onLocationSelected={handleLocationSelected} />
            )}
        </View>
    );
}
