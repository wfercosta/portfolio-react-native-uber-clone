import React from 'react';
import MavViewDirections from 'react-native-maps-directions';

// import { Container } from './styles';

const Directions = ({ destination, origin, onReady }) => (
    <MavViewDirections
        destination={destination}
        origin={origin}
        onReady={onReady}
        apikey="API_KEY"
        strokeWidth={3}
        strokeColor="#222"
    />
);

export default Directions;
