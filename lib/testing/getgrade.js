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
    global.getgrade = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_axios) {
  "use strict";

  _axios = _interopRequireDefault(_axios);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  let data = '{"FriendlyName":"genericdata.classdata","Method":"GetClassData","Parameters":"{}"}';
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://md-mcps-psv.edupoint.com/api/GB/ClientSideData/Transfer?action=genericdata.classdata-GetClassData',
    headers: {
      'Accept': 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'en-US,en;q=0.9',
      'CURRENT_WEB_PORTAL': 'StudentVUE',
      'Connection': 'keep-alive',
      'Content-Type': 'application/json; charset=UTF-8',
      'Cookie': 'PVUE=ENG; EES_PVUE=1863772000.1.3289898288.474140672; ASP.NET_SessionId=3qrgdjc0gk1lgkuwquuhmhly',
      'Origin': 'https://md-mcps-psv.edupoint.com',
      'Referer': 'https://md-mcps-psv.edupoint.com/PXP2_Gradebook.aspx?AGU=0&studentGU=F80D360F-12EE-4ED0-B70B-C80BE5E1A209&gradePeriodGU=1022E1B6-C707-495E-89AB-BF4811ED3EF1',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      'sec-ch-ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"'
    },
    data: data
  };
  _axios.default.request(config).then(response => {
    console.log(JSON.stringify(response.data));
  }).catch(error => {
    console.log(error);
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRhIiwiY29uZmlnIiwibWV0aG9kIiwibWF4Qm9keUxlbmd0aCIsIkluZmluaXR5IiwidXJsIiwiaGVhZGVycyIsImF4aW9zIiwicmVxdWVzdCIsInRoZW4iLCJyZXNwb25zZSIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiY2F0Y2giLCJlcnJvciJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0aW5nL2dldGdyYWRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmxldCBkYXRhID0gJ3tcIkZyaWVuZGx5TmFtZVwiOlwiZ2VuZXJpY2RhdGEuY2xhc3NkYXRhXCIsXCJNZXRob2RcIjpcIkdldENsYXNzRGF0YVwiLFwiUGFyYW1ldGVyc1wiOlwie31cIn0nO1xuXG5sZXQgY29uZmlnID0ge1xuICBtZXRob2Q6ICdwb3N0JyxcbiAgbWF4Qm9keUxlbmd0aDogSW5maW5pdHksXG4gIHVybDogJ2h0dHBzOi8vbWQtbWNwcy1wc3YuZWR1cG9pbnQuY29tL2FwaS9HQi9DbGllbnRTaWRlRGF0YS9UcmFuc2Zlcj9hY3Rpb249Z2VuZXJpY2RhdGEuY2xhc3NkYXRhLUdldENsYXNzRGF0YScsXG4gIGhlYWRlcnM6IHsgXG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQsICovKjsgcT0wLjAxJywgXG4gICAgJ0FjY2VwdC1MYW5ndWFnZSc6ICdlbi1VUyxlbjtxPTAuOScsIFxuICAgICdDVVJSRU5UX1dFQl9QT1JUQUwnOiAnU3R1ZGVudFZVRScsIFxuICAgICdDb25uZWN0aW9uJzogJ2tlZXAtYWxpdmUnLCBcbiAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLCBcbiAgICAnQ29va2llJzogJ1BWVUU9RU5HOyBFRVNfUFZVRT0xODYzNzcyMDAwLjEuMzI4OTg5ODI4OC40NzQxNDA2NzI7IEFTUC5ORVRfU2Vzc2lvbklkPTNxcmdkamMwZ2sxbGdrdXdxdXVobWhseScsIFxuICAgICdPcmlnaW4nOiAnaHR0cHM6Ly9tZC1tY3BzLXBzdi5lZHVwb2ludC5jb20nLCBcbiAgICAnUmVmZXJlcic6ICdodHRwczovL21kLW1jcHMtcHN2LmVkdXBvaW50LmNvbS9QWFAyX0dyYWRlYm9vay5hc3B4P0FHVT0wJnN0dWRlbnRHVT1GODBEMzYwRi0xMkVFLTRFRDAtQjcwQi1DODBCRTVFMUEyMDkmZ3JhZGVQZXJpb2RHVT0xMDIyRTFCNi1DNzA3LTQ5NUUtODlBQi1CRjQ4MTFFRDNFRjEnLCBcbiAgICAnU2VjLUZldGNoLURlc3QnOiAnZW1wdHknLCBcbiAgICAnU2VjLUZldGNoLU1vZGUnOiAnY29ycycsIFxuICAgICdTZWMtRmV0Y2gtU2l0ZSc6ICdzYW1lLW9yaWdpbicsIFxuICAgICdVc2VyLUFnZW50JzogJ01vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjMuMC4wLjAgU2FmYXJpLzUzNy4zNicsIFxuICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JywgXG4gICAgJ3NlYy1jaC11YSc6ICdcIkdvb2dsZSBDaHJvbWVcIjt2PVwiMTIzXCIsIFwiTm90OkEtQnJhbmRcIjt2PVwiOFwiLCBcIkNocm9taXVtXCI7dj1cIjEyM1wiJywgXG4gICAgJ3NlYy1jaC11YS1tb2JpbGUnOiAnPzAnLCBcbiAgICAnc2VjLWNoLXVhLXBsYXRmb3JtJzogJ1wibWFjT1NcIidcbiAgfSxcbiAgZGF0YSA6IGRhdGFcbn07XG5cbmF4aW9zLnJlcXVlc3QoY29uZmlnKVxuLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLmRhdGEpKTtcbn0pXG4uY2F0Y2goKGVycm9yKSA9PiB7XG4gIGNvbnNvbGUubG9nKGVycm9yKTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztFQUVBLElBQUlBLElBQUksR0FBRyxvRkFBb0Y7RUFFL0YsSUFBSUMsTUFBTSxHQUFHO0lBQ1hDLE1BQU0sRUFBRSxNQUFNO0lBQ2RDLGFBQWEsRUFBRUMsUUFBUTtJQUN2QkMsR0FBRyxFQUFFLDJHQUEyRztJQUNoSEMsT0FBTyxFQUFFO01BQ1AsUUFBUSxFQUFFLGdEQUFnRDtNQUMxRCxpQkFBaUIsRUFBRSxnQkFBZ0I7TUFDbkMsb0JBQW9CLEVBQUUsWUFBWTtNQUNsQyxZQUFZLEVBQUUsWUFBWTtNQUMxQixjQUFjLEVBQUUsaUNBQWlDO01BQ2pELFFBQVEsRUFBRSxrR0FBa0c7TUFDNUcsUUFBUSxFQUFFLGtDQUFrQztNQUM1QyxTQUFTLEVBQUUsOEpBQThKO01BQ3pLLGdCQUFnQixFQUFFLE9BQU87TUFDekIsZ0JBQWdCLEVBQUUsTUFBTTtNQUN4QixnQkFBZ0IsRUFBRSxhQUFhO01BQy9CLFlBQVksRUFBRSx1SEFBdUg7TUFDckksa0JBQWtCLEVBQUUsZ0JBQWdCO01BQ3BDLFdBQVcsRUFBRSxrRUFBa0U7TUFDL0Usa0JBQWtCLEVBQUUsSUFBSTtNQUN4QixvQkFBb0IsRUFBRTtJQUN4QixDQUFDO0lBQ0ROLElBQUksRUFBR0E7RUFDVCxDQUFDO0VBRURPLGNBQUssQ0FBQ0MsT0FBTyxDQUFDUCxNQUFNLENBQUMsQ0FDcEJRLElBQUksQ0FBRUMsUUFBUSxJQUFLO0lBQ2xCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDQyxTQUFTLENBQUNKLFFBQVEsQ0FBQ1YsSUFBSSxDQUFDLENBQUM7RUFDNUMsQ0FBQyxDQUFDLENBQ0RlLEtBQUssQ0FBRUMsS0FBSyxJQUFLO0lBQ2hCTCxPQUFPLENBQUNDLEdBQUcsQ0FBQ0ksS0FBSyxDQUFDO0VBQ3BCLENBQUMsQ0FBQztBQUFDIn0=