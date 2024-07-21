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
  const res = await fetch("http://localhost:8000/api/tweet/getComments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: "669cd6da7063d722d1a6fdaf",
    }),
  });
  const data = await res.json();
  console.log(data);
}
async function getTrend() {
  const res = await fetch("http://localhost:8000/api/trends", {
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
getTrend()