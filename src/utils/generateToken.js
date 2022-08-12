import jwt from "jsonwebtoken";

const generateUserToken = (sessionId) => {
  return jwt.sign(
    { sessionId },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    },
    ""
  );
};

export default generateUserToken;
