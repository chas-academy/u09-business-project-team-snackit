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
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const db_1 = __importDefault(require("../database/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const spooncularRoutes_1 = __importDefault(require("../routes/spooncularRoutes"));
const gameRoutes_1 = __importDefault(require("../routes/gameRoutes"));
const spoonacularFetch_1 = require("../utils/spoonacularFetch");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3003;
app.use(express_1.default.json());
const clientID = process.env.GOOGLE_CLIENT_ID; // med "!" så säger det till TypeScript att variabeln definitivt finns
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const server = process.env.NODE_ENV === "prod" ? process.env.API_URL_PROD : process.env.API_URL_LOCAL;
console.log(server);
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: `${server}/auth/google/callback`,
}, (accesstoken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, profile);
    }
    catch (err) {
        return done(err, false);
    }
})));
//--------------SPARA ANV I EN SESSION-------------
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (object, done) {
    // console.log(object);
    done(null, object);
});
app.use((0, cors_1.default)({
    origin: ["https://whoisthefoodie.netlify.app/", "http://localhost:5173"],
    credentials: true
}));
app.use((0, express_session_1.default)({
    secret: "verySecretySecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//----------------TEST-ROUTE---------------
app.get('/', (req, res) => {
    res.send("Backend running!");
});
//------------OAUTH-ROUTES----------------
app.get("/auth/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
app.get("/auth/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: `${process.env.REDIRECT}`, //det skavara frontend länken här
    successRedirect: `${process.env.REDIRECT}/lobby` //det skavara frontend länken här
}));
//-------------------LOGGA UT------------------
app.get("/auth/logout", (req, res, next) => {
    req.logout(err => {
        if (err)
            return next(err);
        res.sendStatus(200);
    });
});
//---------------HÄMTA INLOGGAD ANV------------
app.get("/auth/user", (req, res) => {
    res.json(req.user || null);
});
app.use('/users', userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});
app.use("/api", spooncularRoutes_1.default);
app.use("/api/games", gameRoutes_1.default);
app.use('/search', spoonacularFetch_1.searchRecipe);
exports.default = app;
