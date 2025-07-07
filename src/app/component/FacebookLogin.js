"use client";
import { useEffect, useState } from "react";

export default function FacebookLogin() {
  const [isFBReady, setIsFBReady] = useState(false);

  useEffect(() => {
    // Check if SDK is already loaded
    if (window.FB) {
      setIsFBReady(true);
      return;
    }

    // Initialize FB SDK
    window.fbAsyncInit = function() {
      FB.init({
        appId: "2145673955940333",
        cookie: true,
        xfbml: true,
        version: "v19.0"
      });
      setIsFBReady(true);
    };

    // Load SDK script
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    return () => {
      // Cleanup if needed
      delete window.fbAsyncInit;
    };
  }, []);

  const handleFacebookLogin = () => {
    if (!isFBReady) {
      alert("Facebook SDK is still loading. Please try again.");
      return;
    }

    FB.login(response => {
      if (response.authResponse) {
        FB.api('/me', { fields: 'name,email,picture' }, userInfo => {
          console.log("User Info:", userInfo);
          alert(`Welcome, ${userInfo.name}!`);
          // Here you would typically send the auth data to your backend
        });
      } else {
        console.log("User cancelled login or didn't authorize.");
      }
    }, { scope: 'public_profile,email' });
  };

  return (
    <button
      onClick={handleFacebookLogin}
      disabled={!isFBReady}
      style={{
        padding: "10px 20px",
        background: "#4267B2",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        opacity: isFBReady ? 1 : 0.7
      }}
    >
      {isFBReady ? "Login with Facebook" : "Loading Facebook..."}
    </button>
  );
}