"use client";
import { useEffect, useState } from "react";

export default function FacebookLogin() {
  const [isFBReady, setIsFBReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load FB SDK if not already present
    if (window.FB) {
      setIsFBReady(true);
      return;
    }

    window.fbAsyncInit = function () {
      FB.init({
        appId: "2145673955940333", // ✅ Your App ID
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });

      FB.AppEvents.logPageView();
      setIsFBReady(true);
    };

    // Inject the SDK script
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  const checkLoginState = () => {
    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        const accessToken = response.authResponse.accessToken;
        console.log("✅ Access Token:", accessToken);
        fetchUserInfo(); // Get name + email
      } else {
        console.log("⚠️ Not connected to Facebook.");
      }
    });
  };

  const fetchUserInfo = () => {
    FB.api("/me", { fields: "id,name,email,picture" }, function (response) {
      console.log("👤 User Info:", response);
      setUser(response);
    });
  };

  const handleFacebookLogin = () => {
    if (!window.FB || !isFBReady) {
      alert("Facebook SDK not ready yet.");
      return;
    }

    FB.login(
      function (response) {
        if (response.authResponse) {
          console.log("✅ Logged in.");
          checkLoginState(); // Get accessToken & user info
        } else {
          console.log("❌ Login cancelled.");
        }
      },
      { scope: "public_profile,email" }
    );
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
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
          opacity: isFBReady ? 1 : 0.5,
        }}
      >
        {isFBReady ? "Login with Facebook" : "Loading..."}
      </button>

      {user && (
        <div style={{ marginTop: "20px" }}>
          <p>Welcome, <strong>{user.name}</strong></p>
          <img src={`https://graph.facebook.com/${user.id}/picture?type=large`} alt="Profile" />
        </div>
      )}
    </div>
  );
}
