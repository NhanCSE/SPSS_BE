"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileType = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Qu\u1EA3n tr\u1ECB vi\u00EAn";
    UserRole["STUDENT"] = "H\u1ECDc vi\u00EAn";
})(UserRole || (exports.UserRole = UserRole = {}));
var FileType;
(function (FileType) {
    FileType["PDF"] = "application/pdf";
    FileType["DOCX"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    FileType["EXCEL"] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
})(FileType || (exports.FileType = FileType = {}));
