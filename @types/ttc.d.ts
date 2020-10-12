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

  type PredictionsParameters = {
    command: "predictions";
    a: "ttc";
    stopId: string;
    routeTag?: string;
    useShortTitles?: true;
    r?: string;
  };

  type PredictionsXml = XmlResponse & {
    body: {
      predictions: {
        direction: {
          prediction: {
            _attributes: {
              // Specifies the block number assigned to the vehicle as defined in
              // the configuration data.
              // "26_30_10"
              block: string;

              // By using the branch information in the User Interface the passengers can see if a prediction is for a
              // bus that is going on their desired branch.
              // "26"
              branch: string;

              // Specifies the ID of the direction for the stop that the prediction is for
              // "26_0_26"
              dirTag: string;
              // "1602385905104"
              epochTime: string;

              // If it is set to true then the prediction is for the
              // departure time. Otherwise the prediction is for an arrival time
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

              // affectedByLayover
            };
          }[];
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

          // dirTitleBecauseNoPredictions
        };
      };
    };
  };
}
