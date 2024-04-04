(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["axios"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("axios"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.axios);
    global.test2 = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_axios) {
  "use strict";

  _axios = _interopRequireDefault(_axios);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  // import credentials from './credentials.json';
  require('dotenv').config();
  console.log(process.env.USERNAME);
  const api = _axios.default.create({
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
  });
  let loginData = {
    '__EVENTVALIDATION': 'UGw6YPMBC2Ub2woFOSKtuDnEaAJXmBfHSaK42KRG0jHLNFyqVzjvBvvyPphj3Lm3YKf3dz4v5Pc5aOYqM+XUbYjXXKufvDIe3aH47s0hr/VKGOqW29PVii2CuaWytgEvKA5+0/xgxixdX9Gw/ju6izPhdZdhZOvvsNfmFwmdyCk=',
    '__VIEWSTATE': 'wZJYAJ4apaSNIy6vpSc3lfdnAq7DiIZL1BrsRWJxfl4ag36f36MPkJPTqugGwo4e6abcMx4C3JxfFx5AcpumXYAP+KQb/By/GPc54wXQSM4=',
    '__VIEWSTATEGENERATOR': 'E13CECB1',
    'ctl00$MainContent$Submit1': 'Login',
    'ctl00$MainContent$password': process.env.PASSWORD,
    'ctl00$MainContent$username': process.env.USERNAME
  };
  let loginConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'host': 'md-mcps-psv.edupoint.com'
    }
  };
  let gradebookData = '{"request":{"gradingPeriodGU":"1022E1B6-C707-495E-89AB-BF4811ED3EF1","AGU":"0","orgYearGU":"2770147F-2A1B-44E3-87E8-90EE58CD89E7","schoolID":199,"markPeriodGU":"90D5191E-ABB2-4F94-A1A3-159A82A79B82"}}';
  let gradebookConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-User': '?1',
      'Sec-Fetch-Dest': 'document',
      'host': 'md-mcps-psv.edupoint.com'
    }
  };
  const loginSession = async () => {
    const response = api.post("PXP2_Login_Student.aspx?regenerateSessionId=True", loginData, loginConfig);
    return (await response).headers['set-cookie'];
  };
  const sessionId = loginSession().then(data => {
    console.log(data);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJVU0VSTkFNRSIsImFwaSIsImF4aW9zIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZVR5cGUiLCJsb2dpbkRhdGEiLCJQQVNTV09SRCIsImxvZ2luQ29uZmlnIiwiZ3JhZGVib29rRGF0YSIsImdyYWRlYm9va0NvbmZpZyIsImxvZ2luU2Vzc2lvbiIsInJlc3BvbnNlIiwicG9zdCIsInNlc3Npb25JZCIsInRoZW4iLCJkYXRhIl0sInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Rlc3RpbmcvdGVzdDIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0dWRlbnRWdWUgZnJvbSAnLi4nO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbi8vIGltcG9ydCBjcmVkZW50aWFscyBmcm9tICcuL2NyZWRlbnRpYWxzLmpzb24nO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG5cbmNvbnNvbGUubG9nKHByb2Nlc3MuZW52LlVTRVJOQU1FKTtcblxuY29uc3QgYXBpID0gYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiAnaHR0cHM6Ly9tZC1tY3BzLXBzdi5lZHVwb2ludC5jb20vJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgICdzZWMtY2gtdWEnOiAnXCJHb29nbGUgQ2hyb21lXCI7dj1cIjEyM1wiLCBcIk5vdDpBLUJyYW5kXCI7dj1cIjhcIiwgXCJDaHJvbWl1bVwiO3Y9XCIxMjNcIicsIFxuICAgICAgICAnc2VjLWNoLXVhLW1vYmlsZSc6ICc/MCcsIFxuICAgICAgICAnc2VjLWNoLXVhLXBsYXRmb3JtJzogJ1wibWFjT1NcIicsIFxuICAgICAgICAnVXBncmFkZS1JbnNlY3VyZS1SZXF1ZXN0cyc6ICcxJywgXG4gICAgICAgICdDb25uZWN0aW9uJzogJ2tlZXAtYWxpdmUnLCBcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAnTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMy4wLjAuMCBTYWZhcmkvNTM3LjM2JywgXG4gICAgICAgICdTZWMtRmV0Y2gtU2l0ZSc6ICdzYW1lLW9yaWdpbicsIFxuICAgICAgICAnU2VjLUZldGNoLVVzZXInOiAnPzEnLCBcbiAgICAgICAgJ2hvc3QnOiAnbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tJywgXG4gICAgfSxcbiAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgcmVzcG9uc2VUeXBlOiAnanNvbidcbn0pO1xuXG5sZXQgbG9naW5EYXRhID0ge1xuICAgICdfX0VWRU5UVkFMSURBVElPTic6ICdVR3c2WVBNQkMyVWIyd29GT1NLdHVEbkVhQUpYbUJmSFNhSzQyS1JHMGpITE5GeXFWemp2QnZ2eVBwaGozTG0zWUtmM2R6NHY1UGM1YU9ZcU0rWFViWWpYWEt1ZnZESWUzYUg0N3MwaHIvVktHT3FXMjlQVmlpMkN1YVd5dGdFdktBNSswL3hneGl4ZFg5R3cvanU2aXpQaGRaZGhaT3Z2c05mbUZ3bWR5Q2s9JyxcbiAgICAnX19WSUVXU1RBVEUnOiAnd1pKWUFKNGFwYVNOSXk2dnBTYzNsZmRuQXE3RGlJWkwxQnJzUldKeGZsNGFnMzZmMzZNUGtKUFRxdWdHd280ZTZhYmNNeDRDM0p4ZkZ4NUFjcHVtWFlBUCtLUWIvQnkvR1BjNTR3WFFTTTQ9JyxcbiAgICAnX19WSUVXU1RBVEVHRU5FUkFUT1InOiAnRTEzQ0VDQjEnLFxuICAgICdjdGwwMCRNYWluQ29udGVudCRTdWJtaXQxJzogJ0xvZ2luJyxcbiAgICAnY3RsMDAkTWFpbkNvbnRlbnQkcGFzc3dvcmQnOiBwcm9jZXNzLmVudi5QQVNTV09SRCxcbiAgICAnY3RsMDAkTWFpbkNvbnRlbnQkdXNlcm5hbWUnOiBwcm9jZXNzLmVudi5VU0VSTkFNRVxufTtcblxubGV0IGxvZ2luQ29uZmlnID0ge1xuICAgIGhlYWRlcnM6IHsgXG4gICAgICAgIFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIFxuICAgICAgICAnQWNjZXB0JzogJ3RleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1sO3E9MC45LGltYWdlL2F2aWYsaW1hZ2Uvd2VicCxpbWFnZS9hcG5nLCovKjtxPTAuOCxhcHBsaWNhdGlvbi9zaWduZWQtZXhjaGFuZ2U7dj1iMztxPTAuNycsIFxuICAgICAgICAnU2VjLUZldGNoLU1vZGUnOiAnbmF2aWdhdGUnLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1Vc2VyJzogJz8xJywgXG4gICAgICAgICdTZWMtRmV0Y2gtRGVzdCc6ICdkb2N1bWVudCcsIFxuICAgICAgICAnaG9zdCc6ICdtZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICB9LFxufTtcblxubGV0IGdyYWRlYm9va0RhdGEgPSAne1wicmVxdWVzdFwiOntcImdyYWRpbmdQZXJpb2RHVVwiOlwiMTAyMkUxQjYtQzcwNy00OTVFLTg5QUItQkY0ODExRUQzRUYxXCIsXCJBR1VcIjpcIjBcIixcIm9yZ1llYXJHVVwiOlwiMjc3MDE0N0YtMkExQi00NEUzLTg3RTgtOTBFRTU4Q0Q4OUU3XCIsXCJzY2hvb2xJRFwiOjE5OSxcIm1hcmtQZXJpb2RHVVwiOlwiOTBENTE5MUUtQUJCMi00Rjk0LUExQTMtMTU5QTgyQTc5QjgyXCJ9fSc7XG5cbmxldCBncmFkZWJvb2tDb25maWcgPSB7XG4gICAgaGVhZGVyczogeyBcbiAgICAgICAgXG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJywgXG4gICAgICAgICdBY2NlcHQnOiAndGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksaW1hZ2UvYXZpZixpbWFnZS93ZWJwLGltYWdlL2FwbmcsKi8qO3E9MC44LGFwcGxpY2F0aW9uL3NpZ25lZC1leGNoYW5nZTt2PWIzO3E9MC43JywgXG4gICAgICAgICdTZWMtRmV0Y2gtTW9kZSc6ICduYXZpZ2F0ZScsIFxuICAgICAgICAnU2VjLUZldGNoLVVzZXInOiAnPzEnLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1EZXN0JzogJ2RvY3VtZW50JywgXG4gICAgICAgICdob3N0JzogJ21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbScsIFxuICAgIH0sXG59O1xuXG5jb25zdCBsb2dpblNlc3Npb24gPSBhc3luYygpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGFwaS5wb3N0KFwiUFhQMl9Mb2dpbl9TdHVkZW50LmFzcHg/cmVnZW5lcmF0ZVNlc3Npb25JZD1UcnVlXCIsIGxvZ2luRGF0YSwgbG9naW5Db25maWcpXG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZSkuaGVhZGVyc1snc2V0LWNvb2tpZSddO1xufVxuXG5jb25zdCBzZXNzaW9uSWQgPSBsb2dpblNlc3Npb24oKVxuLnRoZW4oKGRhdGEpID0+IHtcbiAgICBjb25zb2xlLmxvZyhkYXRhKVxufVxuKSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFFQTtFQUNBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUNDLE1BQU0sRUFBRTtFQUUxQkMsT0FBTyxDQUFDQyxHQUFHLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxRQUFRLENBQUM7RUFFakMsTUFBTUMsR0FBRyxHQUFHQyxjQUFLLENBQUNDLE1BQU0sQ0FBQztJQUNyQkMsT0FBTyxFQUFFLG1DQUFtQztJQUM1Q0MsT0FBTyxFQUFFO01BQ0wsV0FBVyxFQUFFLGtFQUFrRTtNQUMvRSxrQkFBa0IsRUFBRSxJQUFJO01BQ3hCLG9CQUFvQixFQUFFLFNBQVM7TUFDL0IsMkJBQTJCLEVBQUUsR0FBRztNQUNoQyxZQUFZLEVBQUUsWUFBWTtNQUMxQixZQUFZLEVBQUUsdUhBQXVIO01BQ3JJLGdCQUFnQixFQUFFLGFBQWE7TUFDL0IsZ0JBQWdCLEVBQUUsSUFBSTtNQUN0QixNQUFNLEVBQUU7SUFDWixDQUFDO0lBQ0RDLGVBQWUsRUFBRSxJQUFJO0lBQ3JCQyxZQUFZLEVBQUU7RUFDbEIsQ0FBQyxDQUFDO0VBRUYsSUFBSUMsU0FBUyxHQUFHO0lBQ1osbUJBQW1CLEVBQUUsOEtBQThLO0lBQ25NLGFBQWEsRUFBRSw4R0FBOEc7SUFDN0gsc0JBQXNCLEVBQUUsVUFBVTtJQUNsQywyQkFBMkIsRUFBRSxPQUFPO0lBQ3BDLDRCQUE0QixFQUFFVixPQUFPLENBQUNDLEdBQUcsQ0FBQ1UsUUFBUTtJQUNsRCw0QkFBNEIsRUFBRVgsT0FBTyxDQUFDQyxHQUFHLENBQUNDO0VBQzlDLENBQUM7RUFFRCxJQUFJVSxXQUFXLEdBQUc7SUFDZEwsT0FBTyxFQUFFO01BRUwsY0FBYyxFQUFFLG1DQUFtQztNQUNuRCxRQUFRLEVBQUUseUlBQXlJO01BQ25KLGdCQUFnQixFQUFFLFVBQVU7TUFDNUIsZ0JBQWdCLEVBQUUsSUFBSTtNQUN0QixnQkFBZ0IsRUFBRSxVQUFVO01BQzVCLE1BQU0sRUFBRTtJQUNaO0VBQ0osQ0FBQztFQUVELElBQUlNLGFBQWEsR0FBRywwTUFBME07RUFFOU4sSUFBSUMsZUFBZSxHQUFHO0lBQ2xCUCxPQUFPLEVBQUU7TUFFTCxjQUFjLEVBQUUsbUNBQW1DO01BQ25ELFFBQVEsRUFBRSx5SUFBeUk7TUFDbkosZ0JBQWdCLEVBQUUsVUFBVTtNQUM1QixnQkFBZ0IsRUFBRSxJQUFJO01BQ3RCLGdCQUFnQixFQUFFLFVBQVU7TUFDNUIsTUFBTSxFQUFFO0lBQ1o7RUFDSixDQUFDO0VBRUQsTUFBTVEsWUFBWSxHQUFHLFlBQVc7SUFDNUIsTUFBTUMsUUFBUSxHQUFHYixHQUFHLENBQUNjLElBQUksQ0FBQyxrREFBa0QsRUFBRVAsU0FBUyxFQUFFRSxXQUFXLENBQUM7SUFDckcsT0FBTyxDQUFDLE1BQU1JLFFBQVEsRUFBRVQsT0FBTyxDQUFDLFlBQVksQ0FBQztFQUNqRCxDQUFDO0VBRUQsTUFBTVcsU0FBUyxHQUFHSCxZQUFZLEVBQUUsQ0FDL0JJLElBQUksQ0FBRUMsSUFBSSxJQUFLO0lBQ1p0QixPQUFPLENBQUNDLEdBQUcsQ0FBQ3FCLElBQUksQ0FBQztFQUNyQixDQUFDLENBQ0E7QUFBQSJ9