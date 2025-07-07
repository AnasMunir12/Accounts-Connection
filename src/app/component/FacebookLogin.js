"use client";
import { useEffect, useState } from "react";

export default function FacebookLogin() {
  const [isFBLoaded, setIsFBLoaded] = useState(false);

  useEffect(() => {
    // Load SDK
    window.fbAsyncInit = function () {
      FB.init({
        appId: "YOUR_APP_ID", // Replace with your app ID
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });

      setIsFBLoaded(true); // SDK is ready
    };

    // Inject Facebook SDK script
    if (!document.getElementById("facebook-jssdk")) {
      const js = document.createElement("script");
      js.id = "facebook-jssdk";
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(js);
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!isFBLoaded) {
      alert("Facebook SDK not ready yet. Please wait...");
      return;
    }

    FB.login(
      function (response) {
        if (response.authResponse) {
          FB.api("/me", { fields: "name,email" }, function (userInfo) {
            alert(`Welcome, ${userInfo.name}`);
            console.log(userInfo);
          });
        } else {
          console.log("User cancelled login.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <button
      onClick={handleFacebookLogin}
      style={{
        padding: "10px 20px",
        background: "#4267B2",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
      }}
    >
      Login with Facebook
    </button>
  );
}
