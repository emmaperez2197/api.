"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = void 0;
const bcrypt = require("bcrypt");
const comparePassword = async (password, hash) => await bcrypt.compareSync(password, hash);
exports.comparePassword = comparePassword;
//# sourceMappingURL=bcrypt.js.map