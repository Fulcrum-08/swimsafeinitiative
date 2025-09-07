async function checkAuth() {
  const res = await fetch("/auth/status");
  const data = await res.json();

  if (data.loggedIn) {
    document.getElementById("login-btn").style.display = "none";
    document.getElementById("logout-btn").style.display = "inline";
    document.getElementById("signup-section").style.display = "block";
  } else {
    document.getElementById("login-btn").style.display = "inline";
    document.getElementById("logout-btn").style.display = "none";
    document.getElementById("signup-section").style.display = "none";
  }
}

document.getElementById("login-btn").onclick = () => {
  window.location.href = "/auth/google";
};
document.getElementById("logout-btn").onclick = () => {
  window.location.href = "/auth/logout";
};

document.getElementById("signup-btn").onclick = async () => {
  const event = document.getElementById("event").value;
  const res = await fetch("/signup-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event })
  });
  const data = await res.json();
  document.getElementById("status").innerText = data.success
    ? "Request sent successfully!"
    : "Error sending request.";
};

checkAuth();
