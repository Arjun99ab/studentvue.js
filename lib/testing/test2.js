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
  // @ts-ignore

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
    if (config.jar) {
      console.log(config.jar.toJSON());
    }
    let gradebookConfig = {
      jar: config.jar,
      withCredentials: true,
      headers: {
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
    client.post("service/PXP2Communication.asmx/GradebookFocusClassInfo", gradebookData, gradebookConfig).then(({
      data
    }) => {
      console.log(JSON.stringify(data));
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXF1aXJlIiwiY29uZmlnIiwiY29uc29sZSIsImxvZyIsInByb2Nlc3MiLCJlbnYiLCJVU0VSTkFNRSIsImphciIsIkNvb2tpZUphciIsImNsaWVudCIsIndyYXBwZXIiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJoZWFkZXJzIiwid2l0aENyZWRlbnRpYWxzIiwiYXBpIiwibG9naW5EYXRhIiwiUEFTU1dPUkQiLCJsb2dpbkNvbmZpZyIsImdyYWRlYm9va0RhdGEiLCJsb2dpblNlc3Npb24iLCJyZXNwb25zZSIsInBvc3QiLCJncmFkZWJvb2tGZXRjaCIsImNvb2tpZUF1dGgiLCJncmFkZWJvb2tDb25maWciLCJkYXRhIiwidGhlbiIsInRvSlNPTiIsIkpTT04iLCJzdHJpbmdpZnkiXSwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdGluZy90ZXN0Mi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R1ZGVudFZ1ZSBmcm9tICcuLic7XG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xucmVxdWlyZSgnZG90ZW52JykuY29uZmlnKCk7XG4vLyBAdHMtaWdub3JlXG5pbXBvcnQgeyB3cmFwcGVyIH0gZnJvbSAnYXhpb3MtY29va2llamFyLXN1cHBvcnQnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHsgQ29va2llSmFyIH0gZnJvbSAndG91Z2gtY29va2llJztcblxuY29uc29sZS5sb2cocHJvY2Vzcy5lbnYuVVNFUk5BTUUpO1xuY29uc3QgamFyID0gbmV3IENvb2tpZUphcigpO1xuY29uc3QgY2xpZW50ID0gd3JhcHBlcihheGlvcy5jcmVhdGUoe1xuICAgIGphcjogamFyLFxuICAgIGJhc2VVUkw6ICdodHRwczovL21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbS8nLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICAgJ3NlYy1jaC11YSc6ICdcIkdvb2dsZSBDaHJvbWVcIjt2PVwiMTIzXCIsIFwiTm90OkEtQnJhbmRcIjt2PVwiOFwiLCBcIkNocm9taXVtXCI7dj1cIjEyM1wiJywgXG4gICAgICAgICdzZWMtY2gtdWEtbW9iaWxlJzogJz8wJywgXG4gICAgICAgICdzZWMtY2gtdWEtcGxhdGZvcm0nOiAnXCJtYWNPU1wiJywgXG4gICAgICAgICdVcGdyYWRlLUluc2VjdXJlLVJlcXVlc3RzJzogJzEnLCBcbiAgICAgICAgJ0Nvbm5lY3Rpb24nOiAna2VlcC1hbGl2ZScsIFxuICAgICAgICAnVXNlci1BZ2VudCc6ICdNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xNV83KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIzLjAuMC4wIFNhZmFyaS81MzcuMzYnLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1TaXRlJzogJ3NhbWUtb3JpZ2luJywgXG4gICAgICAgICdTZWMtRmV0Y2gtVXNlcic6ICc/MScsIFxuICAgICAgICAnaG9zdCc6ICdtZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICB9LFxuICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbn0pKTtcblxuY29uc3QgYXBpID0gYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiAnaHR0cHM6Ly9tZC1tY3BzLXBzdi5lZHVwb2ludC5jb20vJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgICdzZWMtY2gtdWEnOiAnXCJHb29nbGUgQ2hyb21lXCI7dj1cIjEyM1wiLCBcIk5vdDpBLUJyYW5kXCI7dj1cIjhcIiwgXCJDaHJvbWl1bVwiO3Y9XCIxMjNcIicsIFxuICAgICAgICAnc2VjLWNoLXVhLW1vYmlsZSc6ICc/MCcsIFxuICAgICAgICAnc2VjLWNoLXVhLXBsYXRmb3JtJzogJ1wibWFjT1NcIicsIFxuICAgICAgICAnVXBncmFkZS1JbnNlY3VyZS1SZXF1ZXN0cyc6ICcxJywgXG4gICAgICAgICdDb25uZWN0aW9uJzogJ2tlZXAtYWxpdmUnLCBcbiAgICAgICAgJ1VzZXItQWdlbnQnOiAnTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTBfMTVfNykgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMy4wLjAuMCBTYWZhcmkvNTM3LjM2JywgXG4gICAgICAgICdTZWMtRmV0Y2gtU2l0ZSc6ICdzYW1lLW9yaWdpbicsIFxuICAgICAgICAnU2VjLUZldGNoLVVzZXInOiAnPzEnLCBcbiAgICAgICAgJ2hvc3QnOiAnbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tJywgXG4gICAgfSxcbiAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG59KTtcblxubGV0IGxvZ2luRGF0YSA9IHtcbiAgICAnX19FVkVOVFZBTElEQVRJT04nOiAnVUd3NllQTUJDMlViMndvRk9TS3R1RG5FYUFKWG1CZkhTYUs0MktSRzBqSExORnlxVnpqdkJ2dnlQcGhqM0xtM1lLZjNkejR2NVBjNWFPWXFNK1hVYllqWFhLdWZ2REllM2FINDdzMGhyL1ZLR09xVzI5UFZpaTJDdWFXeXRnRXZLQTUrMC94Z3hpeGRYOUd3L2p1Nml6UGhkWmRoWk92dnNOZm1Gd21keUNrPScsXG4gICAgJ19fVklFV1NUQVRFJzogJ3daSllBSjRhcGFTTkl5NnZwU2MzbGZkbkFxN0RpSVpMMUJyc1JXSnhmbDRhZzM2ZjM2TVBrSlBUcXVnR3dvNGU2YWJjTXg0QzNKeGZGeDVBY3B1bVhZQVArS1FiL0J5L0dQYzU0d1hRU000PScsXG4gICAgJ19fVklFV1NUQVRFR0VORVJBVE9SJzogJ0UxM0NFQ0IxJyxcbiAgICAnY3RsMDAkTWFpbkNvbnRlbnQkU3VibWl0MSc6ICdMb2dpbicsXG4gICAgJ2N0bDAwJE1haW5Db250ZW50JHBhc3N3b3JkJzogcHJvY2Vzcy5lbnYuUEFTU1dPUkQsXG4gICAgJ2N0bDAwJE1haW5Db250ZW50JHVzZXJuYW1lJzogcHJvY2Vzcy5lbnYuVVNFUk5BTUVcbn07XG5cbmxldCBsb2dpbkNvbmZpZyA9IHtcbiAgICBoZWFkZXJzOiB7IFxuICAgICAgICBcbiAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLCBcbiAgICAgICAgJ0FjY2VwdCc6ICd0ZXh0L2h0bWwsYXBwbGljYXRpb24veGh0bWwreG1sLGFwcGxpY2F0aW9uL3htbDtxPTAuOSxpbWFnZS9hdmlmLGltYWdlL3dlYnAsaW1hZ2UvYXBuZywqLyo7cT0wLjgsYXBwbGljYXRpb24vc2lnbmVkLWV4Y2hhbmdlO3Y9YjM7cT0wLjcnLCBcbiAgICAgICAgJ1NlYy1GZXRjaC1Nb2RlJzogJ25hdmlnYXRlJywgXG4gICAgICAgICdTZWMtRmV0Y2gtVXNlcic6ICc/MScsIFxuICAgICAgICAnU2VjLUZldGNoLURlc3QnOiAnZG9jdW1lbnQnLCBcbiAgICAgICAgJ2hvc3QnOiAnbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tJywgXG4gICAgfSxcbn07XG5cbmxldCBncmFkZWJvb2tEYXRhID0gJ3tcInJlcXVlc3RcIjp7XCJncmFkaW5nUGVyaW9kR1VcIjpcIjEwMjJFMUI2LUM3MDctNDk1RS04OUFCLUJGNDgxMUVEM0VGMVwiLFwiQUdVXCI6XCIwXCIsXCJvcmdZZWFyR1VcIjpcIjI3NzAxNDdGLTJBMUItNDRFMy04N0U4LTkwRUU1OENEODlFN1wiLFwic2Nob29sSURcIjoxOTksXCJtYXJrUGVyaW9kR1VcIjpcIjkwRDUxOTFFLUFCQjItNEY5NC1BMUEzLTE1OUE4MkE3OUI4MlwifX0nO1xuXG5cblxuY29uc3QgbG9naW5TZXNzaW9uID0gYXN5bmMoKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhcGkucG9zdChcIlBYUDJfTG9naW5fU3R1ZGVudC5hc3B4P3JlZ2VuZXJhdGVTZXNzaW9uSWQ9VHJ1ZVwiLCBsb2dpbkRhdGEsIGxvZ2luQ29uZmlnKVxuICAgIHJldHVybiAoYXdhaXQgcmVzcG9uc2UpLmhlYWRlcnNbJ3NldC1jb29raWUnXTtcbn1cblxuY29uc3QgZ3JhZGVib29rRmV0Y2ggPSBhc3luYyhjb29raWVBdXRoOiBhbnkpID0+IHtcbiAgICBsZXQgZ3JhZGVib29rQ29uZmlnID0ge1xuICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRydWUsXG4gICAgICAgIGhlYWRlcnM6IHsgXG4gICAgICAgICAgICAnQ29va2llJzogY29va2llQXV0aCArIFwiIEVFU19QVlVFPTEyMjQzMzUwNTMuMS4zMjg5ODk1MDQwLjUwMTgxOTM5MlwiLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JywgXG4gICAgICAgICAgICAnQWNjZXB0JzogJ3RleHQvaHRtbCxhcHBsaWNhdGlvbi94aHRtbCt4bWwsYXBwbGljYXRpb24veG1sO3E9MC45LGltYWdlL2F2aWYsaW1hZ2Uvd2VicCxpbWFnZS9hcG5nLCovKjtxPTAuOCxhcHBsaWNhdGlvbi9zaWduZWQtZXhjaGFuZ2U7dj1iMztxPTAuNycsIFxuICAgICAgICAgICAgJ1NlYy1GZXRjaC1Nb2RlJzogJ25hdmlnYXRlJywgXG4gICAgICAgICAgICAnU2VjLUZldGNoLVVzZXInOiAnPzEnLCBcbiAgICAgICAgICAgICdTZWMtRmV0Y2gtRGVzdCc6ICdkb2N1bWVudCcsIFxuICAgICAgICAgICAgJ2hvc3QnOiAnbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tJywgXG4gICAgICAgICAgICAnT3JpZ2luJzogJ2h0dHBzOi8vbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tJywgXG4gICAgICAgICAgICAnUmVmZXJlcic6ICdodHRwczovL21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbS9QWFAyX0dyYWRlQm9vay5hc3B4P0FHVT0wJyxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKGNvb2tpZUF1dGgpXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhcGkucG9zdChcInNlcnZpY2UvUFhQMkNvbW11bmljYXRpb24uYXNteC9HcmFkZWJvb2tGb2N1c0NsYXNzSW5mb1wiLCBncmFkZWJvb2tEYXRhLCBncmFkZWJvb2tDb25maWcpXG4gICAgcmV0dXJuIChhd2FpdCByZXNwb25zZSkuZGF0YTtcbn1cblxuY2xpZW50LnBvc3QoXCJQWFAyX0xvZ2luX1N0dWRlbnQuYXNweD9yZWdlbmVyYXRlU2Vzc2lvbklkPVRydWVcIiwgbG9naW5EYXRhLCBsb2dpbkNvbmZpZykudGhlbigoeyBjb25maWcgfSkgPT4ge1xuICAgIGlmIChjb25maWcuamFyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGNvbmZpZy5qYXIudG9KU09OKCkpO1xuICAgIH1cbiAgICBsZXQgZ3JhZGVib29rQ29uZmlnID0ge1xuICAgICAgICBqYXI6IGNvbmZpZy5qYXIsXG4gICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgaGVhZGVyczogeyBcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsIFxuICAgICAgICAgICAgJ0FjY2VwdCc6ICd0ZXh0L2h0bWwsYXBwbGljYXRpb24veGh0bWwreG1sLGFwcGxpY2F0aW9uL3htbDtxPTAuOSxpbWFnZS9hdmlmLGltYWdlL3dlYnAsaW1hZ2UvYXBuZywqLyo7cT0wLjgsYXBwbGljYXRpb24vc2lnbmVkLWV4Y2hhbmdlO3Y9YjM7cT0wLjcnLCBcbiAgICAgICAgICAgICdTZWMtRmV0Y2gtTW9kZSc6ICduYXZpZ2F0ZScsIFxuICAgICAgICAgICAgJ1NlYy1GZXRjaC1Vc2VyJzogJz8xJywgXG4gICAgICAgICAgICAnU2VjLUZldGNoLURlc3QnOiAnZG9jdW1lbnQnLCBcbiAgICAgICAgICAgICdob3N0JzogJ21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbScsIFxuICAgICAgICAgICAgJ09yaWdpbic6ICdodHRwczovL21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbScsIFxuICAgICAgICAgICAgJ1JlZmVyZXInOiAnaHR0cHM6Ly9tZC1tY3BzLXBzdi5lZHVwb2ludC5jb20vUFhQMl9HcmFkZUJvb2suYXNweD9BR1U9MCcsXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBjbGllbnQucG9zdChcInNlcnZpY2UvUFhQMkNvbW11bmljYXRpb24uYXNteC9HcmFkZWJvb2tGb2N1c0NsYXNzSW5mb1wiLCBncmFkZWJvb2tEYXRhLCBncmFkZWJvb2tDb25maWcpLnRoZW4oKHsgZGF0YSB9KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbiAgICB9KTtcbn0pO1xuXG4vLyBjb25zdCBzZXNzaW9uSWQgPSBsb2dpblNlc3Npb24oKVxuLy8gLnRoZW4oKGRhdGExKSA9PiB7XG4vLyAgICAgY29uc29sZS5sb2coZGF0YTEpXG4vLyAgICAgaWYgKGRhdGExKSB7XG4vLyAgICAgICAgIGNvbnN0IGdyYWRlID0gZ3JhZGVib29rRmV0Y2goZGF0YTFbMF0uc3BsaXQoJyAnKVswXSlcbi8vICAgICAgICAgLnRoZW4oKGRhdGEyKSA9PiB7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj8/XCIpXG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhMikpXG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIj8/P1wiKVxuLy8gICAgICAgICB9KTtcbi8vICAgICB9XG4vLyB9KTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFFQUEsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDQyxNQUFNLEVBQUU7RUFDMUI7O0VBS0FDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsUUFBUSxDQUFDO0VBQ2pDLE1BQU1DLEdBQUcsR0FBRyxJQUFJQyxzQkFBUyxFQUFFO0VBQzNCLE1BQU1DLE1BQU0sR0FBRyxJQUFBQyw4QkFBTyxFQUFDQyxjQUFLLENBQUNDLE1BQU0sQ0FBQztJQUNoQ0wsR0FBRyxFQUFFQSxHQUFHO0lBQ1JNLE9BQU8sRUFBRSxtQ0FBbUM7SUFDNUNDLE9BQU8sRUFBRTtNQUNMLFdBQVcsRUFBRSxrRUFBa0U7TUFDL0Usa0JBQWtCLEVBQUUsSUFBSTtNQUN4QixvQkFBb0IsRUFBRSxTQUFTO01BQy9CLDJC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