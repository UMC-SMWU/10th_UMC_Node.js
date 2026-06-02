import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import { RegisterRoutes } from "./routes/routes";

import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import passport from "passport";
import { googleStrategy } from "./auth.config";

const app = express();

passport.use(googleStrategy);

app.use(passport.initialize());

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

RegisterRoutes(app);

app.get(
  "/oauth2/login/google",
  passport.authenticate("google", {
    session: false,
  }),
);

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  },
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
