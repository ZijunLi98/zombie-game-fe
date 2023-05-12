export const getGameResult = async (data) => {
  const response = await fetch("http://localhost:8000/get-result", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = response.json();
  return result;
};
