import {
  Box,
  Flex,
  SkeletonText,
  IconButton,
} from '@chakra-ui/react'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useState, useEffect } from 'react'
import { FiMenu, FiHeart, FiBell, FiClock } from 'react-icons/fi'

const center = {
  lat: -1.939826787816454,
  lng: 30.0445426438232,
};

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:`${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
    libraries: ['places'],
  })

  const [map, setMap] = useState(null)
  const [directions, setDirections] = useState(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [distanceToNextStop, setDistanceToNextStop] = useState('');
  const [durationToNextStop, setDurationToNextStop] = useState('');
  const [totalDuration, setTotalDuration] = useState('');
  const [averageSpeed] = useState(40)

  useEffect(() => {
    if (map !== null) {
      const directionsService = new window.google.maps.DirectionsService();
      const waypoints = stops.map(stop => ({
        location: stop.position,
        stopover: true,
      }));
      directionsService.route(
        {
          origin: center,
          destination: kimironkoCoordinates,
          waypoints: waypoints,
          travelMode: 'DRIVING',
        },
        directionsCallback
      );
    }
  }, [map, currentStopIndex]); 

  if (!isLoaded) {
    return <SkeletonText />
  }


  const directionsCallback = response => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
      const route = response.routes[0];
      let totalDurationInSeconds = 0;
      route.legs.forEach(leg => {
        totalDurationInSeconds += leg.duration.value;
      });
      const totalDurationInMinutes = Math.ceil(totalDurationInSeconds / 60);
      setTotalDuration(`${totalDurationInMinutes} min`);
      const leg = route.legs[currentStopIndex]; 
      setDistanceToNextStop(leg.distance.text);


      const distanceToNextStopMeters = leg.distance.value;
      const travelTimeHours = distanceToNextStopMeters / (averageSpeed * 1000);
      const travelTimeMinutes = Math.ceil(travelTimeHours * 60);
      setDurationToNextStop(`${travelTimeMinutes} minutes`);
    } else {
      console.log('Directions response is null or not OK');
    }
  };

  const moveToNextStop = () => {
    if (currentStopIndex < stops.length - 1) {
      setCurrentStopIndex(currentStopIndex + 1);
    }
  };

  const stops = [
    { name: 'Stop A', position: { lat: -1.9355377074007851, lng: 30.060163829002217 } },
    { name: 'Stop B', position: { lat: -1.9358808342336546, lng: 30.08024820994666 } },
    { name: 'Stop C', position: { lat: -1.9489196023037583, lng: 30.092607828989397 } },
    { name: 'Stop D', position: { lat: -1.9592132952818164, lng: 30.106684061788073 } },
    { name: 'Stop E', position: { lat: -1.9487480402200394, lng: 30.126596781356923 } },
    {
      name: 'Kimironko', position: {
        lat: -1.9365670876910166,
        lng: 30.13020167024439,
      }
    },
  ];


  const kimironkoCoordinates = {
    lat: -1.9365670876910166,
    lng: 30.13020167024439,
  };

  const onLoad = map => setMap(map);

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        <GoogleMap
          onLoad={onLoad}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: true,
            fullscreenControl: false,
          }}
        >
          {stops.map(stop => (
            <Marker key={stop.name} position={stop.position} />
          ))}
          {directions !== null && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        <Box position='absolute' top={0} left={0} zIndex={10} w={'100%'}>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            p={4}
            bg='-webkit-linear-gradient(40deg, hsla(175, 79%, 63%, 1) 0%, hsla(82, 96%, 42%, 1) 100%)'
          >
            <button>
              <FiMenu size={24} color='white' />
            </button>
            <Box>
              <h1 style={{ color: 'black', fontWeight: 'bold' }}>Start up</h1>
            </Box>
          </Flex>
          <Box bg='white' p={2} borderRadius='md'>
            <div style={{ fontWeight: 'bold' ,fontSize:20}}>Nyabugongo - kimironko</div>
            <div>Next Stop: {stops[currentStopIndex]?.name}</div>
            <div>Distance : {distanceToNextStop} Time: {durationToNextStop}</div>

            <button onClick={moveToNextStop}>Move to Next Stop</button>
          </Box>
        </Box>
        <Box position='fixed' bottom={0} left={0} zIndex={10} w={'100%'} display={[null, null, 'none']}>
          <Flex
            alignItems='center'
            justifyContent='space-between'
            width='100%'
            p={4}
            bg='-webkit-linear-gradient(40deg, hsla(175, 79%, 63%, 1) 0%, hsla(82, 96%, 42%, 1) 100%)'
          >
            <IconButton icon={<FiHeart />} colorScheme='white' size={28} />
            <IconButton icon={<FiClock />} colorScheme='white' size={25} />
            <IconButton icon={<FiBell />} colorScheme='white' size={25} />
          </Flex>
        </Box>
      </Box>
    </Flex>
  )
}

export default App
