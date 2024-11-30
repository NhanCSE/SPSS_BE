"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.Payment = exports.User = exports.HistoryOperation = exports.FileOperation = exports.PrinterOperation = exports.SystemConfiguration = void 0;
var axios_1 = require("axios");
var hostURL = "https://localhost:3000/v1";
var customHeader = function (token) {
    if (token) {
        return {
            withCredentials: true,
            validateStatus: function (status) { return status >= 200 && status <= 500; },
            headers: {
                Authorization: "Bearer ".concat(token)
            },
        };
    }
    return {
        withCredentials: true,
        validateStatus: function (status) { return status >= 200 && status <= 500; },
    };
};
var processResponse = function (response) {
    return {
        success: response.data.success,
        message: response.data.message,
        data: response.data.data,
        status: response.status,
    };
};
var processError = function (error) {
    var _a;
    return {
        success: (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data,
        request: error === null || error === void 0 ? void 0 : error.request,
        status: error.response ? error.response.status : null,
    };
};
var SystemConfiguration = /** @class */ (function () {
    function SystemConfiguration() {
        this.baseUrl = "".concat(hostURL, "/systemConfiguration");
    }
    SystemConfiguration.prototype.createSystemConfiguration = function (createInfo, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), createInfo, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_1 = _a.sent();
                        processError(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SystemConfiguration.prototype.getAllSystemConfiguration = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/searchAll"), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_2 = _a.sent();
                        processError(error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SystemConfiguration.prototype.getNewestSystemConfiguration = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/searchNewest"), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_3 = _a.sent();
                        processError(error_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SystemConfiguration;
}());
exports.SystemConfiguration = SystemConfiguration;
var PrinterOperation = /** @class */ (function () {
    function PrinterOperation() {
        this.baseUrl = "".concat(hostURL, "/printer");
    }
    PrinterOperation.prototype.createPrinter = function (createPrinterInfo, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), createPrinterInfo, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_4 = _a.sent();
                        processError(error_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.searchPrinter = function (searchPayload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search"), searchPayload, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_5 = _a.sent();
                        processError(error_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.printFileCheck = function (printerId, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/print/check/").concat(printerId), payload, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_6 = _a.sent();
                        processError(error_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.printFile = function (printerId, payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/print/").concat(printerId), payload, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_7 = _a.sent();
                        processError(error_7);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.searchAvailablePrinter = function (searchAvailableDto, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/search/available"), searchAvailableDto, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_8 = _a.sent();
                        processError(error_8);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.updatePaperAfterPrinting = function (updateInfo, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update-paper-after-printing"), updateInfo, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_9 = _a.sent();
                        processError(error_9);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.updatePrinter = function (updateInfo, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.put("".concat(this.baseUrl, "/update"), updateInfo, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_10 = _a.sent();
                        processError(error_10);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.getNumberOfPrinter = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/count"), {
                                params: payload,
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_11 = _a.sent();
                        processError(error_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.getPrinterToPrint = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/searchToPrint"), {
                                params: payload,
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_12 = _a.sent();
                        processError(error_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PrinterOperation.prototype.deletePrinter = function (printer_id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.delete("".concat(this.baseUrl, "/delete"), {
                                params: {
                                    id: printer_id
                                },
                                withCredentials: true,
                                headers: {
                                    Authorization: "Bearer ".concat(token)
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_13 = _a.sent();
                        processError(error_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PrinterOperation;
}());
exports.PrinterOperation = PrinterOperation;
var FileOperation = /** @class */ (function () {
    function FileOperation() {
        this.baseUrl = "".concat(hostURL, "/file");
    }
    FileOperation.prototype.uploadFile = function (fileUpload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var formData, response, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        formData = new FormData();
                        formData.append('file', fileUpload);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl), formData, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_14 = _a.sent();
                        processError(error_14);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileOperation.prototype.getFile = function (fileId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/").concat(fileId), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_15 = _a.sent();
                        processError(error_15);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FileOperation;
}());
exports.FileOperation = FileOperation;
var HistoryOperation = /** @class */ (function () {
    function HistoryOperation() {
        this.baseUrl = "".concat(hostURL, "/history/print");
    }
    HistoryOperation.prototype.getOne = function (printHistoryId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/").concat(printHistoryId), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_16 = _a.sent();
                        processError(error_16);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HistoryOperation.prototype.getPrintingStudentHistory = function (studentId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/student/").concat(studentId), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_17 = _a.sent();
                        processError(error_17);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HistoryOperation.prototype.getAll = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/"), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_18 = _a.sent();
                        processError(error_18);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HistoryOperation.prototype.getPrinterHistory = function (printerId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/printer/").concat(printerId), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_19 = _a.sent();
                        processError(error_19);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return HistoryOperation;
}());
exports.HistoryOperation = HistoryOperation;
var User = /** @class */ (function () {
    function User() {
        this.baseUrl = "".concat(hostURL, "/user");
    }
    User.prototype.createUser = function (createInfo, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), createInfo, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_20 = _a.sent();
                        processError(error_20);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.getPaper = function (student_id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/paper/search/").concat(student_id), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_21 = _a.sent();
                        processError(error_21);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.getInfo = function (student_id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search/").concat(student_id), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_22 = _a.sent();
                        processError(error_22);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.User = User;
var Payment = /** @class */ (function () {
    function Payment() {
        this.baseUrl = "".concat(hostURL, "/payment");
    }
    Payment.prototype.viewPayment = function (student_id, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/view/").concat(student_id), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_23 = _a.sent();
                        processError(error_23);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Payment.prototype.create = function (payload, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/create"), payload, customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_24 = _a.sent();
                        processError(error_24);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Payment.prototype.getAllPayment = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search"), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_25 = _a.sent();
                        processError(error_25);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Payment.prototype.getStudentPayment = function (studentId, token) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get("".concat(this.baseUrl, "/search/student/").concat(studentId), customHeader(token))];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_26 = _a.sent();
                        processError(error_26);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Payment;
}());
exports.Payment = Payment;
var Auth = /** @class */ (function () {
    function Auth() {
        this.baseUrl = "".concat(hostURL, "/auth");
    }
    Auth.prototype.login = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/login"), payload)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_27 = _a.sent();
                        processError(error_27);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Auth.prototype.signup = function (createInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.post("".concat(this.baseUrl, "/signup"), createInfo)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, processResponse(response)];
                    case 2:
                        error_28 = _a.sent();
                        processError(error_28);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Auth;
}());
exports.Auth = Auth;
