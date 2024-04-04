(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["axios", "axios-cookiejar-support", "tough-cookie"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("axios"), require("axios-cookiejar-support"), require("tough-cookie"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.axios, global.axiosCookiejarSupport, global.toughCookie);
    global.test2 = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_axios, _axiosCookiejarSupport, _toughCookie) {
  "use strict";

  _axios = _interopRequireDefault(_axios);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  require('dotenv').config();
  console.log(process.env.USERNAME);
  const jar = new _toughCookie.CookieJar();
  const client = (0, _axiosCookiejarSupport.wrapper)(_axios.default.create({
    jar: jar,
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
    withCredentials: true
  }));
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
    withCredentials: true
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
  const loginSession = async () => {
    const response = api.post("PXP2_Login_Student.aspx?regenerateSessionId=True", loginData, loginConfig);
    return (await response).headers['set-cookie'];
  };
  const gradebookFetch = async cookieAuth => {
    let gradebookConfig = {
      withCredentials: true,
      headers: {
        'Cookie': cookieAuth + " EES_PVUE=1224335053.1.3289895040.501819392",
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-User': '?1',
        'Sec-Fetch-Dest': 'document',
        'host': 'md-mcps-psv.edupoint.com',
        'Origin': 'https://md-mcps-psv.edupoint.com',
        'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_GradeBook.aspx?AGU=0'
      }
    };
    console.log(cookieAuth);
    const response = api.post("service/PXP2Communication.asmx/GradebookFocusClassInfo", gradebookData, gradebookConfig);
    return (await response).data;
  };
  client.post("PXP2_Login_Student.aspx?regenerateSessionId=True", loginData, loginConfig).then(({
    config
  }) => {
    console.log(config.jar.toJSON());
  });

  // const sessionId = loginSession()
  // .then((data1) => {
  //     console.log(data1)
  //     if (data1) {
  //         const grade = gradebookFetch(data1[0].split(' ')[0])
  //         .then((data2) => {
  //             console.log("??")
  //             console.log(JSON.stringify(data2))
  //             console.log("???")
  //         });
  //     }
  // });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJVU0VSTkFNRSIsImphciIsIkNvb2tpZUphciIsImNsaWVudCIsIndyYXBwZXIiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwid2l0aENyZWRlbnRpYWxzIiwiYXBpIiwibG9naW5EYXRhIiwiUEFTU1dPUkQiLCJsb2dpbkNvbmZpZyIsImdyYWRlYm9va0RhdGEiLCJsb2dpblNlc3Npb24iLCJyZXNwb25zZSIsInBvc3QiLCJncmFkZWJvb2tGZXRjaCIsImNvb2tpZUF1dGgiLCJncmFkZWJvb2tDb25maWciLCJkYXRhIiwidGhlbiIsInRvSlNPTiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0aW5nL3Rlc3QyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHVkZW50VnVlIGZyb20gJy4uJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5yZXF1aXJlKCdkb3RlbnYnKS5jb25maWcoKTtcbmltcG9ydCB7IHdyYXBwZXIgfSBmcm9tICdheGlvcy1jb29raWVqYXItc3VwcG9ydCc7XG5pbXBvcnQgeyBDb29raWVKYXIgfSBmcm9tICd0b3VnaC1jb29raWUnO1xuXG5jb25zb2xlLmxvZyhwcm9jZXNzLmVudi5VU0VSTkFNRSk7XG5jb25zdCBqYXIgPSBuZXcgQ29va2llSmFyKCk7XG5jb25zdCBjbGllbnQgPSB3cmFwcGVyKGF4aW9zLmNyZWF0ZSh7XG4gICAgamFyOiBqYXIsXG4gICAgYmFzZVVSTDogJ2h0dHBzOi8vbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tLycsXG4gICAgaGVhZGVyczoge1xuICAgICAgICAnc2VjLWNoLXVhJzogJ1wiR29vZ2xlIENocm9tZVwiO3Y9XCIxMjNcIiwgXCJOb3Q6QS1CcmFuZFwiO3Y9XCI4XCIsIFwiQ2hyb21pdW1cIjt2PVwiMTIzXCInLCBcbiAgICAgICAgJ3NlYy1jaC11YS1tb2JpbGUnOiAnPzAnLCBcbiAgICAgICAgJ3NlYy1jaC11YS1wbGF0Zm9ybSc6ICdcIm1hY09TXCInLCBcbiAgICAgICAgJ1VwZ3JhZGUtSW5zZWN1cmUtUmVxdWVzdHMnOiAnMScsIFxuICAgICAgICAnQ29ubmVjdGlvbic6ICdrZWVwLWFsaXZlJywgXG4gICAgICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjMuMC4wLjAgU2FmYXJpLzUzNy4zNicsIFxuICAgICAgICAnU2VjLUZldGNoLVNpdGUnOiAnc2FtZS1vcmlnaW4nLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1Vc2VyJzogJz8xJywgXG4gICAgICAgICdob3N0JzogJ21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbScsIFxuICAgIH0sXG4gICAgd2l0aENyZWRlbnRpYWxzOiB0cnVlLFxufSkpO1xuXG5jb25zdCBhcGkgPSBheGlvcy5jcmVhdGUoe1xuICAgIGJhc2VVUkw6ICdodHRwczovL21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbS8nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ3NlYy1jaC11YSc6ICdcIkdvb2dsZSBDaHJvbWVcIjt2PVwiMTIzXCIsIFwiTm90OkEtQnJhbmRcIjt2PVwiOFwiLCBcIkNocm9taXVtXCI7dj1cIjEyM1wiJywgXG4gICAgICAgICdzZWMtY2gtdWEtbW9iaWxlJzogJz8wJywgXG4gICAgICAgICdzZWMtY2gtdWEtcGxhdGZvcm0nOiAnXCJtYWNPU1wiJywgXG4gICAgICAgICdVcGdyYWRlLUluc2VjdXJlLVJlcXVlc3RzJzogJzEnLCBcbiAgICAgICAgJ0Nvbm5lY3Rpb24nOiAna2VlcC1hbGl2ZScsIFxuICAgICAgICAnVXNlci1BZ2VudCc6ICdNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIzLjAuMC4wIFNhZmFyaS81MzcuMzYnLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1TaXRlJzogJ3NhbWUtb3JpZ2luJywgXG4gICAgICAgICdTZWMtRmV0Y2gtVXNlcic6ICc/MScsIFxuICAgICAgICAnaG9zdCc6ICdtZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICB9LFxuICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbn0pO1xuXG5sZXQgbG9naW5EYXRhID0ge1xuICAgICdfX0VWRU5UVkFMSURBVElPTic6ICdVR3c2WVBNQkMyVWIyd29GT1NLdHVEbkVhQUpYbUJmSFNhSzQyS1JHMGpITE5GeXFWemp2QnZ2eVBwaGozTG0zWUtmM2R6NHY1UGM1YU9ZcU0rWFViWWpYWEt1ZnZESWUzYUg0N3MwaHIvVktHT3FXMjlQVmlpMkN1YVd5dGdFdktBNSswL3hneGl4ZFg5R3cvanU2aXpQaGRaZGhaT3Z2c05mbUZ3bWR5Q2s9JyxcbiAgICAnX19WSUVXU1RBVEUnOiAnd1pKWUFKNGFwYVNOSXk2dnBTYzNsZmRuQXE3RGlJWkwxQnJzUldKeGZsNGFnMzZmMzZNUGtKUFRxdWdHd280ZTZhYmNNeDRDM0p4ZkZ4NUFjcHVtWFlBUCtLUWIvQnkvR1BjNTR3WFFTTTQ9JyxcbiAgICAnX19WSUVXU1RBVEVHRU5FUkFUT1InOiAnRTEzQ0VDQjEnLFxuICAgICdjdGwwMCRNYWluQ29udGVudCRTdWJtaXQxJzogJ0xvZ2luJyxcbiAgICAnY3RsMDAkTWFpbkNvbnRlbnQkcGFzc3dvcmQnOiBwcm9jZXNzLmVudi5QQVNTV09SRCxcbiAgICAnY3RsMDAkTWFpbkNvbnRlbnQkdXNlcm5hbWUnOiBwcm9jZXNzLmVudi5VU0VSTkFNRVxufTtcblxubGV0IGxvZ2luQ29uZmlnID0ge1xuICAgIGhlYWRlcnM6IHsgXG4gICAgICAgIFxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsIFxuICAgICAgICAnQWNjZXB0JzogJ3RleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1sO3E9MC45LGltYWdlL2F2aWYsaW1hZ2Uvd2VicCxpbWFnZS9hcG5nLCovKjtxPTAuOCxhcHBsaWNhdGlvbi9zaWduZWQtZXhjaGFuZ2U7dj1iMztxPTAuNycsIFxuICAgICAgICAnU2VjLUZldGNoLU1vZGUnOiAnbmF2aWdhdGUnLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1Vc2VyJzogJz8xJywgXG4gICAgICAgICdTZWMtRmV0Y2gtRGVzdCc6ICdkb2N1bWVudCcsIFxuICAgICAgICAnaG9zdCc6ICdtZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICB9LFxufTtcblxubGV0IGdyYWRlYm9va0RhdGEgPSAne1wicmVxdWVzdFwiOntcImdyYWRpbmdQZXJpb2RHVVwiOlwiMTAyMkUxQjYtQzcwNy00OTVFLTg5QUItQkY0ODExRUQzRUYxXCIsXCJBR1VcIjpcIjBcIixcIm9yZ1llYXJHVVwiOlwiMjc3MDE0N0YtMkExQi00NEUzLTg3RTgtOTBFRTU4Q0Q4OUU3XCIsXCJzY2hvb2xJRFwiOjE5OSxcIm1hcmtQZXJpb2RHVVwiOlwiOTBENTE5MUUtQUJCMi00Rjk0LUExQTMtMTU5QTgyQTc5QjgyXCJ9fSc7XG5cblxuXG5jb25zdCBsb2dpblNlc3Npb24gPSBhc3luYygpID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGFwaS5wb3N0KFwiUFhQMl9Mb2dpbl9TdHVkZW50LmFzcHg/cmVnZW5lcmF0ZVNlc3Npb25JZD1UcnVlXCIsIGxvZ2luRGF0YSwgbG9naW5Db25maWcpXG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZSkuaGVhZGVyc1snc2V0LWNvb2tpZSddO1xufVxuXG5jb25zdCBncmFkZWJvb2tGZXRjaCA9IGFzeW5jKGNvb2tpZUF1dGg6IGFueSkgPT4ge1xuICAgIGxldCBncmFkZWJvb2tDb25maWcgPSB7XG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgaGVhZGVyczogeyBcbiAgICAgICAgICAgICdDb29raWUnOiBjb29raWVBdXRoICsgXCIgRUVTX1BWVUU9MTIyNDMzNTA1My4xLjMyODk4OTUwNDAuNTAxODE5MzkyXCIsXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLCBcbiAgICAgICAgICAgICdBY2NlcHQnOiAndGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksaW1hZ2UvYXZpZixpbWFnZS93ZWJwLGltYWdlL2FwbmcsKi8qO3E9MC44LGFwcGxpY2F0aW9uL3NpZ25lZC1leGNoYW5nZTt2PWIzO3E9MC43JywgXG4gICAgICAgICAgICAnU2VjLUZldGNoLU1vZGUnOiAnbmF2aWdhdGUnLCBcbiAgICAgICAgICAgICdTZWMtRmV0Y2gtVXNlcic6ICc/MScsIFxuICAgICAgICAgICAgJ1NlYy1GZXRjaC1EZXN0JzogJ2RvY3VtZW50JywgXG4gICAgICAgICAgICAnaG9zdCc6ICdtZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICAgICAgICAgICdPcmlnaW4nOiAnaHR0cHM6Ly9tZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICAgICAgICAgICdSZWZlcmVyJzogJ2h0dHBzOi8vbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tL1BYUDJfR3JhZGVCb29rLmFzcHg/QUdVPTAnLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgY29uc29sZS5sb2coY29va2llQXV0aClcbiAgICBjb25zdCByZXNwb25zZSA9IGFwaS5wb3N0KFwic2VydmljZS9QWFAyQ29tbXVuaWNhdGlvbi5hc214L0dyYWRlYm9va0ZvY3VzQ2xhc3NJbmZvXCIsIGdyYWRlYm9va0RhdGEsIGdyYWRlYm9va0NvbmZpZylcbiAgICByZXR1cm4gKGF3YWl0IHJlc3BvbnNlKS5kYXRhO1xufVxuXG5jbGllbnQucG9zdChcIlBYUDJfTG9naW5fU3R1ZGVudC5hc3B4P3JlZ2VuZXJhdGVTZXNzaW9uSWQ9VHJ1ZVwiLCBsb2dpbkRhdGEsIGxvZ2luQ29uZmlnKS50aGVuKCh7IGNvbmZpZyB9KSA9PiB7XG4gICAgY29uc29sZS5sb2coY29uZmlnLmphci50b0pTT04oKSk7XG59KTtcblxuLy8gY29uc3Qgc2Vzc2lvbklkID0gbG9naW5TZXNzaW9uKClcbi8vIC50aGVuKChkYXRhMSkgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKGRhdGExKVxuLy8gICAgIGlmIChkYXRhMSkge1xuLy8gICAgICAgICBjb25zdCBncmFkZSA9IGdyYWRlYm9va0ZldGNoKGRhdGExWzBdLnNwbGl0KCcgJylbMF0pXG4vLyAgICAgICAgIC50aGVuKChkYXRhMikgPT4ge1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCI/P1wiKVxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YTIpKVxuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coXCI/Pz9cIilcbi8vICAgICAgICAgfSk7XG4vLyAgICAgfVxuLy8gfSk7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBRUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQ0MsTUFBTSxFQUFFO0VBSTFCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsT0FBTyxDQUFDQyxHQUFHLENBQUNDLFFBQVEsQ0FBQztFQUNqQyxNQUFNQyxHQUFHLEdBQUcsSUFBSUMsc0JBQVMsRUFBRTtFQUMzQixNQUFNQyxNQUFNLEdBQUcsSUFBQUMsOEJBQU8sRUFBQ0MsY0FBSyxDQUFDQyxNQUFNLENBQUM7SUFDaENMLEdBQUcsRUFBRUEsR0FBRztJQUNSTSxPQUFPLEVBQUUsbUNBQW1DO0lBQzVDQyxPQUFPLEVBQUU7TUFDTCxXQUFXLEVBQUUsa0VBQWtFO01BQy9FLGtCQUFrQixFQUFFLElBQUk7TUFDeEIsb0JBQW9CLEVBQUUsU0FBUztNQUMvQiwyQkFBMkIsRUFBRSxHQUFHO01BQ2hDLFlBQVksRUFBRSxZQUFZO01BQzFCLFlBQVksRUFB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