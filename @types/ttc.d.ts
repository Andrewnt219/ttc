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
}
