const axios = require("axios")
const express = require("express");
const {config} = require("dotenv");
const cors = require('cors');


const jwt = require("jsonwebtoken");
const{log,middleware,mongo, validateToken} = require("./shared");


const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const drinksRoutes = require("./routes/drinks.routes");
const dessertsRoutes = require("./routes/desserts.routes");
const pastaRoutes = require("./routes/pasta.routes");
const saucesRoutes = require("./routes/sauces.routes");
const saladsRoutes = require("./routes/salads.routes");


// const userRoutes = require("./routes/user.routes");


const app = express();
config();

// const corsOptions ={
//     origin:'https://sprightly-sprite-2c7c3d.netlify.app/',
//     //origin:'*',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

//Allow CORS
app.use(cors());


const handler = (async() => {
    try {
        await mongo.connect();

        // PARSE REQUEST BODY AS JSON
        app.use(express.json());
        
        //LOGGING MIDDLEWARE

            app.use(middleware.logging);

        // MAINTENANCE MIDDLEWARE

            app.use(middleware.Maintenance);

        //Auth Route
        app.use("/auth",authRoutes);

        // Token Middleware
        // app.use(middleware.validateToken);

        //  Routes
        app.use("/pizza",adminRoutes );
        app.use("/drinks",drinksRoutes );
        app.use("/desserts",dessertsRoutes );
        app.use("/pasta",pastaRoutes );
        app.use("/salads",saladsRoutes );
        app.use("/sauces",saucesRoutes );
        
        
//Initialising the port 

        const port = process.env.PORT || 8080;
        app.listen( port, () => log(`server listening at port ${port}`));

    } catch (err) {
        console.error(err)
    }

})();


module.exports = app
