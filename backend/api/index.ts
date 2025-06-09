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



dotenv.config();
connectDB();
const app: Express = express();

const PORT: string | number = process.env.PORT || 3003;
app.use(express.json());
const clientID= process.env.GOOGLE_CLIENT_ID!;  // med "!" så säger det till TypeScript att variabeln definitivt finns
const clientSecret= process.env.GOOGLE_CLIENT_SECRET!;

passport.use( 
    new GoogleStrategy(
        {
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "http://localhost:3003/auth/google/callback",
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
        successRedirect: "http://localhost:5173/lobby"
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

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log(`Application is running at http://localhost:${PORT}`);
});



app.use("/api", spooncularRoutes); 

app.use("/api/games", gameRoutes);


export default app;