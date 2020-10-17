declare module "ttc" {
  type TtcRss = {
    content: string;
    contentSnippet: string;
    date: string;
    "dc:date": string;
    isoDate: string;
    link: string;
    title: string;
  };

  /* ------------------------------- XmlResponse ------------------------------ */
  type XmlResponse = {
    _declaration: {
      _attributes: {
        encoding: string;
        version: string;
      };
    };
    body: {
      _attributes: {
        copyright: string;
      };
    };
  };

  type ErrorXml = XmlResponse & {
    body: {
      Error: {
        _attributes: {
          // "false"
          shouldRetry: string;
        };

        // "↵  "command" parameter must be specified in query string↵"
        _text: string;
      };
    };
  };

  /* --------------------------- Available Commands --------------------------- */
  type Commands =
    | "routeList"
    | "routeConfig"
    | "predictions"
    | "predictionsForMultiStops"
    | "schedule"
    | "messages"
    | "vehicleLocations"
    | "vehicleLocation";

  type Parameters = {
    command: Commands;
    a: "ttc";
  };

  /* ---------------------------- Command routeList --------------------------- */
  // E.g http://webservices.nextbus.com/service/publicXMLFeed?command=routeList&a=ttc

  type RouteListXml = {
    _declaration: {
      version: string;
      encoding: string;
    };

    body: {
      _attributes: {
        copyright: string;
      };
      route: {
        _attributes: {
          // unique alphanumeric identifier for route
          // NOTE this is used for "r" in query parameter
          // "5"
          tag: string;
          // the name of the route
          // "5-Avenue Road"
          title: string;
          // for some transit agencies shorter titles are provided that can be useful for
          shortTitle?: string;
        };
      }[];
    };
  };

  /* ---------------------------- Command routeConfig --------------------------- */
  // E.g http://webservices.nextbus.com/service/publicXMLFeed?command=routeConfig&a=ttc&r=39

  type RouteConfigXml = XmlResponse & {
    body: {
      route: {
        _attributes: {
          // unique alphanumeric identifier for route, such as “5”
          // NOTE this is used for "r" in query parameter
          // "39"
          tag: string;
          // the name of the route
          // "39-Finch East"
          title: string;
          // for some transit agencies shorter titles are provided that can be useful for
          shortTitle?: string;
          // In hexadecimal format associated with the route.
          color: string;
          // the hex color that most contrasts with the route color
          oppositeColor: string;
          /* 4 specifiers represent the extent of the route */
          latMin: string;
          latMax: string;
          lonMin: string;
          lonMax: string;
        };
        stop: {
          _attributes: {
            // unique alphanumeric identifier for stop
            // "5410"
            tag: string;
            // the name of the stop
            // "Finch Ave East At Kenneth Ave"
            title: string;
            // the short name of the stop
            shortTitle?: string;
            // Numeric ID to identify a stop
            // Useful for telephone or SMS system
            // "2516"
            stopId: string;
            /* location of the stop */
            lat: string;
            lon: string;
          };
        }[];
        direction: {
          _attributes: {
            // No documentation.
            // "39"
            branch: string;
            // unique alphanumeric identifier for the direction
            // "39_1_39C"
            tag: string;
            // For display on UI
            // "West - 39 Finch East towards Finch Station"
            title: string;
            // a simplified name so that directions can be grouped together
            // West
            name: string;
          };
          stop: {
            _attributes: {
              tag: string;
            };
          }[];
        }[];
        // lists of coordinates that can be used to draw a route on a map
        path: {
          point: {
            _attributes: {
              lat: string;
              lon: string;
            };
          }[];
        }[];
      };
    };
  };

  /* ------------------------------- Predictions ------------------------------ */
  // E.g.http://webservices.nextbus.com/service/publicXMLFeed?predictions&a=ttc&stopId=39

  type Prediction = {
    _attributes: {
      // Specifies the block number assigned to the vehicle as defined in the configuration data.
      // "26_30_10"
      block: string;

      // By using the branch information in the User Interface the passengers can see if a prediction is for a
      // bus that is going on their desired branch.
      // "107", "107A", "107B"
      branch: string;

      // Specifies the ID of the direction for the stop that the prediction is for
      // "26_0_26"
      dirTag: string;

      // "1602385905104"
      epochTime: string;

      // If it is set to "true" then the prediction is for the departure time
      // Otherwise the prediction is for an arrival time
      // "false"
      isDeparture: string;

      // "4"
      minutes: string;

      // "265"
      seconds: string;

      // Specifies the ID of the trip for when the vehicle will be arriving at the stop,
      // "40680981"
      tripTag: string;

      // "1104"
      vehicle: string;

      affectedByLayover?: string;

      // May not be available for TTC
      // This is useful for determining if a vehicle is stuck in traffic such that the
      // predictions might not be as accurate
      // "true"
      delayed?: string;

      // Not available for TTC
      //isScheduleBased?: string;
    };
  };

  type PredictionsParameters = Parameters & {
    command: "predictions";
    stopId: string;
    routeTag?: string;
    useShortTitles?: true;
    r?: string;
  };

  type PredictionsXml = XmlResponse & {
    body: {
      predictions: {
        direction: {
          prediction: Prediction[];
          _attributes: {
            // "East - 26 Dupont towards St George Station"
            title: string;
          };
        };
        _attributes: {
          // The name of the agency to be displayed to passenger.
          // "Toronto Transit Commission"
          agencyTitle: string;

          // Identifier for the route
          // "26"
          routeTag: string;

          // Title of the route to be displayed to passenger
          // "26-Dupont"
          routeTitle: string;

          // "3402"
          stopTag: string;

          // Title of the stop to be displayed to passenger.
          // "Annette St At Medland St"
          stopTitle: string;

          // Title of direction. This attribute is only provided if there are no predictions
          dirTitleBecauseNoPredictions?: string;
        };
      };
    };
  };

  /* ------------------------ PredictionsForMultiStops ------------------------ */
  // E.g:  http://webservices.nextbus.com/service/publicXMLFeed?command=predictionsForMultiStops&a=ttc&stops=39|14211&stops=60|3041

  type PredictionsForMultiStopsParameters = Parameters & {
    // multiple stops
    stops: string[];

    command: "predictionsForMultiStops";
  };

  type PredictionsForMultiStops = XmlResponse & {
    body: {
      predictions: {
        direction: {
          _attributes: {
            // title of the requested route's direction
            // "East - 60 Steeles West towards Finch Station via Pioneer Village Station"
            title: string;
          };
          prediction: Prediction[];
        };

        _attributes: {
          // "Toronto Transit Commission"
          agencyTitle: string;

          // The requested route's tag
          // "60"
          routeTag: string;

          // The requested route's title
          // "60-Steeles West"
          routeTitle: string;

          // The requested stop's tag
          // "3041"
          stopTag: string;

          // The requested stop's title
          // "Steeles Ave West At Rossdean Dr"
          stopTitle: string;
        };
      }[];
    };
  };

  /* -------------------------------- schedule -------------------------------- */
  // E.g. http://webservices.nextbus.com/service/publicXMLFeed?command=schedule&a=ttc&r=39

  type ScheduleParameters = Parameters & {
    command: "schedule";
    r: string;
  };

  type ScheduleXml = XmlResponse & {
    body: {
      route: {
        _attributes: {
          // "East"
          direction;

          // name of the current schedule class, which may change with the seasons
          // "ITP2020Oct"
          scheduleClass;

          // indicates service date(s) when the schedule applies,
          // which may differ on weekdays, weekend days, and holidays.
          // "THANKS" for thanksgiving?
          serviceClass;

          // routeTag
          // "39"
          tag;

          // routeTitle
          // "39-Finch East"
          title;
        };
        header: {
          stop: {
            // stopTitle
            // "Finch Station"
            _text: string;

            _attributes: {
              // stopTag
              // "14211"
              tag: string;
            };
          }[];
        };
        tr: {
          _attributes: {
            // specifies the block number as defined in the configuration data.
            // "39_2_20"
            blockID: string;
          };
          stop: {
            _attributes: {
              // scheduled arrival as epoch time
              // For trips where a vehicle does not serve the stop the epochTime is set to "-1" (and text is "--")
              // "-1"
              epochTime: string;

              // 14211
              tag: string;
            };

            // epochTime in HH:mm:ss format
            // For trips where a vehicle does not serve the stop the format is "--" (and epochTime "-1")
            // "05:00:00", "--"
            _text: string;
          }[];
        }[];
      }[];
    };
  };

  /* ---------------------------- VehicleLocations ---------------------------- */

  type VehicleLocationsParameters = Parameters & {
    command: "vehicleLocations";
    r: string;
    t: string;
  };

  type VehicleLocationsXml = XmlResponse & {
    body: {
      lastTime: {
        _attributes: {
          // The time that is used in the query
          // "1602905936332"
          time: string;
        };
      };

      vehicle?: {
        _attributes: {
          // Specifies the ID of the direction that the vehicle is currently on
          // "60_0_60B"
          dirTag: string;

          // Specifies the heading of the vehicle in degrees.
          // Will be a value between 0 and 360.
          // A negative value indicates that the heading is not currently available.
          // "200"
          heading: string;

          // Vehicle id
          // "3260"
          id: string;

          // Latitude of the vehicle
          // "43.7803891"
          lat: string;

          // Lontitude of the vehicle
          // "-79.4144694"
          lon: string;

          // Specifies whether the vehicle is currently predictable.
          // "true"
          predictable: string;

          // The route tag used in the query
          // "60"
          routeTag: string;

          // Seconds passed since the request time in query
          // "7"
          secsSinceReport: string;

          // Specifies GPS based speed of vehicle.
          // "13"
          speedKmHr: string;
        };
      }[];
    };
  };
}
