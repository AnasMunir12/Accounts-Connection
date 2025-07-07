"use client";
import { useEffect, useState } from "react";

export default function FacebookLogin() {
  const [isFBReady, setIsFBReady] = useState(false);

  useEffect(() => {
    // Wait for FB SDK to load and initialize
    window.fbAsyncInit = function () {
      FB.init({
        appId: "2145673955940333", // ✅ Your actual app ID
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      setIsFBReady(true); // Mark SDK ready
    };

    // Inject SDK script (if not already)
    if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.src = "https://connect.facebook.net/en_US/sdk.js";
      document.body.appendChild(script);
    }

    // Fallback in case fbAsyncInit is skipped
    const interval = setInterval(() => {
      if (window.FB) {
        clearInterval(interval);
        setIsFBReady(true);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB || !isFBReady) {
      alert("Facebook SDK is not ready yet.");
      return;
    }

    window.FB.login(
      function (response) {
        if (response.authResponse) {
          // Fetch user info
          window.FB.api("/me", { fields: "name,email,picture" }, function (userInfo) {
            alert(`Welcome, ${userInfo.name}`);
            console.log("User Info:", userInfo);
          });
        } else {
          console.log("User cancelled login or failed authorization.");
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
        cursor: "pointer",
      }}
    >
      Login with Facebook
    </button>
  );
}
