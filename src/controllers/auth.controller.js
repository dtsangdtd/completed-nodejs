const jwt = require("jsonwebtoken");
const { TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY } = process.env;
const authGoogleLogin = async (request, response, user, next) => {
  console.log(request);
  console.log(response);
  const redirectUrl =
    request.session.returnTo.split("redirect=")[1] || "http://localhost:3000";
  if (user.emails[0].verified) {
    const token = jwt.sign(
      {
        role: "ADMIN",
        id: user.id,
        email: user.emails[0].value,
      },
      TOKEN_PRIVATE_KEY,
      {
        expiresIn: "1h", // Set the token expiration time as desired
      }
    );
    const refreshToken = jwt.sign(
      {
        role: "ADMIN",
        id: user.id,
        email: user.emails[0].value,
      },
      REFRESH_TOKEN_PRIVATE_KEY,
      {
        expiresIn: "30d",
      }
    );
    // Append the token to the redirect URL as a query parameter
    const redirectWithToken = `${redirectUrl}?token=${token}&?refreshToken=${refreshToken}`;

    // Redirect to the URL with the token
    response.redirect(redirectWithToken);
    // Default URL
    // Add your logic to determine the dynamic redirect URL here
    // For example, you can check the user's role or some other condition
    // Example:
    // if (req.user.isAdmin) {
    //   redirectUrl = "http://localhost:3000/admin-dashboard";
    // } else {
    //   redirectUrl = "http://localhost:3000/user-dashboard";
    // }
    // Redirect to the dynamic URL
  } else {
    response.redirect(redirectUrl);
  }
};
//
module.exports = { authGoogleLogin };
