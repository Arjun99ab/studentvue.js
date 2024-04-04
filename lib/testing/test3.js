(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["axios", "dotenv", "axios-cookiejar-support", "tough-cookie"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("axios"), require("dotenv"), require("axios-cookiejar-support"), require("tough-cookie"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.axios, global.dotenv, global.axiosCookiejarSupport, global.toughCookie);
    global.test3 = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_axios, _dotenv, _axiosCookiejarSupport, _toughCookie) {
  "use strict";

  _axios = _interopRequireDefault(_axios);
  _dotenv = _interopRequireDefault(_dotenv);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  _dotenv.default.config();
  const USERNAME = process.env.USERNAME;
  const PASSWORD = process.env.PASSWORD;
  const clientSettings = {
    baseURL: 'https://md-mcps-psv.edupoint.com/',
    headers: {
      'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'Upgrade-Insecure-Requests': '1',
      'Connection': 'keep-alive',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'host': 'md-mcps-psv.edupoint.com'
    },
    withCredentials: true,
    responseType: 'json'
  };
  const jar = new _toughCookie.CookieJar();
  const client = (0, _axiosCookiejarSupport.wrapper)(_axios.default.create({
    jar,
    clientSettings
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJVU0VSTkFNRSIsInByb2Nlc3MiLCJlbnYiLCJQQVNTV09SRCIsImNsaWVudFNldHRpbmdzIiwiYmFzZVVSTCIsImhlYWRlcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJqYXIiLCJDb29raWVKYXIiLCJjbGllbnQiLCJ3cmFwcGVyIiwiYXhpb3MiLCJjcmVhdGUiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdGluZy90ZXN0My50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R1ZGVudFZ1ZSBmcm9tICcuLic7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnO1xuaW1wb3J0IHsgd3JhcHBlciB9IGZyb20gJ2F4aW9zLWNvb2tpZWphci1zdXBwb3J0JztcbmltcG9ydCB7IENvb2tpZUphciB9IGZyb20gJ3RvdWdoLWNvb2tpZSc7XG5cbmRvdGVudi5jb25maWcoKTtcbmNvbnN0IFVTRVJOQU1FID0gcHJvY2Vzcy5lbnYuVVNFUk5BTUU7XG5jb25zdCBQQVNTV09SRCA9IHByb2Nlc3MuZW52LlBBU1NXT1JEO1xuXG5jb25zdCBjbGllbnRTZXR0aW5ncyA9IHtcbiAgICBiYXNlVVJMOiAnaHR0cHM6Ly9tZC1tY3BzLXBzdi5lZHVwb2ludC5jb20vJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgICdzZWMtY2gtdWEnOiAnXCJHb29nbGUgQ2hyb21lXCI7dj1cIjEyM1wiLCBcIk5vdDpBLUJyYW5kXCI7dj1cIjhcIiwgXCJDaHJvbWl1bVwiO3Y9XCIxMjNcIicsIFxuICAgICAgICAnc2VjLWNoLXVhLW1vYmlsZSc6ICc/MCcsIFxuICAgICAgICAnc2VjLWNoLXVhLXBsYXRmb3JtJzogJ1wibWFjT1NcIicsIFxuICAgICAgICAnVXBncmFkZS1JbnNlY3VyZS1SZXF1ZXN0cyc6ICcxJywgXG4gICAgICAgICdDb25uZWN0aW9uJzogJ2tlZXAtYWxpdmUnLCBcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAnTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMy4wLjAuMCBTYWZhcmkvNTM3LjM2JywgXG4gICAgICAgICdTZWMtRmV0Y2gtU2l0ZSc6ICdzYW1lLW9yaWdpbicsIFxuICAgICAgICAnU2VjLUZldGNoLVVzZXInOiAnPzEnLCBcbiAgICAgICAgJ2hvc3QnOiAnbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tJywgXG4gICAgfSxcbiAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgcmVzcG9uc2VUeXBlOiAnanNvbidcbn07XG5cbmNvbnN0IGphciA9IG5ldyBDb29raWVKYXIoKTtcbmNvbnN0IGNsaWVudCA9IHdyYXBwZXIoYXhpb3MuY3JlYXRlKHsgamFyLCBjbGllbnRTZXR0aW5ncyB9KSk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFNQUEsZUFBTSxDQUFDQyxNQUFNLEVBQUU7RUFDZixNQUFNQyxRQUFRLEdBQUdDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRixRQUFRO0VBQ3JDLE1BQU1HLFFBQVEsR0FBR0YsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFFBQVE7RUFFckMsTUFBTUMsY0FBYyxHQUFHO0lBQ25CQyxPQUFPLEVBQUUsbUNBQW1DO0lBQzVDQyxPQUFPLEVBQUU7TUFDTCxXQUFXLEVBQUUsa0VBQWtFO01BQy9FLGtCQUFrQixFQUFFLElBQUk7TUFDeEIsb0JBQW9CLEVBQUUsU0FBUztNQUMvQiwyQkFBMkIsRUFBRSxHQUFHO01BQ2hDLFlBQVksRUFBRSxZQUFZO01BQzFCLFlBQVksRUFBRSx1SEFBdUg7TUFDckksZ0JBQWdCLEVBQUUsYUFBYTtNQUMvQixnQkFBZ0IsRUFBRSxJQUFJO01BQ3RCLE1BQU0sRUFBRTtJQUNaLENBQUM7SUFDREMsZUFBZSxFQUFFLElBQUk7SUFDckJDLFlBQVksRUFBRTtFQUNsQixDQUFDO0VBRUQsTUFBTUMsR0FBRyxHQUFHLElBQUlDLHNCQUFTLEVBQUU7RUFDM0IsTUFBTUMsTUFBTSxHQUFHLElBQUFDLDhCQUFPLEVBQUNDLGNBQUssQ0FBQ0MsTUFBTSxDQUFDO0lBQUVMLEdBQUc7SUFBRUw7RUFBZSxDQUFDLENBQUMsQ0FBQztBQUFDIn0=