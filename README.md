# Case study React Native: Uber clone
## About

This is practice development with React Native and Google Maps API where I have code a simple "clone" from Uber mobile app.

<p align="center">
  <img src="./docs/demo.gif" />
</p>


## What have I used?

Here is the libraries that I have used during this development:

* **react-native-maps**, for plot the map itself;
* **react-native-google-places-autocomplete**, for query the addresses using Places API from Google Maps;
* **react-native-geocoding**, for query current user address using Geocode API from Google Maps;
* **react-native-maps-directions**, for query data used to plot routes on the Map using Direction API from Google Maps;

## How to use

1 - Configure a ```.env``` file following the required environment variables available in ```.env.example```

2 - Run the application using ```react-native``` cli:

```
$ npx react-native run-ios
```

## License

This project is under the MIT license. See the [LICENSE](./LICENSE) for more information.