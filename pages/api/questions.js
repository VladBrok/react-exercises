import url from "url";

export default async function handler(req, res) {
  const query = url.parse(req.url, true).search;
  const response = await fetch(`https://quizapi.io/api/v1/questions${query}`, {
    headers: {
      "X-Api-Key": process.env.QUIZ_API_KEY,
    },
  });

  if (!response.ok) {
    res.status(response.status);
  }

  const json = await response.json();
  res.status(200).json(json);
}
