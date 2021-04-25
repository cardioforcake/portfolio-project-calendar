const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const Calendar = require('../models/calendar')

// passport.use <-- we use this to plug-in login options
passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
}, function(accessToken, refreshToken, profile, cb){
    // a user has attempted a login
    // does this user already exist in our own database
    Calendar.findOne({ googleId: profile.id}, function(err, calendar){
            // if they don't we create them
        if(err) return cb(err)
        if(calendar){
            // usually err is the arguement that goes in first position
            // but because we don't care about the err in this if statement
            // we just put null as the first parameter
            return cb(null, calendar)
        }else{
            const newCalendar = new Calendar({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id
            })

            newCalendar.save(function(err){
                if(err) return cb(err)
                //user/student saved successful
                return cb(null, newCalendar)
            })
        }
    })
}))

// passport.serializeUser <-- gets called one time when the user logs in to create a session
passport.serializeUser(function(calendar, done){
    done(null, calendar.id)
})
// passport.deserializeUser <-- gets called with each request -
// - decodes cookie and looks up user in session store & creates req.user for us
passport.deserializeUser(function(id, done){
    Calendar.findById(id, function(err, calendar){
        done(err, calendar)
    })
})