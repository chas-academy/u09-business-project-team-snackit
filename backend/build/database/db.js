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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const MONGO_URI = process.env.NODE_ENV === 'prod' ? process.env.MONGO_URL_PROD : process.env.MONGO_URL_LOCAL;
        if (!MONGO_URI) {
            console.log("Unable to find DB");
            return;
        }
        try {
            yield mongoose_1.default.connect(MONGO_URI, {});
            console.log(`Connected to ${MONGO_URI}`);
        }
        catch (err) {
            if (err instanceof Error) {
                console.error('Error connecting to db', err);
                process.exit(1);
            }
        }
    });
}
exports.default = connectDB;
