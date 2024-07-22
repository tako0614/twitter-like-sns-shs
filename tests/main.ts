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
async function getComments() {
  const res = await fetch("hhttp://localhost:8000/api/tweet/getComments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "669e432731de1e9e91c90d48",
    }),
  });
  const data = await res.json();
  console.log(data);
}
getComments();
