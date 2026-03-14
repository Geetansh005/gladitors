const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const cors = require("cors");

const app = express();
const PORT = 3000;

const CLIENT_ID =
"1072374566517-gk20td2ha6m61d76d1u3bprd0973rtql.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

app.post("/api/verify-google", async (req, res) => {

  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({
      success: false,
      message: "No credential received"
    });
  }

  try {

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID
    });

    const payload = ticket.getPayload();

    console.log("User verified:", payload.email);

    res.json({
      success: true,
      user: {
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        googleId: payload.sub
      }
    });

  } catch (error) {

    console.error(error);

    res.status(401).json({
      success: false,
      message: "Invalid token"
    });

  }

});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});