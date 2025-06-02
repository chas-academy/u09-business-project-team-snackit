import express, {Express, Request, Response} from "express";
import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const clientID= process.env.GOOGLE_CLIENT_ID!;
const clientSecret= process.env.GOOGLE_CLIENT_SECRET!;
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID)
console.log("GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET)

passport.use( 
    new GoogleStrategy(
        {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:3009/auth/google/callback",
        },
        async (accesstoken, refreshToken, profile, done) => {
            try{
                return done(null, profile);
            }catch (err) {
                return done(err, false);
            }
        }
    )
);

//--------------SPARA ANV I EN SESSION-------------
passport.serializeUser(function (user,done) {
    done(null, user);
});


passport.deserializeUser(function (object, done) {
    console.log(object);
    done(null, object as Express.User)    
})

const app: Express = express();



app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(session({
    secret: "verySecretySecret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



//----------------TEST-ROUTE---------------
app.get('/', (req: Request, res: Response) => {
    res.send("Backend running!");
});



//------------OAUTH-ROUTES----------------
app.get("/auth/google", passport.authenticate("google", {
    scope: ["profile", "email"], 
}));

app.get("/auth/google/callback", 
    passport.authenticate("google", {
        failureRedirect: "http://localhost:5173",
        successRedirect: "http://localhost:5173"
    })
);


//-------------------LOGGA UT------------------
app.get("/auth/logout", (req: Request, res: Response, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.sendStatus(200);
    });
});



//---------------HÄMTA INLOGGAD ANV------------
app.get("/auth/user", (req: Request, res: Response) => {
    res.json(req.user || null);
});


//-----------------STARTAR SERVER--------------
const PORT= 3009;

app.listen(PORT, ()=> {
    console.log(`Server running att http://localhost:${PORT}`);
})
