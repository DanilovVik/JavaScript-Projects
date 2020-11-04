const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { body, validationResult } = require("express-validator");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const validationMiddleware = [
  body("name").notEmpty().isAlpha().trim().escape(),
  body("age")
    .isNumeric({
      no_symbols: true,
    })
    .isLength({ min: 2, max: 3 }),
  body("phone").isMobilePhone("ru-RU", {
    strictMode: true,
  }),
  body("password").custom((value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&-_])[A-Za-z\d@$!%*#?&-_]{8,12}/;

    if (!regex.test(value)) throw new Error();

    return true;
  }),
  body("email").isEmail().normalizeEmail(),
  body("url").isURL(),
  body("card").isCreditCard(),
  body("date").custom((value) => {
    const regex = /\d{2}.\d{2}.\d{4}/;

    if (!regex.test(value)) throw new Error();

    return true;
  }),
  body("time").custom((value) => {
    const regex = /\d{2}:\d{2}-\d{2}:\d{2}/;

    if (!regex.test(value)) throw new Error();

    return true;
  }),
];

app.use(express.static(__dirname));

app.get("/", (_, res) => {
  res.status(200).sendFile("index.html");
});

app.post("/server", validationMiddleware, (req, res) => {
  const errors = validationResult(req)
    .array()
    .map((error) => `Wrong value of field "${error.param}".`);

  console.log(errors);

  if (errors.length) {
    res.status(400).json(errors);
  } else {
    res.status(201).json("Data has been sent.");
  }
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => console.log(`Server ready. Port: ${PORT}.`));
