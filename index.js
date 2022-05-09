process.env.NODE_ENV = "production";

process.setMaxListeners(0);
import fs from "fs";
import express from "express";
import cookieParser from 'cookie-parser';
import bodyParser from "body-parser";
import { getTags } from "./helpers.js";

let app = express();
app.use(bodyParser.json({limit: "100mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: "100mb"}));
app.use(cookieParser("4X@S#_%%HE&D$23FB446"));
// const cors = require("cors")
app.set("views", "./views");
app.set("view engine", "ejs");
console.log("Setting up routing...");

// app.use(function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         res.header('Access-Control-Allow-Credentials', true);
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
//         res.header("Access-Control-Allow-Method", req.header("Access-Control-Request-Methods"));
//     }
//     next();
// });

// app.use(cors());
app.set('case sensitive routing', true);

app.get("/", (req, res, next) => {
    let tags = getTags();
    res.render("home", { tags })
});

app.get("/learn/:mod", (req, res, next) => {
    const mod = req.params.mod;
    console.log(mod);
    let json = JSON.parse(fs.readFileSync(`./res/${mod}.json`, 'utf-8'));
    res.render("mcq", {qData: json, mod })
});



console.log(`Server has been successfully created at 3000`);
app.listen(3000);

export default app;
