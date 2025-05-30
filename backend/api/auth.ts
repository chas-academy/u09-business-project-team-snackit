import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const clientID = ""
const clientSecret = ""
passport.use(
    new GoogleStrategy(
        {
            clientID: clientID,
            clientSecret: clientSecret,
            callbackURL:"/auth/google/callback",
        },
        async (accessToken: string, refreshToken: string, profile, done) => {
            return done(null, profile)
            // let user = await User.findOne({googleid: profile.id})
        }
    )
)