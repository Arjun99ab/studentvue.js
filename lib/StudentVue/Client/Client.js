(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../../utils/soap/soap", "../Message/Message", "date-fns", "../../Constants/EventType", "lodash", "../../Constants/ResourceType", "../ReportCard/ReportCard", "../Document/Document", "../RequestException/RequestException", "../../utils/XMLFactory/XMLFactory", "../../utils/cache/cache", "./Client.helpers"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../../utils/soap/soap"), require("../Message/Message"), require("date-fns"), require("../../Constants/EventType"), require("lodash"), require("../../Constants/ResourceType"), require("../ReportCard/ReportCard"), require("../Document/Document"), require("../RequestException/RequestException"), require("../../utils/XMLFactory/XMLFactory"), require("../../utils/cache/cache"), require("./Client.helpers"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.soap, global.Message, global.dateFns, global.EventType, global.lodash, global.ResourceType, global.ReportCard, global.Document, global.RequestException, global.XMLFactory, global.cache, global.Client);
    global.Client = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _soap, _Message, _dateFns, _EventType, _lodash, _ResourceType, _ReportCard, _Document, _RequestException, _XMLFactory, _cache, _Client) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _soap = _interopRequireDefault(_soap);
  _Message = _interopRequireDefault(_Message);
  _EventType = _interopRequireDefault(_EventType);
  _lodash = _interopRequireDefault(_lodash);
  _ResourceType = _interopRequireDefault(_ResourceType);
  _ReportCard = _interopRequireDefault(_ReportCard);
  _Document = _interopRequireDefault(_Document);
  _RequestException = _interopRequireDefault(_RequestException);
  _XMLFactory = _interopRequireDefault(_XMLFactory);
  _cache = _interopRequireDefault(_cache);
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  /**
   * The StudentVUE Client to access the API
   * @constructor
   * @extends {soap.Client}
   */
  class Client extends _soap.default.Client {
    constructor(credentials, hostUrl) {
      super(credentials);
      this.hostUrl = hostUrl;
    }

    /**
     * Validate's the user's credentials. It will throw an error if credentials are incorrect
     */
    validateCredentials() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'login test',
          validateErrors: false
        }).then(response => {
          if (response.RT_ERROR[0]['@_ERROR_MESSAGE'][0] === 'login test is not a valid method.') {
            res();
          } else rej(new _RequestException.default(response));
        }).catch(rej);
      });
    }

    /**
     * Gets the student's documents from synergy servers
     * @returns {Promise<Document[]>}> Returns a list of student documents
     * @description
     * ```js
     * const documents = await client.documents();
     * const document = documents[0];
     * const files = await document.get();
     * const base64collection = files.map((file) => file.base64);
     * ```
     */
    documents() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'GetStudentDocumentInitialData',
          paramStr: {
            childIntId: 0
          }
        }).then(xmlObject => {
          var _a = xmlObject['StudentDocuments'][0].StudentDocumentDatas[0].StudentDocumentData;
          var _f = xml => {
            return new _Document.default(xml, super.credentials);
          };
          var _r = [];
          for (var _i = 0; _i < _a.length; _i++) {
            _r.push(_f(_a[_i], _i, _a));
          }
          res(_r);
        }).catch(rej);
      });
    }

    /**
     * Gets a list of report cards
     * @returns {Promise<ReportCard[]>} Returns a list of report cards that can fetch a file
     * @description
     * ```js
     * const reportCards = await client.reportCards();
     * const files = await Promise.all(reportCards.map((card) => card.get()));
     * const base64arr = files.map((file) => file.base64); // ["JVBERi0...", "dUIoa1...", ...];
     * ```
     */
    reportCards() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'GetReportCardInitialData',
          paramStr: {
            childIntId: 0
          }
        }).then(xmlObject => {
          var _a2 = xmlObject.RCReportingPeriodData[0].RCReportingPeriods[0].RCReportingPeriod;
          var _f2 = xml => {
            return new _ReportCard.default(xml, super.credentials);
          };
          var _r2 = [];
          for (var _i2 = 0; _i2 < _a2.length; _i2++) {
            _r2.push(_f2(_a2[_i2], _i2, _a2));
          }
          res(_r2);
        }).catch(rej);
      });
    }

    /**
     * Gets the student's school's information
     * @returns {Promise<SchoolInfo>} Returns the information of the student's school
     * @description
     * ```js
     * await client.schoolInfo();
     *
     * client.schoolInfo().then((schoolInfo) => {
     *  console.log(_.uniq(schoolInfo.staff.map((staff) => staff.name))); // List all staff positions using lodash
     * })
     * ```
     */
    schoolInfo() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'StudentSchoolInfo',
          paramStr: {
            childIntID: 0
          }
        }).then(({
          StudentSchoolInfoListing: [xmlObject]
        }) => {
          var _a3 = xmlObject.StaffLists[0].StaffList;
          var _f3 = staff => {
            return {
              name: staff['@_Name'][0],
              email: staff['@_EMail'][0],
              staffGu: staff['@_StaffGU'][0],
              jobTitle: staff['@_Title'][0],
              extn: staff['@_Extn'][0],
              phone: staff['@_Phone'][0]
            };
          };
          var _r3 = [];
          for (var _i3 = 0; _i3 < _a3.length; _i3++) {
            _r3.push(_f3(_a3[_i3], _i3, _a3));
          }
          res({
            school: {
              address: xmlObject['@_SchoolAddress'][0],
              addressAlt: xmlObject['@_SchoolAddress2'][0],
              city: xmlObject['@_SchoolCity'][0],
              zipCode: xmlObject['@_SchoolZip'][0],
              phone: xmlObject['@_Phone'][0],
              altPhone: xmlObject['@_Phone2'][0],
              principal: {
                name: xmlObject['@_Principal'][0],
                email: xmlObject['@_PrincipalEmail'][0],
                staffGu: xmlObject['@_PrincipalGu'][0]
              }
            },
            staff: _r3
          });
        }).catch(rej);
      });
    }

    /**
     * Gets the schedule of the student
     * @param {number} termIndex The index of the term.
     * @returns {Promise<Schedule>} Returns the schedule of the student
     * @description
     * ```js
     * await schedule(0) // -> { term: { index: 0, name: '1st Qtr Progress' }, ... }
     * ```
     */
    schedule(termIndex) {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'StudentClassList',
          paramStr: {
            childIntId: 0,
            ...(termIndex != null ? {
              TermIndex: termIndex
            } : {})
          }
        }).then(xmlObject => {
          var _a4 = xmlObject.StudentClassSchedule[0].TermLists[0].TermListing;
          var _f4 = term => {
            return {
              date: {
                start: new Date(term['@_BeginDate'][0]),
                end: new Date(term['@_EndDate'][0])
              },
              index: Number(term['@_TermIndex'][0]),
              name: term['@_TermName'][0],
              schoolYearTermCodeGu: term['@_SchoolYearTrmCodeGU'][0]
            };
          };
          var _r4 = [];
          for (var _i4 = 0; _i4 < _a4.length; _i4++) {
            _r4.push(_f4(_a4[_i4], _i4, _a4));
          }
          res({
            term: {
              index: Number(xmlObject.StudentClassSchedule[0]['@_TermIndex'][0]),
              name: xmlObject.StudentClassSchedule[0]['@_TermIndexName'][0]
            },
            error: xmlObject.StudentClassSchedule[0]['@_ErrorMessage'][0],
            today: typeof xmlObject.StudentClassSchedule[0].TodayScheduleInfoData[0].SchoolInfos[0] !== 'string' ? xmlObject.StudentClassSchedule[0].TodayScheduleInfoData[0].SchoolInfos[0].SchoolInfo.map(school => {
              return {
                name: school['@_SchoolName'][0],
                bellScheduleName: school['@_BellSchedName'][0],
                classes: typeof school.Classes[0] !== 'string' ? school.Classes[0].ClassInfo.map(course => {
                  return {
                    period: Number(course['@_Period'][0]),
                    attendanceCode: course.AttendanceCode[0],
                    date: {
                      start: new Date(course['@_StartDate'][0]),
                      end: new Date(course['@_EndDate'][0])
                    },
                    name: course['@_ClassName'][0],
                    sectionGu: course['@_SectionGU'][0],
                    teacher: {
                      email: course['@_TeacherEmail'][0],
                      emailSubject: course['@_EmailSubject'][0],
                      name: course['@_TeacherName'][0],
                      staffGu: course['@_StaffGU'][0],
                      url: course['@_TeacherURL'][0]
                    },
                    url: course['@_ClassURL'][0],
                    time: {
                      start: (0, _dateFns.parse)(course['@_StartTime'][0], 'hh:mm a', Date.now()),
                      end: (0, _dateFns.parse)(course['@_EndTime'][0], 'hh:mm a', Date.now())
                    }
                  };
                }) : []
              };
            }) : [],
            classes: typeof xmlObject.StudentClassSchedule[0].ClassLists[0] !== 'string' ? xmlObject.StudentClassSchedule[0].ClassLists[0].ClassListing.map(studentClass => {
              return {
                name: studentClass['@_CourseTitle'][0],
                period: Number(studentClass['@_Period'][0]),
                room: studentClass['@_RoomName'][0],
                sectionGu: studentClass['@_SectionGU'][0],
                teacher: {
                  name: studentClass['@_Teacher'][0],
                  email: studentClass['@_TeacherEmail'][0],
                  staffGu: studentClass['@_TeacherStaffGU'][0]
                }
              };
            }) : [],
            terms: _r4
          });
        }).catch(rej);
      });
    }

    /**
     * Returns the attendance of the student
     * @returns {Promise<Attendance>} Returns an Attendance object
     * @description
     * ```js
     * client.attendance()
     *  .then(console.log); // -> { type: 'Period', period: {...}, schoolName: 'University High School', absences: [...], periodInfos: [...] }
     * ```
     */
    attendance() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'Attendance',
          paramStr: {
            childIntId: 0
          }
        }).then(attendanceXMLObject => {
          const xmlObject = attendanceXMLObject.Attendance[0];
          var _a5 = xmlObject.TotalActivities[0].PeriodTotal;
          var _f5 = (pd, i) => {
            return {
              period: Number(pd['@_Number'][0]),
              total: {
                excused: Number(xmlObject.TotalExcused[0].PeriodTotal[i]['@_Total'][0]),
                tardies: Number(xmlObject.TotalTardies[0].PeriodTotal[i]['@_Total'][0]),
                unexcused: Number(xmlObject.TotalUnexcused[0].PeriodTotal[i]['@_Total'][0]),
                activities: Number(xmlObject.TotalActivities[0].PeriodTotal[i]['@_Total'][0]),
                unexcusedTardies: Number(xmlObject.TotalUnexcusedTardies[0].PeriodTotal[i]['@_Total'][0])
              }
            };
          };
          var _r5 = [];
          for (var _i5 = 0; _i5 < _a5.length; _i5++) {
            _r5.push(_f5(_a5[_i5], _i5, _a5));
          }
          res({
            type: xmlObject['@_Type'][0],
            period: {
              total: Number(xmlObject['@_PeriodCount'][0]),
              start: Number(xmlObject['@_StartPeriod'][0]),
              end: Number(xmlObject['@_EndPeriod'][0])
            },
            schoolName: xmlObject['@_SchoolName'][0],
            absences: xmlObject.Absences[0].Absence ? xmlObject.Absences[0].Absence.map(absence => {
              return {
                date: new Date(absence['@_AbsenceDate'][0]),
                reason: absence['@_Reason'][0],
                note: absence['@_Note'][0],
                description: absence['@_CodeAllDayDescription'][0],
                periods: absence.Periods[0].Period.map(period => {
                  return {
                    period: Number(period['@_Number'][0]),
                    name: period['@_Name'][0],
                    reason: period['@_Reason'][0],
                    course: period['@_Course'][0],
                    staff: {
                      name: period['@_Staff'][0],
                      staffGu: period['@_StaffGU'][0],
                      email: period['@_StaffEMail'][0]
                    },
                    orgYearGu: period['@_OrgYearGU'][0]
                  };
                })
              };
            }) : [],
            periodInfos: _r5
          });
        }).catch(rej);
      });
    }

    /**
     * Returns the gradebook of the student
     * @param {number} reportingPeriodIndex The timeframe that the gradebook should return
     * @returns {Promise<Gradebook>} Returns a Gradebook object
     * @description
     * ```js
     * const gradebook = await client.gradebook();
     * console.log(gradebook); // { error: '', type: 'Traditional', reportingPeriod: {...}, courses: [...] };
     *
     * await client.gradebook(0) // Some schools will have ReportingPeriodIndex 0 as "1st Quarter Progress"
     * await client.gradebook(7) // Some schools will have ReportingPeriodIndex 7 as "4th Quarter"
     * ```
     */
    gradebook(reportingPeriodIndex) {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'Gradebook',
          paramStr: {
            childIntId: 0,
            ...(reportingPeriodIndex != null ? {
              ReportPeriod: reportingPeriodIndex
            } : {})
          }
        }, xml => {
          return new _XMLFactory.default(xml).encodeAttribute('MeasureDescription', 'HasDropBox').encodeAttribute('Measure', 'Type').toString();
        }).then(xmlObject => {
          var _a6 = xmlObject.Gradebook[0].ReportingPeriods[0].ReportPeriod;
          var _f6 = period => {
            return {
              date: {
                start: new Date(period['@_StartDate'][0]),
                end: new Date(period['@_EndDate'][0])
              },
              name: period['@_GradePeriod'][0],
              index: Number(period['@_Index'][0])
            };
          };
          var _r6 = [];
          for (var _i6 = 0; _i6 < _a6.length; _i6++) {
            _r6.push(_f6(_a6[_i6], _i6, _a6));
          }
          var _a7 = xmlObject.Gradebook[0].Courses[0].Course;
          var _f7 = course => {
            var _a8 = course.Marks[0].Mark;
            var _f8 = mark => {
              return {
                name: mark['@_MarkName'][0],
                calculatedScore: {
                  string: mark['@_CalculatedScoreString'][0],
                  raw: Number(mark['@_CalculatedScoreRaw'][0])
                },
                weightedCategories: typeof mark['GradeCalculationSummary'][0] !== 'string' ? mark['GradeCalculationSummary'][0].AssignmentGradeCalc.map(weighted => {
                  return {
                    type: weighted['@_Type'][0],
                    calculatedMark: weighted['@_CalculatedMark'][0],
                    weight: {
                      evaluated: weighted['@_WeightedPct'][0],
                      standard: weighted['@_Weight'][0]
                    },
                    points: {
                      current: Number(weighted['@_Points'][0]),
                      possible: Number(weighted['@_PointsPossible'][0])
                    }
                  };
                }) : [],
                assignments: typeof mark.Assignments[0] !== 'string' ? mark.Assignments[0].Assignment.map(assignment => {
                  return {
                    gradebookId: assignment['@_GradebookID'][0],
                    name: decodeURI(assignment['@_Measure'][0]),
                    type: assignment['@_Type'][0],
                    date: {
                      start: new Date(assignment['@_Date'][0]),
                      due: new Date(assignment['@_DueDate'][0])
                    },
                    score: {
                      type: assignment['@_ScoreType'][0],
                      value: assignment['@_Score'][0]
                    },
                    points: assignment['@_Points'][0],
                    notes: assignment['@_Notes'][0],
                    teacherId: assignment['@_TeacherID'][0],
                    description: decodeURI(assignment['@_MeasureDescription'][0]),
                    hasDropbox: JSON.parse(assignment['@_HasDropBox'][0]),
                    studentId: assignment['@_StudentID'][0],
                    dropboxDate: {
                      start: new Date(assignment['@_DropStartDate'][0]),
                      end: new Date(assignment['@_DropEndDate'][0])
                    },
                    resources: typeof assignment.Resources[0] !== 'string' ? assignment.Resources[0].Resource.map(rsrc => {
                      switch (rsrc['@_Type'][0]) {
                        case 'File':
                          {
                            const fileRsrc = rsrc;
                            return {
                              type: _ResourceType.default.FILE,
                              file: {
                                type: fileRsrc['@_FileType'][0],
                                name: fileRsrc['@_FileName'][0],
                                uri: this.hostUrl + fileRsrc['@_ServerFileName'][0]
                              },
                              resource: {
                                date: new Date(fileRsrc['@_ResourceDate'][0]),
                                id: fileRsrc['@_ResourceID'][0],
                                name: fileRsrc['@_ResourceName'][0]
                              }
                            };
                          }
                        case 'URL':
                          {
                            const urlRsrc = rsrc;
                            return {
                              url: urlRsrc['@_URL'][0],
                              type: _ResourceType.default.URL,
                              resource: {
                                date: new Date(urlRsrc['@_ResourceDate'][0]),
                                id: urlRsrc['@_ResourceID'][0],
                                name: urlRsrc['@_ResourceName'][0],
                                description: urlRsrc['@_ResourceDescription'][0]
                              },
                              path: urlRsrc['@_ServerFileName'][0]
                            };
                          }
                        default:
                          rej(`Type ${rsrc['@_Type'][0]} does not exist as a type. Add it to type declarations.`);
                      }
                    }) : []
                  };
                }) : []
              };
            };
            var _r8 = [];
            for (var _i8 = 0; _i8 < _a8.length; _i8++) {
              _r8.push(_f8(_a8[_i8], _i8, _a8));
            }
            return {
              period: Number(course['@_Period'][0]),
              title: course['@_Title'][0],
              room: course['@_Room'][0],
              staff: {
                name: course['@_Staff'][0],
                email: course['@_StaffEMail'][0],
                staffGu: course['@_StaffGU'][0]
              },
              marks: _r8
            };
          };
          var _r7 = [];
          for (var _i7 = 0; _i7 < _a7.length; _i7++) {
            _r7.push(_f7(_a7[_i7], _i7, _a7));
          }
          res({
            error: xmlObject.Gradebook[0]['@_ErrorMessage'][0],
            type: xmlObject.Gradebook[0]['@_Type'][0],
            reportingPeriod: {
              current: {
                index: reportingPeriodIndex ?? Number(xmlObject.Gradebook[0].ReportingPeriods[0].ReportPeriod.find(x => {
                  return x['@_GradePeriod'][0] === xmlObject.Gradebook[0].ReportingPeriod[0]['@_GradePeriod'][0];
                })?.['@_Index'][0]),
                date: {
                  start: new Date(xmlObject.Gradebook[0].ReportingPeriod[0]['@_StartDate'][0]),
                  end: new Date(xmlObject.Gradebook[0].ReportingPeriod[0]['@_EndDate'][0])
                },
                name: xmlObject.Gradebook[0].ReportingPeriod[0]['@_GradePeriod'][0]
              },
              available: _r6
            },
            courses: _r7
          });
        }).catch(rej);
      });
    }

    /**
     * Get a list of messages of the student
     * @returns {Promise<Message[]>} Returns an array of messages of the student
     * @description
     * ```js
     * await client.messages(); // -> [{ id: 'E972F1BC-99A0-4CD0-8D15-B18968B43E08', type: 'StudentActivity', ... }, { id: '86FDA11D-42C7-4249-B003-94B15EB2C8D4', type: 'StudentActivity', ... }]
     * ```
     */
    messages() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'GetPXPMessages',
          paramStr: {
            childIntId: 0
          }
        }, xml => {
          return new _XMLFactory.default(xml).encodeAttribute('Content', 'Read').toString();
        }).then(xmlObject => {
          var _a9 = xmlObject.PXPMessagesData[0].MessageListings[0].MessageListing;
          var _f9 = message => {
            return new _Message.default(message, super.credentials, this.hostUrl);
          };
          var _r9 = [];
          for (var _i9 = 0; _i9 < _a9.length; _i9++) {
            _r9.push(_f9(_a9[_i9], _i9, _a9));
          }
          res(_r9);
        }).catch(rej);
      });
    }

    /**
     * Gets the info of a student
     * @returns {Promise<StudentInfo>} StudentInfo object
     * @description
     * ```js
     * studentInfo().then(console.log) // -> { student: { name: 'Evan Davis', nickname: '', lastName: 'Davis' }, ...}
     * ```
     */
    studentInfo() {
      return new Promise((res, rej) => {
        super.processRequest({
          methodName: 'StudentInfo',
          paramStr: {
            childIntId: 0
          }
        }).then(xmlObjectData => {
          res({
            student: {
              name: xmlObjectData.StudentInfo[0].FormattedName[0],
              lastName: xmlObjectData.StudentInfo[0].LastNameGoesBy[0],
              nickname: xmlObjectData.StudentInfo[0].NickName[0]
            },
            birthDate: new Date(xmlObjectData.StudentInfo[0].BirthDate[0]),
            track: (0, _Client.optional)(xmlObjectData.StudentInfo[0].Track),
            address: (0, _Client.optional)(xmlObjectData.StudentInfo[0].Address),
            photo: (0, _Client.optional)(xmlObjectData.StudentInfo[0].Photo),
            counselor: xmlObjectData.StudentInfo[0].CounselorName && xmlObjectData.StudentInfo[0].CounselorEmail && xmlObjectData.StudentInfo[0].CounselorStaffGU ? {
              name: xmlObjectData.StudentInfo[0].CounselorName[0],
              email: xmlObjectData.StudentInfo[0].CounselorEmail[0],
              staffGu: xmlObjectData.StudentInfo[0].CounselorStaffGU[0]
            } : undefined,
            currentSchool: xmlObjectData.StudentInfo[0].CurrentSchool[0],
            dentist: xmlObjectData.StudentInfo[0].Dentist ? {
              name: xmlObjectData.StudentInfo[0].Dentist[0]['@_Name'][0],
              phone: xmlObjectData.StudentInfo[0].Dentist[0]['@_Phone'][0],
              extn: xmlObjectData.StudentInfo[0].Dentist[0]['@_Extn'][0],
              office: xmlObjectData.StudentInfo[0].Dentist[0]['@_Office'][0]
            } : undefined,
            physician: xmlObjectData.StudentInfo[0].Physician ? {
              name: xmlObjectData.StudentInfo[0].Physician[0]['@_Name'][0],
              phone: xmlObjectData.StudentInfo[0].Physician[0]['@_Phone'][0],
              extn: xmlObjectData.StudentInfo[0].Physician[0]['@_Extn'][0],
              hospital: xmlObjectData.StudentInfo[0].Physician[0]['@_Hospital'][0]
            } : undefined,
            id: (0, _Client.optional)(xmlObjectData.StudentInfo[0].PermID),
            orgYearGu: (0, _Client.optional)(xmlObjectData.StudentInfo[0].OrgYearGU),
            phone: (0, _Client.optional)(xmlObjectData.StudentInfo[0].Phone),
            email: (0, _Client.optional)(xmlObjectData.StudentInfo[0].EMail),
            emergencyContacts: xmlObjectData.StudentInfo[0].EmergencyContacts ? xmlObjectData.StudentInfo[0].EmergencyContacts[0].EmergencyContact.map(contact => {
              return {
                name: (0, _Client.optional)(contact['@_Name']),
                phone: {
                  home: (0, _Client.optional)(contact['@_HomePhone']),
                  mobile: (0, _Client.optional)(contact['@_MobilePhone']),
                  other: (0, _Client.optional)(contact['@_OtherPhone']),
                  work: (0, _Client.optional)(contact['@_WorkPhone'])
                },
                relationship: (0, _Client.optional)(contact['@_Relationship'])
              };
            }) : [],
            gender: (0, _Client.optional)(xmlObjectData.StudentInfo[0].Gender),
            grade: (0, _Client.optional)(xmlObjectData.StudentInfo[0].Grade),
            lockerInfoRecords: (0, _Client.optional)(xmlObjectData.StudentInfo[0].LockerInfoRecords),
            homeLanguage: (0, _Client.optional)(xmlObjectData.StudentInfo[0].HomeLanguage),
            homeRoom: (0, _Client.optional)(xmlObjectData.StudentInfo[0].HomeRoom),
            homeRoomTeacher: {
              email: (0, _Client.optional)(xmlObjectData.StudentInfo[0].HomeRoomTchEMail),
              name: (0, _Client.optional)(xmlObjectData.StudentInfo[0].HomeRoomTch),
              staffGu: (0, _Client.optional)(xmlObjectData.StudentInfo[0].HomeRoomTchStaffGU)
            },
            additionalInfo: xmlObjectData.StudentInfo[0].UserDefinedGroupBoxes[0].UserDefinedGroupBox ? xmlObjectData.StudentInfo[0].UserDefinedGroupBoxes[0].UserDefinedGroupBox.map(definedBox => {
              return {
                id: (0, _Client.optional)(definedBox['@_GroupBoxID']),
                // string | undefined
                type: definedBox['@_GroupBoxLabel'][0],
                // string
                vcId: (0, _Client.optional)(definedBox['@_VCID']),
                // string | undefined
                items: definedBox.UserDefinedItems[0].UserDefinedItem.map(item => {
                  return {
                    source: {
                      element: item['@_SourceElement'][0],
                      object: item['@_SourceObject'][0]
                    },
                    vcId: item['@_VCID'][0],
                    value: item['@_Value'][0],
                    type: item['@_ItemType'][0]
                  };
                })
              };
            }) : []
          });
        }).catch(rej);
      });
    }
    fetchEventsWithinInterval(date) {
      return super.processRequest({
        methodName: 'StudentCalendar',
        paramStr: {
          childIntId: 0,
          RequestDate: date.toISOString()
        }
      }, xml => {
        return new _XMLFactory.default(xml).encodeAttribute('Title', 'Icon').toString();
      });
    }

    /**
     *
     * @param {CalendarOptions} options Options to provide for calendar method. An interval is required.
     * @returns {Promise<Calendar>} Returns a Calendar object
     * @description
     * ```js
     * client.calendar({ interval: { start: new Date('5/1/2022'), end: new Date('8/1/2021') }, concurrency: null }); // -> Limitless concurrency (not recommended)
     *
     * const calendar = await client.calendar({ interval: { ... }});
     * console.log(calendar); // -> { schoolDate: {...}, outputRange: {...}, events: [...] }
     * ```
     */
    async calendar(options = {}) {
      const defaultOptions = {
        concurrency: 7,
        ...options
      };
      const cal = await _cache.default.memo(() => {
        return this.fetchEventsWithinInterval(new Date());
      });
      const schoolEndDate = options.interval?.end ?? new Date(cal.CalendarListing[0]['@_SchoolEndDate'][0]);
      const schoolStartDate = options.interval?.start ?? new Date(cal.CalendarListing[0]['@_SchoolBegDate'][0]);
      return new Promise((res, rej) => {
        const monthsWithinSchoolYear = (0, _dateFns.eachMonthOfInterval)({
          start: schoolStartDate,
          end: schoolEndDate
        });
        const getAllEventsWithinSchoolYear = () => {
          return defaultOptions.concurrency == null ? Promise.all(monthsWithinSchoolYear.map(date => {
            return this.fetchEventsWithinInterval(date);
          })) : (0, _Client.asyncPoolAll)(defaultOptions.concurrency, monthsWithinSchoolYear, date => {
            return this.fetchEventsWithinInterval(date);
          });
        };
        let memo = null;
        getAllEventsWithinSchoolYear().then(events => {
          const allEvents = events.reduce((prev, events) => {
            if (memo == null) {
              memo = {
                schoolDate: {
                  start: new Date(events.CalendarListing[0]['@_SchoolBegDate'][0]),
                  end: new Date(events.CalendarListing[0]['@_SchoolEndDate'][0])
                },
                outputRange: {
                  start: schoolStartDate,
                  end: schoolEndDate
                },
                events: []
              };
            }
            const rest = {
              ...memo,
              // This is to prevent re-initializing Date objects in order to improve performance
              events: [...(prev.events ? prev.events : []), ...(typeof events.CalendarListing[0].EventLists[0] !== 'string' ? events.CalendarListing[0].EventLists[0].EventList.map(event => {
                switch (event['@_DayType'][0]) {
                  case _EventType.default.ASSIGNMENT:
                    {
                      const assignmentEvent = event;
                      return {
                        title: decodeURI(assignmentEvent['@_Title'][0]),
                        addLinkData: assignmentEvent['@_AddLinkData'][0],
                        agu: assignmentEvent['@_AGU'] ? assignmentEvent['@_AGU'][0] : undefined,
                        date: new Date(assignmentEvent['@_Date'][0]),
                        dgu: assignmentEvent['@_DGU'][0],
                        link: assignmentEvent['@_Link'][0],
                        startTime: assignmentEvent['@_StartTime'][0],
                        type: _EventType.default.ASSIGNMENT,
                        viewType: assignmentEvent['@_ViewType'][0]
                      };
                    }
                  case _EventType.default.HOLIDAY:
                    {
                      return {
                        title: decodeURI(event['@_Title'][0]),
                        type: _EventType.default.HOLIDAY,
                        startTime: event['@_StartTime'][0],
                        date: new Date(event['@_Date'][0])
                      };
                    }
                  case _EventType.default.REGULAR:
                    {
                      const regularEvent = event;
                      return {
                        title: decodeURI(regularEvent['@_Title'][0]),
                        agu: regularEvent['@_AGU'] ? regularEvent['@_AGU'][0] : undefined,
                        date: new Date(regularEvent['@_Date'][0]),
                        description: regularEvent['@_EvtDescription'] ? regularEvent['@_EvtDescription'][0] : undefined,
                        dgu: regularEvent['@_DGU'] ? regularEvent['@_DGU'][0] : undefined,
                        link: regularEvent['@_Link'] ? regularEvent['@_Link'][0] : undefined,
                        startTime: regularEvent['@_StartTime'][0],
                        type: _EventType.default.REGULAR,
                        viewType: regularEvent['@_ViewType'] ? regularEvent['@_ViewType'][0] : undefined,
                        addLinkData: regularEvent['@_AddLinkData'] ? regularEvent['@_AddLinkData'][0] : undefined
                      };
                    }
                }
              }) : [])]
            };
            return rest;
          }, {});
          res({
            ...allEvents,
            events: _lodash.default.uniqBy(allEvents.events, item => {
              return item.title;
            })
          });
        }).catch(rej);
      });
    }
  }
  _exports.default = Client;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDbGllbnQiLCJzb2FwIiwiY29uc3RydWN0b3IiLCJjcmVkZW50aWFscyIsImhvc3RVcmwiLCJ2YWxpZGF0ZUNyZWRlbnRpYWxzIiwiUHJvbWlzZSIsInJlcyIsInJlaiIsInByb2Nlc3NSZXF1ZXN0IiwibWV0aG9kTmFtZSIsInZhbGlkYXRlRXJyb3JzIiwidGhlbiIsInJlc3BvbnNlIiwiUlRfRVJST1IiLCJSZXF1ZXN0RXhjZXB0aW9uIiwiY2F0Y2giLCJkb2N1bWVudHMiLCJwYXJhbVN0ciIsImNoaWxkSW50SWQiLCJ4bWxPYmplY3QiLCJTdHVkZW50RG9jdW1lbnREYXRhcyIsIlN0dWRlbnREb2N1bWVudERhdGEiLCJ4bWwiLCJEb2N1bWVudCIsInJlcG9ydENhcmRzIiwiUkNSZXBvcnRpbmdQZXJpb2REYXRhIiwiUkNSZXBvcnRpbmdQZXJpb2RzIiwiUkNSZXBvcnRpbmdQZXJpb2QiLCJSZXBvcnRDYXJkIiwic2Nob29sSW5mbyIsImNoaWxkSW50SUQiLCJTdHVkZW50U2Nob29sSW5mb0xpc3RpbmciLCJTdGFmZkxpc3RzIiwiU3RhZmZMaXN0Iiwic3RhZmYiLCJuYW1lIiwiZW1haWwiLCJzdGFmZkd1Iiwiam9iVGl0bGUiLCJleHRuIiwicGhvbmUiLCJzY2hvb2wiLCJhZGRyZXNzIiwiYWRkcmVzc0FsdCIsImNpdHkiLCJ6aXBDb2RlIiwiYWx0UGhvbmUiLCJwcmluY2lwYWwiLCJzY2hlZHVsZSIsInRlcm1JbmRleCIsIlRlcm1JbmRleCIsIlN0dWRlbnRDbGFzc1NjaGVkdWxlIiwiVGVybUxpc3RzIiwiVGVybUxpc3RpbmciLCJ0ZXJtIiwiZGF0ZSIsInN0YXJ0IiwiRGF0ZSIsImVuZCIsImluZGV4IiwiTnVtYmVyIiwic2Nob29sWWVhclRlcm1Db2RlR3UiLCJlcnJvciIsInRvZGF5IiwiVG9kYXlTY2hlZHVsZUluZm9EYXRhIiwiU2Nob29sSW5mb3MiLCJTY2hvb2xJbmZvIiwibWFwIiwiYmVsbFNjaGVkdWxlTmFtZSIsImNsYXNzZXMiLCJDbGFzc2VzIiwiQ2xhc3NJbmZvIiwiY291cnNlIiwicGVyaW9kIiwiYXR0ZW5kYW5jZUNvZGUiLCJBdHRlbmRhbmNlQ29kZSIsInNlY3Rpb25HdSIsInRlYWNoZXIiLCJlbWFpbFN1YmplY3QiLCJ1cmwiLCJ0aW1lIiwicGFyc2UiLCJub3ciLCJDbGFzc0xpc3RzIiwiQ2xhc3NMaXN0aW5nIiwic3R1ZGVudENsYXNzIiwicm9vbSIsInRlcm1zIiwiYXR0ZW5kYW5jZSIsImF0dGVuZGFuY2VYTUxPYmplY3QiLCJBdHRlbmRhbmNlIiwiVG90YWxBY3Rpdml0aWVzIiwiUGVyaW9kVG90YWwiLCJwZCIsImkiLCJ0b3RhbCIsImV4Y3VzZWQiLCJUb3RhbEV4Y3VzZWQiLCJ0YXJkaWVzIiwiVG90YWxUYXJkaWVzIiwidW5leGN1c2VkIiwiVG90YWxVbmV4Y3VzZWQiLCJhY3Rpdml0aWVzIiwidW5leGN1c2VkVGFyZGllcyIsIlRvdGFsVW5leGN1c2VkVGFyZGllcyIsInR5cGUiLCJzY2hvb2xOYW1lIiwiYWJzZW5jZXMiLCJBYnNlbmNlcyIsIkFic2VuY2UiLCJhYnNlbmNlIiwicmVhc29uIiwibm90ZSIsImRlc2NyaXB0aW9uIiwicGVyaW9kcyIsIlBlcmlvZHMiLCJQZXJpb2QiLCJvcmdZZWFyR3UiLCJwZXJpb2RJbmZvcyIsImdyYWRlYm9vayIsInJlcG9ydGluZ1BlcmlvZEluZGV4IiwiUmVwb3J0UGVyaW9kIiwiWE1MRmFjdG9yeSIsImVuY29kZUF0dHJpYnV0ZSIsInRvU3RyaW5nIiwiR3JhZGVib29rIiwiUmVwb3J0aW5nUGVyaW9kcyIsIkNvdXJzZXMiLCJDb3Vyc2UiLCJNYXJrcyIsIk1hcmsiLCJtYXJrIiwiY2FsY3VsYXRlZFNjb3JlIiwic3RyaW5nIiwicmF3Iiwid2VpZ2h0ZWRDYXRlZ29yaWVzIiwiQXNzaWdubWVudEdyYWRlQ2FsYyIsIndlaWdodGVkIiwiY2FsY3VsYXRlZE1hcmsiLCJ3ZWlnaHQiLCJldmFsdWF0ZWQiLCJzdGFuZGFyZCIsInBvaW50cyIsImN1cnJlbnQiLCJwb3NzaWJsZSIsImFzc2lnbm1lbnRzIiwiQXNzaWdubWVudHMiLCJBc3NpZ25tZW50IiwiYXNzaWdubWVudCIsImdyYWRlYm9va0lkIiwiZGVjb2RlVVJJIiwiZHVlIiwic2NvcmUiLCJ2YWx1ZSIsIm5vdGVzIiwidGVhY2hlcklkIiwiaGFzRHJvcGJveCIsIkpTT04iLCJzdHVkZW50SWQiLCJkcm9wYm94RGF0ZSIsInJlc291cmNlcyIsIlJlc291cmNlcyIsIlJlc291cmNlIiwicnNyYyIsImZpbGVSc3JjIiwiUmVzb3VyY2VUeXBlIiwiRklMRSIsImZpbGUiLCJ1cmkiLCJyZXNvdXJjZSIsImlkIiwidXJsUnNyYyIsIlVSTCIsInBhdGgiLCJ0aXRsZSIsIm1hcmtzIiwicmVwb3J0aW5nUGVyaW9kIiwiZmluZCIsIngiLCJSZXBvcnRpbmdQZXJpb2QiLCJhdmFpbGFibGUiLCJjb3Vyc2VzIiwibWVzc2FnZXMiLCJQWFBNZXNzYWdlc0RhdGEiLCJNZXNzYWdlTGlzdGluZ3MiLCJNZXNzYWdlTGlzdGluZyIsIm1lc3NhZ2UiLCJNZXNzYWdlIiwic3R1ZGVudEluZm8iLCJ4bWxPYmplY3REYXRhIiwic3R1ZGVudCIsIlN0dWRlbnRJbmZvIiwiRm9ybWF0dGVkTmFtZSIsImxhc3ROYW1lIiwiTGFzdE5hbWVHb2VzQnkiLCJuaWNrbmFtZSIsIk5pY2tOYW1lIiwiYmlydGhEYXRlIiwiQmlydGhEYXRlIiwidHJhY2siLCJvcHRpb25hbCIsIlRyYWNrIiwiQWRkcmVzcyIsInBob3RvIiwiUGhvdG8iLCJjb3Vuc2Vsb3IiLCJDb3Vuc2Vsb3JOYW1lIiwiQ291bnNlbG9yRW1haWwiLCJDb3Vuc2Vsb3JTdGFmZkdVIiwidW5kZWZpbmVkIiwiY3VycmVudFNjaG9vbCIsIkN1cnJlbnRTY2hvb2wiLCJkZW50aXN0IiwiRGVudGlzdCIsIm9mZmljZSIsInBoeXNpY2lhbiIsIlBoeXNpY2lhbiIsImhvc3BpdGFsIiwiUGVybUlEIiwiT3JnWWVhckdVIiwiUGhvbmUiLCJFTWFpbCIsImVtZXJnZW5jeUNvbnRhY3RzIiwiRW1lcmdlbmN5Q29udGFjdHMiLCJFbWVyZ2VuY3lDb250YWN0IiwiY29udGFjdCIsImhvbWUiLCJtb2JpbGUiLCJvdGhlciIsIndvcmsiLCJyZWxhdGlvbnNoaXAiLCJnZW5kZXIiLCJHZW5kZXIiLCJncmFkZSIsIkdyYWRlIiwibG9ja2VySW5mb1JlY29yZHMiLCJMb2NrZXJJbmZvUmVjb3JkcyIsImhvbWVMYW5ndWFnZSIsIkhvbWVMYW5ndWFnZSIsImhvbWVSb29tIiwiSG9tZVJvb20iLCJob21lUm9vbVRlYWNoZXIiLCJIb21lUm9vbVRjaEVNYWlsIiwiSG9tZVJvb21UY2giLCJIb21lUm9vbVRjaFN0YWZmR1UiLCJhZGRpdGlvbmFsSW5mbyIsIlVzZXJEZWZpbmVkR3JvdXBCb3hlcyIsIlVzZXJEZWZpbmVkR3JvdXBCb3giLCJkZWZpbmVkQm94IiwidmNJZCIsIml0ZW1zIiwiVXNlckRlZmluZWRJdGVtcyIsIlVzZXJEZWZpbmVkSXRlbSIsIml0ZW0iLCJzb3VyY2UiLCJlbGVtZW50Iiwib2JqZWN0IiwiZmV0Y2hFdmVudHNXaXRoaW5JbnRlcnZhbCIsIlJlcXVlc3REYXRlIiwidG9JU09TdHJpbmciLCJjYWxlbmRhciIsIm9wdGlvbnMiLCJkZWZhdWx0T3B0aW9ucyIsImNvbmN1cnJlbmN5IiwiY2FsIiwiY2FjaGUiLCJtZW1vIiwic2Nob29sRW5kRGF0ZSIsImludGVydmFsIiwiQ2FsZW5kYXJMaXN0aW5nIiwic2Nob29sU3RhcnREYXRlIiwibW9udGhzV2l0aGluU2Nob29sWWVhciIsImVhY2hNb250aE9mSW50ZXJ2YWwiLCJnZXRBbGxFdmVudHNXaXRoaW5TY2hvb2xZZWFyIiwiYWxsIiwiYXN5bmNQb29sQWxsIiwiZXZlbnRzIiwiYWxsRXZlbnRzIiwicmVkdWNlIiwicHJldiIsInNjaG9vbERhdGUiLCJvdXRwdXRSYW5nZSIsInJlc3QiLCJFdmVudExpc3RzIiwiRXZlbnRMaXN0IiwiZXZlbnQiLCJFdmVudFR5cGUiLCJBU1NJR05NRU5UIiwiYXNzaWdubWVudEV2ZW50IiwiYWRkTGlua0RhdGEiLCJhZ3UiLCJkZ3UiLCJsaW5rIiwic3RhcnRUaW1lIiwidmlld1R5cGUiLCJIT0xJREFZIiwiUkVHVUxBUiIsInJlZ3VsYXJFdmVudCIsIl8iLCJ1bmlxQnkiXSwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU3R1ZGVudFZ1ZS9DbGllbnQvQ2xpZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2luQ3JlZGVudGlhbHMsIFBhcnNlZFJlcXVlc3RFcnJvciB9IGZyb20gJy4uLy4uL3V0aWxzL3NvYXAvQ2xpZW50L0NsaWVudC5pbnRlcmZhY2VzJztcbmltcG9ydCBzb2FwIGZyb20gJy4uLy4uL3V0aWxzL3NvYXAvc29hcCc7XG5pbXBvcnQgeyBBZGRpdGlvbmFsSW5mbywgQWRkaXRpb25hbEluZm9JdGVtLCBDbGFzc1NjaGVkdWxlSW5mbywgU2Nob29sSW5mbywgU3R1ZGVudEluZm8gfSBmcm9tICcuL0NsaWVudC5pbnRlcmZhY2VzJztcbmltcG9ydCB7IFN0dWRlbnRJbmZvWE1MT2JqZWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzL3htbC9TdHVkZW50SW5mbyc7XG5pbXBvcnQgTWVzc2FnZSBmcm9tICcuLi9NZXNzYWdlL01lc3NhZ2UnO1xuaW1wb3J0IHsgTWVzc2FnZVhNTE9iamVjdCB9IGZyb20gJy4uL01lc3NhZ2UvTWVzc2FnZS54bWwnO1xuaW1wb3J0IHsgQXNzaWdubWVudEV2ZW50WE1MT2JqZWN0LCBDYWxlbmRhclhNTE9iamVjdCwgUmVndWxhckV2ZW50WE1MT2JqZWN0IH0gZnJvbSAnLi9JbnRlcmZhY2VzL3htbC9DYWxlbmRhcic7XG5pbXBvcnQgeyBBc3NpZ25tZW50RXZlbnQsIENhbGVuZGFyLCBDYWxlbmRhck9wdGlvbnMsIEV2ZW50LCBIb2xpZGF5RXZlbnQsIFJlZ3VsYXJFdmVudCB9IGZyb20gJy4vSW50ZXJmYWNlcy9DYWxlbmRhcic7XG5pbXBvcnQgeyBlYWNoTW9udGhPZkludGVydmFsLCBwYXJzZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7IEZpbGVSZXNvdXJjZVhNTE9iamVjdCwgR3JhZGVib29rWE1MT2JqZWN0LCBVUkxSZXNvdXJjZVhNTE9iamVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcy94bWwvR3JhZGVib29rJztcbmltcG9ydCB7IEF0dGVuZGFuY2VYTUxPYmplY3QgfSBmcm9tICcuL0ludGVyZmFjZXMveG1sL0F0dGVuZGFuY2UnO1xuaW1wb3J0IEV2ZW50VHlwZSBmcm9tICcuLi8uLi9Db25zdGFudHMvRXZlbnRUeXBlJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBBc3NpZ25tZW50LCBGaWxlUmVzb3VyY2UsIEdyYWRlYm9vaywgTWFyaywgVVJMUmVzb3VyY2UsIFdlaWdodGVkQ2F0ZWdvcnkgfSBmcm9tICcuL0ludGVyZmFjZXMvR3JhZGVib29rJztcbmltcG9ydCBSZXNvdXJjZVR5cGUgZnJvbSAnLi4vLi4vQ29uc3RhbnRzL1Jlc291cmNlVHlwZSc7XG5pbXBvcnQgeyBBYnNlbnRQZXJpb2QsIEF0dGVuZGFuY2UsIFBlcmlvZEluZm8gfSBmcm9tICcuL0ludGVyZmFjZXMvQXR0ZW5kYW5jZSc7XG5pbXBvcnQgeyBTY2hlZHVsZVhNTE9iamVjdCB9IGZyb20gJy4vSW50ZXJmYWNlcy94bWwvU2NoZWR1bGUnO1xuaW1wb3J0IHsgU2NoZWR1bGUgfSBmcm9tICcuL0NsaWVudC5pbnRlcmZhY2VzJztcbmltcG9ydCB7IFNjaG9vbEluZm9YTUxPYmplY3QgfSBmcm9tICcuL0ludGVyZmFjZXMveG1sL1NjaG9vbEluZm8nO1xuaW1wb3J0IHsgUmVwb3J0Q2FyZHNYTUxPYmplY3QgfSBmcm9tICcuLi9SZXBvcnRDYXJkL1JlcG9ydENhcmQueG1sJztcbmltcG9ydCB7IERvY3VtZW50WE1MT2JqZWN0IH0gZnJvbSAnLi4vRG9jdW1lbnQvRG9jdW1lbnQueG1sJztcbmltcG9ydCBSZXBvcnRDYXJkIGZyb20gJy4uL1JlcG9ydENhcmQvUmVwb3J0Q2FyZCc7XG5pbXBvcnQgRG9jdW1lbnQgZnJvbSAnLi4vRG9jdW1lbnQvRG9jdW1lbnQnO1xuaW1wb3J0IFJlcXVlc3RFeGNlcHRpb24gZnJvbSAnLi4vUmVxdWVzdEV4Y2VwdGlvbi9SZXF1ZXN0RXhjZXB0aW9uJztcbmltcG9ydCBYTUxGYWN0b3J5IGZyb20gJy4uLy4uL3V0aWxzL1hNTEZhY3RvcnkvWE1MRmFjdG9yeSc7XG5pbXBvcnQgY2FjaGUgZnJvbSAnLi4vLi4vdXRpbHMvY2FjaGUvY2FjaGUnO1xuaW1wb3J0IHsgb3B0aW9uYWwsIGFzeW5jUG9vbEFsbCB9IGZyb20gJy4vQ2xpZW50LmhlbHBlcnMnO1xuXG4vKipcbiAqIFRoZSBTdHVkZW50VlVFIENsaWVudCB0byBhY2Nlc3MgdGhlIEFQSVxuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyB7c29hcC5DbGllbnR9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCBleHRlbmRzIHNvYXAuQ2xpZW50IHtcbiAgcHJpdmF0ZSBob3N0VXJsOiBzdHJpbmc7XG4gIGNvbnN0cnVjdG9yKGNyZWRlbnRpYWxzOiBMb2dpbkNyZWRlbnRpYWxzLCBob3N0VXJsOiBzdHJpbmcpIHtcbiAgICBzdXBlcihjcmVkZW50aWFscyk7XG4gICAgdGhpcy5ob3N0VXJsID0gaG9zdFVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSdzIHRoZSB1c2VyJ3MgY3JlZGVudGlhbHMuIEl0IHdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgY3JlZGVudGlhbHMgYXJlIGluY29ycmVjdFxuICAgKi9cbiAgcHVibGljIHZhbGlkYXRlQ3JlZGVudGlhbHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgc3VwZXJcbiAgICAgICAgLnByb2Nlc3NSZXF1ZXN0PFBhcnNlZFJlcXVlc3RFcnJvcj4oeyBtZXRob2ROYW1lOiAnbG9naW4gdGVzdCcsIHZhbGlkYXRlRXJyb3JzOiBmYWxzZSB9KVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICBpZiAocmVzcG9uc2UuUlRfRVJST1JbMF1bJ0BfRVJST1JfTUVTU0FHRSddWzBdID09PSAnbG9naW4gdGVzdCBpcyBub3QgYSB2YWxpZCBtZXRob2QuJykgcmVzKCk7XG4gICAgICAgICAgZWxzZSByZWoobmV3IFJlcXVlc3RFeGNlcHRpb24ocmVzcG9uc2UpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlaik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc3R1ZGVudCdzIGRvY3VtZW50cyBmcm9tIHN5bmVyZ3kgc2VydmVyc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxEb2N1bWVudFtdPn0+IFJldHVybnMgYSBsaXN0IG9mIHN0dWRlbnQgZG9jdW1lbnRzXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBgYGBqc1xuICAgKiBjb25zdCBkb2N1bWVudHMgPSBhd2FpdCBjbGllbnQuZG9jdW1lbnRzKCk7XG4gICAqIGNvbnN0IGRvY3VtZW50ID0gZG9jdW1lbnRzWzBdO1xuICAgKiBjb25zdCBmaWxlcyA9IGF3YWl0IGRvY3VtZW50LmdldCgpO1xuICAgKiBjb25zdCBiYXNlNjRjb2xsZWN0aW9uID0gZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLmJhc2U2NCk7XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIGRvY3VtZW50cygpOiBQcm9taXNlPERvY3VtZW50W10+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICBzdXBlclxuICAgICAgICAucHJvY2Vzc1JlcXVlc3Q8RG9jdW1lbnRYTUxPYmplY3Q+KHtcbiAgICAgICAgICBtZXRob2ROYW1lOiAnR2V0U3R1ZGVudERvY3VtZW50SW5pdGlhbERhdGEnLFxuICAgICAgICAgIHBhcmFtU3RyOiB7IGNoaWxkSW50SWQ6IDAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHhtbE9iamVjdCkgPT4ge1xuICAgICAgICAgIHJlcyhcbiAgICAgICAgICAgIHhtbE9iamVjdFsnU3R1ZGVudERvY3VtZW50cyddWzBdLlN0dWRlbnREb2N1bWVudERhdGFzWzBdLlN0dWRlbnREb2N1bWVudERhdGEubWFwKFxuICAgICAgICAgICAgICAoeG1sKSA9PiBuZXcgRG9jdW1lbnQoeG1sLCBzdXBlci5jcmVkZW50aWFscylcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiByZXBvcnQgY2FyZHNcbiAgICogQHJldHVybnMge1Byb21pc2U8UmVwb3J0Q2FyZFtdPn0gUmV0dXJucyBhIGxpc3Qgb2YgcmVwb3J0IGNhcmRzIHRoYXQgY2FuIGZldGNoIGEgZmlsZVxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgcmVwb3J0Q2FyZHMgPSBhd2FpdCBjbGllbnQucmVwb3J0Q2FyZHMoKTtcbiAgICogY29uc3QgZmlsZXMgPSBhd2FpdCBQcm9taXNlLmFsbChyZXBvcnRDYXJkcy5tYXAoKGNhcmQpID0+IGNhcmQuZ2V0KCkpKTtcbiAgICogY29uc3QgYmFzZTY0YXJyID0gZmlsZXMubWFwKChmaWxlKSA9PiBmaWxlLmJhc2U2NCk7IC8vIFtcIkpWQkVSaTAuLi5cIiwgXCJkVUlvYTEuLi5cIiwgLi4uXTtcbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgcmVwb3J0Q2FyZHMoKTogUHJvbWlzZTxSZXBvcnRDYXJkW10+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICBzdXBlclxuICAgICAgICAucHJvY2Vzc1JlcXVlc3Q8UmVwb3J0Q2FyZHNYTUxPYmplY3Q+KHtcbiAgICAgICAgICBtZXRob2ROYW1lOiAnR2V0UmVwb3J0Q2FyZEluaXRpYWxEYXRhJyxcbiAgICAgICAgICBwYXJhbVN0cjogeyBjaGlsZEludElkOiAwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh4bWxPYmplY3QpID0+IHtcbiAgICAgICAgICByZXMoXG4gICAgICAgICAgICB4bWxPYmplY3QuUkNSZXBvcnRpbmdQZXJpb2REYXRhWzBdLlJDUmVwb3J0aW5nUGVyaW9kc1swXS5SQ1JlcG9ydGluZ1BlcmlvZC5tYXAoXG4gICAgICAgICAgICAgICh4bWwpID0+IG5ldyBSZXBvcnRDYXJkKHhtbCwgc3VwZXIuY3JlZGVudGlhbHMpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlaik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc3R1ZGVudCdzIHNjaG9vbCdzIGluZm9ybWF0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPFNjaG9vbEluZm8+fSBSZXR1cm5zIHRoZSBpbmZvcm1hdGlvbiBvZiB0aGUgc3R1ZGVudCdzIHNjaG9vbFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogYGBganNcbiAgICogYXdhaXQgY2xpZW50LnNjaG9vbEluZm8oKTtcbiAgICpcbiAgICogY2xpZW50LnNjaG9vbEluZm8oKS50aGVuKChzY2hvb2xJbmZvKSA9PiB7XG4gICAqICBjb25zb2xlLmxvZyhfLnVuaXEoc2Nob29sSW5mby5zdGFmZi5tYXAoKHN0YWZmKSA9PiBzdGFmZi5uYW1lKSkpOyAvLyBMaXN0IGFsbCBzdGFmZiBwb3NpdGlvbnMgdXNpbmcgbG9kYXNoXG4gICAqIH0pXG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHNjaG9vbEluZm8oKTogUHJvbWlzZTxTY2hvb2xJbmZvPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgc3VwZXJcbiAgICAgICAgLnByb2Nlc3NSZXF1ZXN0PFNjaG9vbEluZm9YTUxPYmplY3Q+KHtcbiAgICAgICAgICBtZXRob2ROYW1lOiAnU3R1ZGVudFNjaG9vbEluZm8nLFxuICAgICAgICAgIHBhcmFtU3RyOiB7IGNoaWxkSW50SUQ6IDAgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHsgU3R1ZGVudFNjaG9vbEluZm9MaXN0aW5nOiBbeG1sT2JqZWN0XSB9KSA9PiB7XG4gICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgIHNjaG9vbDoge1xuICAgICAgICAgICAgICBhZGRyZXNzOiB4bWxPYmplY3RbJ0BfU2Nob29sQWRkcmVzcyddWzBdLFxuICAgICAgICAgICAgICBhZGRyZXNzQWx0OiB4bWxPYmplY3RbJ0BfU2Nob29sQWRkcmVzczInXVswXSxcbiAgICAgICAgICAgICAgY2l0eTogeG1sT2JqZWN0WydAX1NjaG9vbENpdHknXVswXSxcbiAgICAgICAgICAgICAgemlwQ29kZTogeG1sT2JqZWN0WydAX1NjaG9vbFppcCddWzBdLFxuICAgICAgICAgICAgICBwaG9uZTogeG1sT2JqZWN0WydAX1Bob25lJ11bMF0sXG4gICAgICAgICAgICAgIGFsdFBob25lOiB4bWxPYmplY3RbJ0BfUGhvbmUyJ11bMF0sXG4gICAgICAgICAgICAgIHByaW5jaXBhbDoge1xuICAgICAgICAgICAgICAgIG5hbWU6IHhtbE9iamVjdFsnQF9QcmluY2lwYWwnXVswXSxcbiAgICAgICAgICAgICAgICBlbWFpbDogeG1sT2JqZWN0WydAX1ByaW5jaXBhbEVtYWlsJ11bMF0sXG4gICAgICAgICAgICAgICAgc3RhZmZHdTogeG1sT2JqZWN0WydAX1ByaW5jaXBhbEd1J11bMF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhZmY6IHhtbE9iamVjdC5TdGFmZkxpc3RzWzBdLlN0YWZmTGlzdC5tYXAoKHN0YWZmKSA9PiAoe1xuICAgICAgICAgICAgICBuYW1lOiBzdGFmZlsnQF9OYW1lJ11bMF0sXG4gICAgICAgICAgICAgIGVtYWlsOiBzdGFmZlsnQF9FTWFpbCddWzBdLFxuICAgICAgICAgICAgICBzdGFmZkd1OiBzdGFmZlsnQF9TdGFmZkdVJ11bMF0sXG4gICAgICAgICAgICAgIGpvYlRpdGxlOiBzdGFmZlsnQF9UaXRsZSddWzBdLFxuICAgICAgICAgICAgICBleHRuOiBzdGFmZlsnQF9FeHRuJ11bMF0sXG4gICAgICAgICAgICAgIHBob25lOiBzdGFmZlsnQF9QaG9uZSddWzBdLFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzY2hlZHVsZSBvZiB0aGUgc3R1ZGVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gdGVybUluZGV4IFRoZSBpbmRleCBvZiB0aGUgdGVybS5cbiAgICogQHJldHVybnMge1Byb21pc2U8U2NoZWR1bGU+fSBSZXR1cm5zIHRoZSBzY2hlZHVsZSBvZiB0aGUgc3R1ZGVudFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogYGBganNcbiAgICogYXdhaXQgc2NoZWR1bGUoMCkgLy8gLT4geyB0ZXJtOiB7IGluZGV4OiAwLCBuYW1lOiAnMXN0IFF0ciBQcm9ncmVzcycgfSwgLi4uIH1cbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgc2NoZWR1bGUodGVybUluZGV4PzogbnVtYmVyKTogUHJvbWlzZTxTY2hlZHVsZT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHN1cGVyXG4gICAgICAgIC5wcm9jZXNzUmVxdWVzdDxTY2hlZHVsZVhNTE9iamVjdD4oe1xuICAgICAgICAgIG1ldGhvZE5hbWU6ICdTdHVkZW50Q2xhc3NMaXN0JyxcbiAgICAgICAgICBwYXJhbVN0cjogeyBjaGlsZEludElkOiAwLCAuLi4odGVybUluZGV4ICE9IG51bGwgPyB7IFRlcm1JbmRleDogdGVybUluZGV4IH0gOiB7fSkgfSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHhtbE9iamVjdCkgPT4ge1xuICAgICAgICAgIHJlcyh7XG4gICAgICAgICAgICB0ZXJtOiB7XG4gICAgICAgICAgICAgIGluZGV4OiBOdW1iZXIoeG1sT2JqZWN0LlN0dWRlbnRDbGFzc1NjaGVkdWxlWzBdWydAX1Rlcm1JbmRleCddWzBdKSxcbiAgICAgICAgICAgICAgbmFtZTogeG1sT2JqZWN0LlN0dWRlbnRDbGFzc1NjaGVkdWxlWzBdWydAX1Rlcm1JbmRleE5hbWUnXVswXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvcjogeG1sT2JqZWN0LlN0dWRlbnRDbGFzc1NjaGVkdWxlWzBdWydAX0Vycm9yTWVzc2FnZSddWzBdLFxuICAgICAgICAgICAgdG9kYXk6XG4gICAgICAgICAgICAgIHR5cGVvZiB4bWxPYmplY3QuU3R1ZGVudENsYXNzU2NoZWR1bGVbMF0uVG9kYXlTY2hlZHVsZUluZm9EYXRhWzBdLlNjaG9vbEluZm9zWzBdICE9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgID8geG1sT2JqZWN0LlN0dWRlbnRDbGFzc1NjaGVkdWxlWzBdLlRvZGF5U2NoZWR1bGVJbmZvRGF0YVswXS5TY2hvb2xJbmZvc1swXS5TY2hvb2xJbmZvLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHNjaG9vbCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzY2hvb2xbJ0BfU2Nob29sTmFtZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgIGJlbGxTY2hlZHVsZU5hbWU6IHNjaG9vbFsnQF9CZWxsU2NoZWROYW1lJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NlczpcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBzY2hvb2wuQ2xhc3Nlc1swXSAhPT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyBzY2hvb2wuQ2xhc3Nlc1swXS5DbGFzc0luZm8ubWFwPENsYXNzU2NoZWR1bGVJbmZvPigoY291cnNlKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVyaW9kOiBOdW1iZXIoY291cnNlWydAX1BlcmlvZCddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dGVuZGFuY2VDb2RlOiBjb3Vyc2UuQXR0ZW5kYW5jZUNvZGVbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZShjb3Vyc2VbJ0BfU3RhcnREYXRlJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKGNvdXJzZVsnQF9FbmREYXRlJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGNvdXJzZVsnQF9DbGFzc05hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb25HdTogY291cnNlWydAX1NlY3Rpb25HVSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVhY2hlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogY291cnNlWydAX1RlYWNoZXJFbWFpbCddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbFN1YmplY3Q6IGNvdXJzZVsnQF9FbWFpbFN1YmplY3QnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogY291cnNlWydAX1RlYWNoZXJOYW1lJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWZmR3U6IGNvdXJzZVsnQF9TdGFmZkdVJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogY291cnNlWydAX1RlYWNoZXJVUkwnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IGNvdXJzZVsnQF9DbGFzc1VSTCddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogcGFyc2UoY291cnNlWydAX1N0YXJ0VGltZSddWzBdLCAnaGg6bW0gYScsIERhdGUubm93KCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IHBhcnNlKGNvdXJzZVsnQF9FbmRUaW1lJ11bMF0sICdoaDptbSBhJywgRGF0ZS5ub3coKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICBjbGFzc2VzOlxuICAgICAgICAgICAgICB0eXBlb2YgeG1sT2JqZWN0LlN0dWRlbnRDbGFzc1NjaGVkdWxlWzBdLkNsYXNzTGlzdHNbMF0gIT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgPyB4bWxPYmplY3QuU3R1ZGVudENsYXNzU2NoZWR1bGVbMF0uQ2xhc3NMaXN0c1swXS5DbGFzc0xpc3RpbmcubWFwKChzdHVkZW50Q2xhc3MpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHN0dWRlbnRDbGFzc1snQF9Db3Vyc2VUaXRsZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICBwZXJpb2Q6IE51bWJlcihzdHVkZW50Q2xhc3NbJ0BfUGVyaW9kJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICByb29tOiBzdHVkZW50Q2xhc3NbJ0BfUm9vbU5hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgc2VjdGlvbkd1OiBzdHVkZW50Q2xhc3NbJ0BfU2VjdGlvbkdVJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgIHRlYWNoZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBzdHVkZW50Q2xhc3NbJ0BfVGVhY2hlciddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBzdHVkZW50Q2xhc3NbJ0BfVGVhY2hlckVtYWlsJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgc3RhZmZHdTogc3R1ZGVudENsYXNzWydAX1RlYWNoZXJTdGFmZkdVJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgdGVybXM6IHhtbE9iamVjdC5TdHVkZW50Q2xhc3NTY2hlZHVsZVswXS5UZXJtTGlzdHNbMF0uVGVybUxpc3RpbmcubWFwKCh0ZXJtKSA9PiAoe1xuICAgICAgICAgICAgICBkYXRlOiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHRlcm1bJ0BfQmVnaW5EYXRlJ11bMF0pLFxuICAgICAgICAgICAgICAgIGVuZDogbmV3IERhdGUodGVybVsnQF9FbmREYXRlJ11bMF0pLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBpbmRleDogTnVtYmVyKHRlcm1bJ0BfVGVybUluZGV4J11bMF0pLFxuICAgICAgICAgICAgICBuYW1lOiB0ZXJtWydAX1Rlcm1OYW1lJ11bMF0sXG4gICAgICAgICAgICAgIHNjaG9vbFllYXJUZXJtQ29kZUd1OiB0ZXJtWydAX1NjaG9vbFllYXJUcm1Db2RlR1UnXVswXSxcbiAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlaik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXR0ZW5kYW5jZSBvZiB0aGUgc3R1ZGVudFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxBdHRlbmRhbmNlPn0gUmV0dXJucyBhbiBBdHRlbmRhbmNlIG9iamVjdFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogYGBganNcbiAgICogY2xpZW50LmF0dGVuZGFuY2UoKVxuICAgKiAgLnRoZW4oY29uc29sZS5sb2cpOyAvLyAtPiB7IHR5cGU6ICdQZXJpb2QnLCBwZXJpb2Q6IHsuLi59LCBzY2hvb2xOYW1lOiAnVW5pdmVyc2l0eSBIaWdoIFNjaG9vbCcsIGFic2VuY2VzOiBbLi4uXSwgcGVyaW9kSW5mb3M6IFsuLi5dIH1cbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgYXR0ZW5kYW5jZSgpOiBQcm9taXNlPEF0dGVuZGFuY2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICBzdXBlclxuICAgICAgICAucHJvY2Vzc1JlcXVlc3Q8QXR0ZW5kYW5jZVhNTE9iamVjdD4oe1xuICAgICAgICAgIG1ldGhvZE5hbWU6ICdBdHRlbmRhbmNlJyxcbiAgICAgICAgICBwYXJhbVN0cjoge1xuICAgICAgICAgICAgY2hpbGRJbnRJZDogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoYXR0ZW5kYW5jZVhNTE9iamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHhtbE9iamVjdCA9IGF0dGVuZGFuY2VYTUxPYmplY3QuQXR0ZW5kYW5jZVswXTtcblxuICAgICAgICAgIHJlcyh7XG4gICAgICAgICAgICB0eXBlOiB4bWxPYmplY3RbJ0BfVHlwZSddWzBdLFxuICAgICAgICAgICAgcGVyaW9kOiB7XG4gICAgICAgICAgICAgIHRvdGFsOiBOdW1iZXIoeG1sT2JqZWN0WydAX1BlcmlvZENvdW50J11bMF0pLFxuICAgICAgICAgICAgICBzdGFydDogTnVtYmVyKHhtbE9iamVjdFsnQF9TdGFydFBlcmlvZCddWzBdKSxcbiAgICAgICAgICAgICAgZW5kOiBOdW1iZXIoeG1sT2JqZWN0WydAX0VuZFBlcmlvZCddWzBdKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY2hvb2xOYW1lOiB4bWxPYmplY3RbJ0BfU2Nob29sTmFtZSddWzBdLFxuICAgICAgICAgICAgYWJzZW5jZXM6IHhtbE9iamVjdC5BYnNlbmNlc1swXS5BYnNlbmNlXG4gICAgICAgICAgICAgID8geG1sT2JqZWN0LkFic2VuY2VzWzBdLkFic2VuY2UubWFwKChhYnNlbmNlKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoYWJzZW5jZVsnQF9BYnNlbmNlRGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgIHJlYXNvbjogYWJzZW5jZVsnQF9SZWFzb24nXVswXSxcbiAgICAgICAgICAgICAgICAgIG5vdGU6IGFic2VuY2VbJ0BfTm90ZSddWzBdLFxuICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGFic2VuY2VbJ0BfQ29kZUFsbERheURlc2NyaXB0aW9uJ11bMF0sXG4gICAgICAgICAgICAgICAgICBwZXJpb2RzOiBhYnNlbmNlLlBlcmlvZHNbMF0uUGVyaW9kLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKHBlcmlvZCkgPT5cbiAgICAgICAgICAgICAgICAgICAgICAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVyaW9kOiBOdW1iZXIocGVyaW9kWydAX051bWJlciddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHBlcmlvZFsnQF9OYW1lJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFzb246IHBlcmlvZFsnQF9SZWFzb24nXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdXJzZTogcGVyaW9kWydAX0NvdXJzZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhZmY6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcGVyaW9kWydAX1N0YWZmJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWZmR3U6IHBlcmlvZFsnQF9TdGFmZkdVJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVtYWlsOiBwZXJpb2RbJ0BfU3RhZmZFTWFpbCddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZ1llYXJHdTogcGVyaW9kWydAX09yZ1llYXJHVSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgIH0gYXMgQWJzZW50UGVyaW9kKVxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgOiBbXSxcbiAgICAgICAgICAgIHBlcmlvZEluZm9zOiB4bWxPYmplY3QuVG90YWxBY3Rpdml0aWVzWzBdLlBlcmlvZFRvdGFsLm1hcCgocGQsIGkpID0+ICh7XG4gICAgICAgICAgICAgIHBlcmlvZDogTnVtYmVyKHBkWydAX051bWJlciddWzBdKSxcbiAgICAgICAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICAgICAgICBleGN1c2VkOiBOdW1iZXIoeG1sT2JqZWN0LlRvdGFsRXhjdXNlZFswXS5QZXJpb2RUb3RhbFtpXVsnQF9Ub3RhbCddWzBdKSxcbiAgICAgICAgICAgICAgICB0YXJkaWVzOiBOdW1iZXIoeG1sT2JqZWN0LlRvdGFsVGFyZGllc1swXS5QZXJpb2RUb3RhbFtpXVsnQF9Ub3RhbCddWzBdKSxcbiAgICAgICAgICAgICAgICB1bmV4Y3VzZWQ6IE51bWJlcih4bWxPYmplY3QuVG90YWxVbmV4Y3VzZWRbMF0uUGVyaW9kVG90YWxbaV1bJ0BfVG90YWwnXVswXSksXG4gICAgICAgICAgICAgICAgYWN0aXZpdGllczogTnVtYmVyKHhtbE9iamVjdC5Ub3RhbEFjdGl2aXRpZXNbMF0uUGVyaW9kVG90YWxbaV1bJ0BfVG90YWwnXVswXSksXG4gICAgICAgICAgICAgICAgdW5leGN1c2VkVGFyZGllczogTnVtYmVyKHhtbE9iamVjdC5Ub3RhbFVuZXhjdXNlZFRhcmRpZXNbMF0uUGVyaW9kVG90YWxbaV1bJ0BfVG90YWwnXVswXSksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KSkgYXMgUGVyaW9kSW5mb1tdLFxuICAgICAgICAgIH0gYXMgQXR0ZW5kYW5jZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWopO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGdyYWRlYm9vayBvZiB0aGUgc3R1ZGVudFxuICAgKiBAcGFyYW0ge251bWJlcn0gcmVwb3J0aW5nUGVyaW9kSW5kZXggVGhlIHRpbWVmcmFtZSB0aGF0IHRoZSBncmFkZWJvb2sgc2hvdWxkIHJldHVyblxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxHcmFkZWJvb2s+fSBSZXR1cm5zIGEgR3JhZGVib29rIG9iamVjdFxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogYGBganNcbiAgICogY29uc3QgZ3JhZGVib29rID0gYXdhaXQgY2xpZW50LmdyYWRlYm9vaygpO1xuICAgKiBjb25zb2xlLmxvZyhncmFkZWJvb2spOyAvLyB7IGVycm9yOiAnJywgdHlwZTogJ1RyYWRpdGlvbmFsJywgcmVwb3J0aW5nUGVyaW9kOiB7Li4ufSwgY291cnNlczogWy4uLl0gfTtcbiAgICpcbiAgICogYXdhaXQgY2xpZW50LmdyYWRlYm9vaygwKSAvLyBTb21lIHNjaG9vbHMgd2lsbCBoYXZlIFJlcG9ydGluZ1BlcmlvZEluZGV4IDAgYXMgXCIxc3QgUXVhcnRlciBQcm9ncmVzc1wiXG4gICAqIGF3YWl0IGNsaWVudC5ncmFkZWJvb2soNykgLy8gU29tZSBzY2hvb2xzIHdpbGwgaGF2ZSBSZXBvcnRpbmdQZXJpb2RJbmRleCA3IGFzIFwiNHRoIFF1YXJ0ZXJcIlxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBncmFkZWJvb2socmVwb3J0aW5nUGVyaW9kSW5kZXg/OiBudW1iZXIpOiBQcm9taXNlPEdyYWRlYm9vaz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgIHN1cGVyXG4gICAgICAgIC5wcm9jZXNzUmVxdWVzdDxHcmFkZWJvb2tYTUxPYmplY3Q+KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1ldGhvZE5hbWU6ICdHcmFkZWJvb2snLFxuICAgICAgICAgICAgcGFyYW1TdHI6IHtcbiAgICAgICAgICAgICAgY2hpbGRJbnRJZDogMCxcbiAgICAgICAgICAgICAgLi4uKHJlcG9ydGluZ1BlcmlvZEluZGV4ICE9IG51bGwgPyB7IFJlcG9ydFBlcmlvZDogcmVwb3J0aW5nUGVyaW9kSW5kZXggfSA6IHt9KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoeG1sKSA9PlxuICAgICAgICAgICAgbmV3IFhNTEZhY3RvcnkoeG1sKVxuICAgICAgICAgICAgICAuZW5jb2RlQXR0cmlidXRlKCdNZWFzdXJlRGVzY3JpcHRpb24nLCAnSGFzRHJvcEJveCcpXG4gICAgICAgICAgICAgIC5lbmNvZGVBdHRyaWJ1dGUoJ01lYXN1cmUnLCAnVHlwZScpXG4gICAgICAgICAgICAgIC50b1N0cmluZygpXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKHhtbE9iamVjdDogR3JhZGVib29rWE1MT2JqZWN0KSA9PiB7XG4gICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgIGVycm9yOiB4bWxPYmplY3QuR3JhZGVib29rWzBdWydAX0Vycm9yTWVzc2FnZSddWzBdLFxuICAgICAgICAgICAgdHlwZTogeG1sT2JqZWN0LkdyYWRlYm9va1swXVsnQF9UeXBlJ11bMF0sXG4gICAgICAgICAgICByZXBvcnRpbmdQZXJpb2Q6IHtcbiAgICAgICAgICAgICAgY3VycmVudDoge1xuICAgICAgICAgICAgICAgIGluZGV4OlxuICAgICAgICAgICAgICAgICAgcmVwb3J0aW5nUGVyaW9kSW5kZXggPz9cbiAgICAgICAgICAgICAgICAgIE51bWJlcihcbiAgICAgICAgICAgICAgICAgICAgeG1sT2JqZWN0LkdyYWRlYm9va1swXS5SZXBvcnRpbmdQZXJpb2RzWzBdLlJlcG9ydFBlcmlvZC5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgICh4KSA9PiB4WydAX0dyYWRlUGVyaW9kJ11bMF0gPT09IHhtbE9iamVjdC5HcmFkZWJvb2tbMF0uUmVwb3J0aW5nUGVyaW9kWzBdWydAX0dyYWRlUGVyaW9kJ11bMF1cbiAgICAgICAgICAgICAgICAgICAgKT8uWydAX0luZGV4J11bMF1cbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgZGF0ZToge1xuICAgICAgICAgICAgICAgICAgc3RhcnQ6IG5ldyBEYXRlKHhtbE9iamVjdC5HcmFkZWJvb2tbMF0uUmVwb3J0aW5nUGVyaW9kWzBdWydAX1N0YXJ0RGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgIGVuZDogbmV3IERhdGUoeG1sT2JqZWN0LkdyYWRlYm9va1swXS5SZXBvcnRpbmdQZXJpb2RbMF1bJ0BfRW5kRGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5hbWU6IHhtbE9iamVjdC5HcmFkZWJvb2tbMF0uUmVwb3J0aW5nUGVyaW9kWzBdWydAX0dyYWRlUGVyaW9kJ11bMF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGF2YWlsYWJsZTogeG1sT2JqZWN0LkdyYWRlYm9va1swXS5SZXBvcnRpbmdQZXJpb2RzWzBdLlJlcG9ydFBlcmlvZC5tYXAoKHBlcmlvZCkgPT4gKHtcbiAgICAgICAgICAgICAgICBkYXRlOiB7IHN0YXJ0OiBuZXcgRGF0ZShwZXJpb2RbJ0BfU3RhcnREYXRlJ11bMF0pLCBlbmQ6IG5ldyBEYXRlKHBlcmlvZFsnQF9FbmREYXRlJ11bMF0pIH0sXG4gICAgICAgICAgICAgICAgbmFtZTogcGVyaW9kWydAX0dyYWRlUGVyaW9kJ11bMF0sXG4gICAgICAgICAgICAgICAgaW5kZXg6IE51bWJlcihwZXJpb2RbJ0BfSW5kZXgnXVswXSksXG4gICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb3Vyc2VzOiB4bWxPYmplY3QuR3JhZGVib29rWzBdLkNvdXJzZXNbMF0uQ291cnNlLm1hcCgoY291cnNlKSA9PiAoe1xuICAgICAgICAgICAgICBwZXJpb2Q6IE51bWJlcihjb3Vyc2VbJ0BfUGVyaW9kJ11bMF0pLFxuICAgICAgICAgICAgICB0aXRsZTogY291cnNlWydAX1RpdGxlJ11bMF0sXG4gICAgICAgICAgICAgIHJvb206IGNvdXJzZVsnQF9Sb29tJ11bMF0sXG4gICAgICAgICAgICAgIHN0YWZmOiB7XG4gICAgICAgICAgICAgICAgbmFtZTogY291cnNlWydAX1N0YWZmJ11bMF0sXG4gICAgICAgICAgICAgICAgZW1haWw6IGNvdXJzZVsnQF9TdGFmZkVNYWlsJ11bMF0sXG4gICAgICAgICAgICAgICAgc3RhZmZHdTogY291cnNlWydAX1N0YWZmR1UnXVswXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWFya3M6IGNvdXJzZS5NYXJrc1swXS5NYXJrLm1hcCgobWFyaykgPT4gKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBtYXJrWydAX01hcmtOYW1lJ11bMF0sXG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlZFNjb3JlOiB7XG4gICAgICAgICAgICAgICAgICBzdHJpbmc6IG1hcmtbJ0BfQ2FsY3VsYXRlZFNjb3JlU3RyaW5nJ11bMF0sXG4gICAgICAgICAgICAgICAgICByYXc6IE51bWJlcihtYXJrWydAX0NhbGN1bGF0ZWRTY29yZVJhdyddWzBdKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlaWdodGVkQ2F0ZWdvcmllczpcbiAgICAgICAgICAgICAgICAgIHR5cGVvZiBtYXJrWydHcmFkZUNhbGN1bGF0aW9uU3VtbWFyeSddWzBdICE9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgICA/IG1hcmtbJ0dyYWRlQ2FsY3VsYXRpb25TdW1tYXJ5J11bMF0uQXNzaWdubWVudEdyYWRlQ2FsYy5tYXAoXG4gICAgICAgICAgICAgICAgICAgICAgICAod2VpZ2h0ZWQpID0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogd2VpZ2h0ZWRbJ0BfVHlwZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGN1bGF0ZWRNYXJrOiB3ZWlnaHRlZFsnQF9DYWxjdWxhdGVkTWFyayddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGVkOiB3ZWlnaHRlZFsnQF9XZWlnaHRlZFBjdCddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhbmRhcmQ6IHdlaWdodGVkWydAX1dlaWdodCddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50OiBOdW1iZXIod2VpZ2h0ZWRbJ0BfUG9pbnRzJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zc2libGU6IE51bWJlcih3ZWlnaHRlZFsnQF9Qb2ludHNQb3NzaWJsZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIFdlaWdodGVkQ2F0ZWdvcnkpXG4gICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgIGFzc2lnbm1lbnRzOlxuICAgICAgICAgICAgICAgICAgdHlwZW9mIG1hcmsuQXNzaWdubWVudHNbMF0gIT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gKG1hcmsuQXNzaWdubWVudHNbMF0uQXNzaWdubWVudC5tYXAoKGFzc2lnbm1lbnQpID0+ICh7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkZWJvb2tJZDogYXNzaWdubWVudFsnQF9HcmFkZWJvb2tJRCddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGVjb2RlVVJJKGFzc2lnbm1lbnRbJ0BfTWVhc3VyZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGFzc2lnbm1lbnRbJ0BfVHlwZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUoYXNzaWdubWVudFsnQF9EYXRlJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBkdWU6IG5ldyBEYXRlKGFzc2lnbm1lbnRbJ0BfRHVlRGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBhc3NpZ25tZW50WydAX1Njb3JlVHlwZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYXNzaWdubWVudFsnQF9TY29yZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czogYXNzaWdubWVudFsnQF9Qb2ludHMnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdGVzOiBhc3NpZ25tZW50WydAX05vdGVzJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZWFjaGVySWQ6IGFzc2lnbm1lbnRbJ0BfVGVhY2hlcklEJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVjb2RlVVJJKGFzc2lnbm1lbnRbJ0BfTWVhc3VyZURlc2NyaXB0aW9uJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRHJvcGJveDogSlNPTi5wYXJzZShhc3NpZ25tZW50WydAX0hhc0Ryb3BCb3gnXVswXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50SWQ6IGFzc2lnbm1lbnRbJ0BfU3R1ZGVudElEJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkcm9wYm94RGF0ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogbmV3IERhdGUoYXNzaWdubWVudFsnQF9Ecm9wU3RhcnREYXRlJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKGFzc2lnbm1lbnRbJ0BfRHJvcEVuZERhdGUnXVswXSksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2YgYXNzaWdubWVudC5SZXNvdXJjZXNbMF0gIT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoYXNzaWdubWVudC5SZXNvdXJjZXNbMF0uUmVzb3VyY2UubWFwKChyc3JjKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocnNyY1snQF9UeXBlJ11bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdGaWxlJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlsZVJzcmMgPSByc3JjIGFzIEZpbGVSZXNvdXJjZVhNTE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFJlc291cmNlVHlwZS5GSUxFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlsZVJzcmNbJ0BfRmlsZVR5cGUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWxlUnNyY1snQF9GaWxlTmFtZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVyaTogdGhpcy5ob3N0VXJsICsgZmlsZVJzcmNbJ0BfU2VydmVyRmlsZU5hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShmaWxlUnNyY1snQF9SZXNvdXJjZURhdGUnXVswXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGZpbGVSc3JjWydAX1Jlc291cmNlSUQnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmaWxlUnNyY1snQF9SZXNvdXJjZU5hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgRmlsZVJlc291cmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdVUkwnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmxSc3JjID0gcnNyYyBhcyBVUkxSZXNvdXJjZVhNTE9iamVjdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVybDogdXJsUnNyY1snQF9VUkwnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogUmVzb3VyY2VUeXBlLlVSTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSh1cmxSc3JjWydAX1Jlc291cmNlRGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogdXJsUnNyY1snQF9SZXNvdXJjZUlEJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdXJsUnNyY1snQF9SZXNvdXJjZU5hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogdXJsUnNyY1snQF9SZXNvdXJjZURlc2NyaXB0aW9uJ11bMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHVybFJzcmNbJ0BfU2VydmVyRmlsZU5hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgVVJMUmVzb3VyY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWooXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBUeXBlICR7cnNyY1snQF9UeXBlJ11bMF19IGRvZXMgbm90IGV4aXN0IGFzIGEgdHlwZS4gQWRkIGl0IHRvIHR5cGUgZGVjbGFyYXRpb25zLmBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pIGFzIChGaWxlUmVzb3VyY2UgfCBVUkxSZXNvdXJjZSlbXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgIH0pKSBhcyBBc3NpZ25tZW50W10pXG4gICAgICAgICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICAgIH0pKSBhcyBNYXJrW10sXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgfSBhcyBHcmFkZWJvb2spO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBsaXN0IG9mIG1lc3NhZ2VzIG9mIHRoZSBzdHVkZW50XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPE1lc3NhZ2VbXT59IFJldHVybnMgYW4gYXJyYXkgb2YgbWVzc2FnZXMgb2YgdGhlIHN0dWRlbnRcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIGBgYGpzXG4gICAqIGF3YWl0IGNsaWVudC5tZXNzYWdlcygpOyAvLyAtPiBbeyBpZDogJ0U5NzJGMUJDLTk5QTAtNENEMC04RDE1LUIxODk2OEI0M0UwOCcsIHR5cGU6ICdTdHVkZW50QWN0aXZpdHknLCAuLi4gfSwgeyBpZDogJzg2RkRBMTFELTQyQzctNDI0OS1CMDAzLTk0QjE1RUIyQzhENCcsIHR5cGU6ICdTdHVkZW50QWN0aXZpdHknLCAuLi4gfV1cbiAgICogYGBgXG4gICAqL1xuICBwdWJsaWMgbWVzc2FnZXMoKTogUHJvbWlzZTxNZXNzYWdlW10+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICBzdXBlclxuICAgICAgICAucHJvY2Vzc1JlcXVlc3Q8TWVzc2FnZVhNTE9iamVjdD4oXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWV0aG9kTmFtZTogJ0dldFBYUE1lc3NhZ2VzJyxcbiAgICAgICAgICAgIHBhcmFtU3RyOiB7IGNoaWxkSW50SWQ6IDAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgICh4bWwpID0+IG5ldyBYTUxGYWN0b3J5KHhtbCkuZW5jb2RlQXR0cmlidXRlKCdDb250ZW50JywgJ1JlYWQnKS50b1N0cmluZygpXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKHhtbE9iamVjdCkgPT4ge1xuICAgICAgICAgIHJlcyhcbiAgICAgICAgICAgIHhtbE9iamVjdC5QWFBNZXNzYWdlc0RhdGFbMF0uTWVzc2FnZUxpc3RpbmdzWzBdLk1lc3NhZ2VMaXN0aW5nLm1hcChcbiAgICAgICAgICAgICAgKG1lc3NhZ2UpID0+IG5ldyBNZXNzYWdlKG1lc3NhZ2UsIHN1cGVyLmNyZWRlbnRpYWxzLCB0aGlzLmhvc3RVcmwpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlaik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaW5mbyBvZiBhIHN0dWRlbnRcbiAgICogQHJldHVybnMge1Byb21pc2U8U3R1ZGVudEluZm8+fSBTdHVkZW50SW5mbyBvYmplY3RcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIGBgYGpzXG4gICAqIHN0dWRlbnRJbmZvKCkudGhlbihjb25zb2xlLmxvZykgLy8gLT4geyBzdHVkZW50OiB7IG5hbWU6ICdFdmFuIERhdmlzJywgbmlja25hbWU6ICcnLCBsYXN0TmFtZTogJ0RhdmlzJyB9LCAuLi59XG4gICAqIGBgYFxuICAgKi9cbiAgcHVibGljIHN0dWRlbnRJbmZvKCk6IFByb21pc2U8U3R1ZGVudEluZm8+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8U3R1ZGVudEluZm8+KChyZXMsIHJlaikgPT4ge1xuICAgICAgc3VwZXJcbiAgICAgICAgLnByb2Nlc3NSZXF1ZXN0PFN0dWRlbnRJbmZvWE1MT2JqZWN0Pih7XG4gICAgICAgICAgbWV0aG9kTmFtZTogJ1N0dWRlbnRJbmZvJyxcbiAgICAgICAgICBwYXJhbVN0cjogeyBjaGlsZEludElkOiAwIH0sXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh4bWxPYmplY3REYXRhKSA9PiB7XG4gICAgICAgICAgcmVzKHtcbiAgICAgICAgICAgIHN0dWRlbnQ6IHtcbiAgICAgICAgICAgICAgbmFtZTogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Gb3JtYXR0ZWROYW1lWzBdLFxuICAgICAgICAgICAgICBsYXN0TmFtZTogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5MYXN0TmFtZUdvZXNCeVswXSxcbiAgICAgICAgICAgICAgbmlja25hbWU6IHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uTmlja05hbWVbMF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmlydGhEYXRlOiBuZXcgRGF0ZSh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkJpcnRoRGF0ZVswXSksXG4gICAgICAgICAgICB0cmFjazogb3B0aW9uYWwoeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5UcmFjayksXG4gICAgICAgICAgICBhZGRyZXNzOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkFkZHJlc3MpLFxuICAgICAgICAgICAgcGhvdG86IG9wdGlvbmFsKHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uUGhvdG8pLFxuICAgICAgICAgICAgY291bnNlbG9yOlxuICAgICAgICAgICAgICB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkNvdW5zZWxvck5hbWUgJiZcbiAgICAgICAgICAgICAgeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Db3Vuc2Vsb3JFbWFpbCAmJlxuICAgICAgICAgICAgICB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkNvdW5zZWxvclN0YWZmR1VcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Db3Vuc2Vsb3JOYW1lWzBdLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Db3Vuc2Vsb3JFbWFpbFswXSxcbiAgICAgICAgICAgICAgICAgICAgc3RhZmZHdTogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Db3Vuc2Vsb3JTdGFmZkdVWzBdLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY3VycmVudFNjaG9vbDogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5DdXJyZW50U2Nob29sWzBdLFxuICAgICAgICAgICAgZGVudGlzdDogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5EZW50aXN0XG4gICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgbmFtZTogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5EZW50aXN0WzBdWydAX05hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgIHBob25lOiB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkRlbnRpc3RbMF1bJ0BfUGhvbmUnXVswXSxcbiAgICAgICAgICAgICAgICAgIGV4dG46IHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uRGVudGlzdFswXVsnQF9FeHRuJ11bMF0sXG4gICAgICAgICAgICAgICAgICBvZmZpY2U6IHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uRGVudGlzdFswXVsnQF9PZmZpY2UnXVswXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcGh5c2ljaWFuOiB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLlBoeXNpY2lhblxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uUGh5c2ljaWFuWzBdWydAX05hbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgIHBob25lOiB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLlBoeXNpY2lhblswXVsnQF9QaG9uZSddWzBdLFxuICAgICAgICAgICAgICAgICAgZXh0bjogeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5QaHlzaWNpYW5bMF1bJ0BfRXh0biddWzBdLFxuICAgICAgICAgICAgICAgICAgaG9zcGl0YWw6IHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uUGh5c2ljaWFuWzBdWydAX0hvc3BpdGFsJ11bMF0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGlkOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLlBlcm1JRCksXG4gICAgICAgICAgICBvcmdZZWFyR3U6IG9wdGlvbmFsKHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uT3JnWWVhckdVKSxcbiAgICAgICAgICAgIHBob25lOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLlBob25lKSxcbiAgICAgICAgICAgIGVtYWlsOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkVNYWlsKSxcbiAgICAgICAgICAgIGVtZXJnZW5jeUNvbnRhY3RzOiB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkVtZXJnZW5jeUNvbnRhY3RzXG4gICAgICAgICAgICAgID8geG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5FbWVyZ2VuY3lDb250YWN0c1swXS5FbWVyZ2VuY3lDb250YWN0Lm1hcCgoY29udGFjdCkgPT4gKHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6IG9wdGlvbmFsKGNvbnRhY3RbJ0BfTmFtZSddKSxcbiAgICAgICAgICAgICAgICAgIHBob25lOiB7XG4gICAgICAgICAgICAgICAgICAgIGhvbWU6IG9wdGlvbmFsKGNvbnRhY3RbJ0BfSG9tZVBob25lJ10pLFxuICAgICAgICAgICAgICAgICAgICBtb2JpbGU6IG9wdGlvbmFsKGNvbnRhY3RbJ0BfTW9iaWxlUGhvbmUnXSksXG4gICAgICAgICAgICAgICAgICAgIG90aGVyOiBvcHRpb25hbChjb250YWN0WydAX090aGVyUGhvbmUnXSksXG4gICAgICAgICAgICAgICAgICAgIHdvcms6IG9wdGlvbmFsKGNvbnRhY3RbJ0BfV29ya1Bob25lJ10pLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHJlbGF0aW9uc2hpcDogb3B0aW9uYWwoY29udGFjdFsnQF9SZWxhdGlvbnNoaXAnXSksXG4gICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgICBnZW5kZXI6IG9wdGlvbmFsKHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uR2VuZGVyKSxcbiAgICAgICAgICAgIGdyYWRlOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkdyYWRlKSxcbiAgICAgICAgICAgIGxvY2tlckluZm9SZWNvcmRzOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkxvY2tlckluZm9SZWNvcmRzKSxcbiAgICAgICAgICAgIGhvbWVMYW5ndWFnZTogb3B0aW9uYWwoeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Ib21lTGFuZ3VhZ2UpLFxuICAgICAgICAgICAgaG9tZVJvb206IG9wdGlvbmFsKHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uSG9tZVJvb20pLFxuICAgICAgICAgICAgaG9tZVJvb21UZWFjaGVyOiB7XG4gICAgICAgICAgICAgIGVtYWlsOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkhvbWVSb29tVGNoRU1haWwpLFxuICAgICAgICAgICAgICBuYW1lOiBvcHRpb25hbCh4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLkhvbWVSb29tVGNoKSxcbiAgICAgICAgICAgICAgc3RhZmZHdTogb3B0aW9uYWwoeG1sT2JqZWN0RGF0YS5TdHVkZW50SW5mb1swXS5Ib21lUm9vbVRjaFN0YWZmR1UpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZGl0aW9uYWxJbmZvOiB4bWxPYmplY3REYXRhLlN0dWRlbnRJbmZvWzBdLlVzZXJEZWZpbmVkR3JvdXBCb3hlc1swXS5Vc2VyRGVmaW5lZEdyb3VwQm94XG4gICAgICAgICAgICAgID8gKHhtbE9iamVjdERhdGEuU3R1ZGVudEluZm9bMF0uVXNlckRlZmluZWRHcm91cEJveGVzWzBdLlVzZXJEZWZpbmVkR3JvdXBCb3gubWFwKChkZWZpbmVkQm94KSA9PiAoe1xuICAgICAgICAgICAgICAgICAgaWQ6IG9wdGlvbmFsKGRlZmluZWRCb3hbJ0BfR3JvdXBCb3hJRCddKSwgLy8gc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICB0eXBlOiBkZWZpbmVkQm94WydAX0dyb3VwQm94TGFiZWwnXVswXSwgLy8gc3RyaW5nXG4gICAgICAgICAgICAgICAgICB2Y0lkOiBvcHRpb25hbChkZWZpbmVkQm94WydAX1ZDSUQnXSksIC8vIHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IGRlZmluZWRCb3guVXNlckRlZmluZWRJdGVtc1swXS5Vc2VyRGVmaW5lZEl0ZW0ubWFwKChpdGVtKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBpdGVtWydAX1NvdXJjZUVsZW1lbnQnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IGl0ZW1bJ0BfU291cmNlT2JqZWN0J11bMF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHZjSWQ6IGl0ZW1bJ0BfVkNJRCddWzBdLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbVsnQF9WYWx1ZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBpdGVtWydAX0l0ZW1UeXBlJ11bMF0sXG4gICAgICAgICAgICAgICAgICB9KSkgYXMgQWRkaXRpb25hbEluZm9JdGVtW10sXG4gICAgICAgICAgICAgICAgfSkpIGFzIEFkZGl0aW9uYWxJbmZvW10pXG4gICAgICAgICAgICAgIDogW10sXG4gICAgICAgICAgfSBhcyBTdHVkZW50SW5mbyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChyZWopO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmZXRjaEV2ZW50c1dpdGhpbkludGVydmFsKGRhdGU6IERhdGUpIHtcbiAgICByZXR1cm4gc3VwZXIucHJvY2Vzc1JlcXVlc3Q8Q2FsZW5kYXJYTUxPYmplY3Q+KFxuICAgICAge1xuICAgICAgICBtZXRob2ROYW1lOiAnU3R1ZGVudENhbGVuZGFyJyxcbiAgICAgICAgcGFyYW1TdHI6IHsgY2hpbGRJbnRJZDogMCwgUmVxdWVzdERhdGU6IGRhdGUudG9JU09TdHJpbmcoKSB9LFxuICAgICAgfSxcbiAgICAgICh4bWwpID0+IG5ldyBYTUxGYWN0b3J5KHhtbCkuZW5jb2RlQXR0cmlidXRlKCdUaXRsZScsICdJY29uJykudG9TdHJpbmcoKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtDYWxlbmRhck9wdGlvbnN9IG9wdGlvbnMgT3B0aW9ucyB0byBwcm92aWRlIGZvciBjYWxlbmRhciBtZXRob2QuIEFuIGludGVydmFsIGlzIHJlcXVpcmVkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxDYWxlbmRhcj59IFJldHVybnMgYSBDYWxlbmRhciBvYmplY3RcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIGBgYGpzXG4gICAqIGNsaWVudC5jYWxlbmRhcih7IGludGVydmFsOiB7IHN0YXJ0OiBuZXcgRGF0ZSgnNS8xLzIwMjInKSwgZW5kOiBuZXcgRGF0ZSgnOC8xLzIwMjEnKSB9LCBjb25jdXJyZW5jeTogbnVsbCB9KTsgLy8gLT4gTGltaXRsZXNzIGNvbmN1cnJlbmN5IChub3QgcmVjb21tZW5kZWQpXG4gICAqXG4gICAqIGNvbnN0IGNhbGVuZGFyID0gYXdhaXQgY2xpZW50LmNhbGVuZGFyKHsgaW50ZXJ2YWw6IHsgLi4uIH19KTtcbiAgICogY29uc29sZS5sb2coY2FsZW5kYXIpOyAvLyAtPiB7IHNjaG9vbERhdGU6IHsuLi59LCBvdXRwdXRSYW5nZTogey4uLn0sIGV2ZW50czogWy4uLl0gfVxuICAgKiBgYGBcbiAgICovXG4gIHB1YmxpYyBhc3luYyBjYWxlbmRhcihvcHRpb25zOiBDYWxlbmRhck9wdGlvbnMgPSB7fSk6IFByb21pc2U8Q2FsZW5kYXI+IHtcbiAgICBjb25zdCBkZWZhdWx0T3B0aW9uczogQ2FsZW5kYXJPcHRpb25zID0ge1xuICAgICAgY29uY3VycmVuY3k6IDcsXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH07XG4gICAgY29uc3QgY2FsID0gYXdhaXQgY2FjaGUubWVtbygoKSA9PiB0aGlzLmZldGNoRXZlbnRzV2l0aGluSW50ZXJ2YWwobmV3IERhdGUoKSkpO1xuICAgIGNvbnN0IHNjaG9vbEVuZERhdGU6IERhdGUgfCBudW1iZXIgPVxuICAgICAgb3B0aW9ucy5pbnRlcnZhbD8uZW5kID8/IG5ldyBEYXRlKGNhbC5DYWxlbmRhckxpc3RpbmdbMF1bJ0BfU2Nob29sRW5kRGF0ZSddWzBdKTtcbiAgICBjb25zdCBzY2hvb2xTdGFydERhdGU6IERhdGUgfCBudW1iZXIgPVxuICAgICAgb3B0aW9ucy5pbnRlcnZhbD8uc3RhcnQgPz8gbmV3IERhdGUoY2FsLkNhbGVuZGFyTGlzdGluZ1swXVsnQF9TY2hvb2xCZWdEYXRlJ11bMF0pO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgY29uc3QgbW9udGhzV2l0aGluU2Nob29sWWVhciA9IGVhY2hNb250aE9mSW50ZXJ2YWwoeyBzdGFydDogc2Nob29sU3RhcnREYXRlLCBlbmQ6IHNjaG9vbEVuZERhdGUgfSk7XG4gICAgICBjb25zdCBnZXRBbGxFdmVudHNXaXRoaW5TY2hvb2xZZWFyID0gKCk6IFByb21pc2U8Q2FsZW5kYXJYTUxPYmplY3RbXT4gPT5cbiAgICAgICAgZGVmYXVsdE9wdGlvbnMuY29uY3VycmVuY3kgPT0gbnVsbFxuICAgICAgICAgID8gUHJvbWlzZS5hbGwobW9udGhzV2l0aGluU2Nob29sWWVhci5tYXAoKGRhdGUpID0+IHRoaXMuZmV0Y2hFdmVudHNXaXRoaW5JbnRlcnZhbChkYXRlKSkpXG4gICAgICAgICAgOiBhc3luY1Bvb2xBbGwoZGVmYXVsdE9wdGlvbnMuY29uY3VycmVuY3ksIG1vbnRoc1dpdGhpblNjaG9vbFllYXIsIChkYXRlKSA9PlxuICAgICAgICAgICAgICB0aGlzLmZldGNoRXZlbnRzV2l0aGluSW50ZXJ2YWwoZGF0ZSlcbiAgICAgICAgICAgICk7XG4gICAgICBsZXQgbWVtbzogQ2FsZW5kYXIgfCBudWxsID0gbnVsbDtcbiAgICAgIGdldEFsbEV2ZW50c1dpdGhpblNjaG9vbFllYXIoKVxuICAgICAgICAudGhlbigoZXZlbnRzKSA9PiB7XG4gICAgICAgICAgY29uc3QgYWxsRXZlbnRzID0gZXZlbnRzLnJlZHVjZSgocHJldiwgZXZlbnRzKSA9PiB7XG4gICAgICAgICAgICBpZiAobWVtbyA9PSBudWxsKVxuICAgICAgICAgICAgICBtZW1vID0ge1xuICAgICAgICAgICAgICAgIHNjaG9vbERhdGU6IHtcbiAgICAgICAgICAgICAgICAgIHN0YXJ0OiBuZXcgRGF0ZShldmVudHMuQ2FsZW5kYXJMaXN0aW5nWzBdWydAX1NjaG9vbEJlZ0RhdGUnXVswXSksXG4gICAgICAgICAgICAgICAgICBlbmQ6IG5ldyBEYXRlKGV2ZW50cy5DYWxlbmRhckxpc3RpbmdbMF1bJ0BfU2Nob29sRW5kRGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG91dHB1dFJhbmdlOiB7XG4gICAgICAgICAgICAgICAgICBzdGFydDogc2Nob29sU3RhcnREYXRlLFxuICAgICAgICAgICAgICAgICAgZW5kOiBzY2hvb2xFbmREYXRlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXZlbnRzOiBbXSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3Q6IENhbGVuZGFyID0ge1xuICAgICAgICAgICAgICAuLi5tZW1vLCAvLyBUaGlzIGlzIHRvIHByZXZlbnQgcmUtaW5pdGlhbGl6aW5nIERhdGUgb2JqZWN0cyBpbiBvcmRlciB0byBpbXByb3ZlIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgIGV2ZW50czogW1xuICAgICAgICAgICAgICAgIC4uLihwcmV2LmV2ZW50cyA/IHByZXYuZXZlbnRzIDogW10pLFxuICAgICAgICAgICAgICAgIC4uLih0eXBlb2YgZXZlbnRzLkNhbGVuZGFyTGlzdGluZ1swXS5FdmVudExpc3RzWzBdICE9PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAgICAgPyAoZXZlbnRzLkNhbGVuZGFyTGlzdGluZ1swXS5FdmVudExpc3RzWzBdLkV2ZW50TGlzdC5tYXAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChldmVudFsnQF9EYXlUeXBlJ11bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgRXZlbnRUeXBlLkFTU0lHTk1FTlQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYXNzaWdubWVudEV2ZW50ID0gZXZlbnQgYXMgQXNzaWdubWVudEV2ZW50WE1MT2JqZWN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBkZWNvZGVVUkkoYXNzaWdubWVudEV2ZW50WydAX1RpdGxlJ11bMF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZExpbmtEYXRhOiBhc3NpZ25tZW50RXZlbnRbJ0BfQWRkTGlua0RhdGEnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ3U6IGFzc2lnbm1lbnRFdmVudFsnQF9BR1UnXSA/IGFzc2lnbm1lbnRFdmVudFsnQF9BR1UnXVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZShhc3NpZ25tZW50RXZlbnRbJ0BfRGF0ZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZ3U6IGFzc2lnbm1lbnRFdmVudFsnQF9ER1UnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiBhc3NpZ25tZW50RXZlbnRbJ0BfTGluayddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZTogYXNzaWdubWVudEV2ZW50WydAX1N0YXJ0VGltZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEV2ZW50VHlwZS5BU1NJR05NRU5ULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdUeXBlOiBhc3NpZ25tZW50RXZlbnRbJ0BfVmlld1R5cGUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBBc3NpZ25tZW50RXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEV2ZW50VHlwZS5IT0xJREFZOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGRlY29kZVVSSShldmVudFsnQF9UaXRsZSddWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFdmVudFR5cGUuSE9MSURBWSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU6IGV2ZW50WydAX1N0YXJ0VGltZSddWzBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IG5ldyBEYXRlKGV2ZW50WydAX0RhdGUnXVswXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gYXMgSG9saWRheUV2ZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBFdmVudFR5cGUuUkVHVUxBUjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZWd1bGFyRXZlbnQgPSBldmVudCBhcyBSZWd1bGFyRXZlbnRYTUxPYmplY3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGRlY29kZVVSSShyZWd1bGFyRXZlbnRbJ0BfVGl0bGUnXVswXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWd1OiByZWd1bGFyRXZlbnRbJ0BfQUdVJ10gPyByZWd1bGFyRXZlbnRbJ0BfQUdVJ11bMF0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUocmVndWxhckV2ZW50WydAX0RhdGUnXVswXSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IHJlZ3VsYXJFdmVudFsnQF9FdnREZXNjcmlwdGlvbiddXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHJlZ3VsYXJFdmVudFsnQF9FdnREZXNjcmlwdGlvbiddWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZ3U6IHJlZ3VsYXJFdmVudFsnQF9ER1UnXSA/IHJlZ3VsYXJFdmVudFsnQF9ER1UnXVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiByZWd1bGFyRXZlbnRbJ0BfTGluayddID8gcmVndWxhckV2ZW50WydAX0xpbmsnXVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWU6IHJlZ3VsYXJFdmVudFsnQF9TdGFydFRpbWUnXVswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBFdmVudFR5cGUuUkVHVUxBUixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aWV3VHlwZTogcmVndWxhckV2ZW50WydAX1ZpZXdUeXBlJ10gPyByZWd1bGFyRXZlbnRbJ0BfVmlld1R5cGUnXVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRMaW5rRGF0YTogcmVndWxhckV2ZW50WydAX0FkZExpbmtEYXRhJ10gPyByZWd1bGFyRXZlbnRbJ0BfQWRkTGlua0RhdGEnXVswXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBSZWd1bGFyRXZlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSBhcyBFdmVudFtdKVxuICAgICAgICAgICAgICAgICAgOiBbXSksXG4gICAgICAgICAgICAgIF0gYXMgRXZlbnRbXSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiByZXN0O1xuICAgICAgICAgIH0sIHt9IGFzIENhbGVuZGFyKTtcbiAgICAgICAgICByZXMoeyAuLi5hbGxFdmVudHMsIGV2ZW50czogXy51bmlxQnkoYWxsRXZlbnRzLmV2ZW50cywgKGl0ZW0pID0+IGl0ZW0udGl0bGUpIH0gYXMgQ2FsZW5kYXIpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqKTtcbiAgICB9KTtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNlLE1BQU1BLE1BQU0sU0FBU0MsYUFBSSxDQUFDRCxNQUFNLENBQUM7SUFFOUNFLFdBQVcsQ0FBQ0MsV0FBNkIsRUFBRUMsT0FBZSxFQUFFO01BQzFELEtBQUssQ0FBQ0QsV0FBVyxDQUFDO01BQ2xCLElBQUksQ0FBQ0MsT0FBTyxHQUFHQSxPQUFPO0lBQ3hCOztJQUVBO0FBQ0Y7QUFDQTtJQUNTQyxt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