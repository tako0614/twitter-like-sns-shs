async function Tweet() {
  await fetch("http://localhost:8000/api/tweet/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: "Hello, World!",
      type: "tweet",
      userName: "YourUsername",
    }),
  });
}
async function getTweets() {
  const res = await fetch("http://localhost:8000/api/tweet/get", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      limit: 10,
    }),
  });
  const data = await res.json();
  console.log(data);
}
getTweets();
