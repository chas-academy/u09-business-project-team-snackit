import userRouter from "../routes/userRoutes";
import connectDB from "../database/db";
import dotenv from 'dotenv';
import express, {Express, Request, Response} from "express";
import passport from "passport";
import { Strategy as GoogleStrategy} from "passport-google-oauth20";
import session from "express-session";
import cors from "cors";
import spooncularRoutes from "../routes/spooncularRoutes";
import gameRoutes from "../routes/gameRoutes";
import { searchRecipe } from "../utils/spoonacularFetch";



dotenv.config();
connectDB();
const app: Express = express();
// console.log(process.env.REDIRECT)

const PORT: string | number = process.env.PORT || 3003;
app.use(express.json());
const clientID= process.env.GOOGLE_CLIENT_ID!;  // med "!" så säger det till TypeScript att variabeln definitivt finns
const clientSecret= process.env.GOOGLE_CLIENT_SECRET!;

const server = process.env.NODE_ENV === "prod" ? process.env.API_URL_PROD : process.env.API_URL_LOCAL;
const redirect = process.env.NODE_ENV === "prod" ? process.env.REDIRECT_PROD : process.env.REDIRECT_LOCAL;
console.log('Google callback URL:', `${server}/auth/google/callback`);
passport.use( 
    new GoogleStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL: `${server}/auth/google/callback`,
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
    // console.log(object);
    done(null, object as Express.User)    
})

app.use(cors({
    origin: ["https://whoisthefoodie.netlify.app", "http://localhost:5173"], 
    credentials: true
}));

app.use(session({
    secret: "verySecretySecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "prod",
        sameSite: process.env.NODE_ENV === "prod" ? "none" : "lax",  
        httpOnly: true,                               
      }
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
        failureRedirect: `${redirect}`,
        successRedirect: `${redirect}/lobby`
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
    console.log(req.user)
    res.json(req.user || null);
});

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});



app.use("/api", spooncularRoutes); 

app.use("/api/games", gameRoutes);

app.use('/search', searchRecipe);

export default app;