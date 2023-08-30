import axios from "axios";
export const getLanguages = async () => {
  const response = await axios.get("https://glot.io/api/run");
  return response.data.map((item: { name: string; url: string }) => item.name);
};

export const runCode = async () => {
  const response = await fetch("https://glot.io/api/run/python/latest/", {
    method: "POST",
    body: JSON.stringify({
      stdin: "42",
      files: [
        {
          name: `main.py`,
          content: "print('Hello world')",
        },
      ],
    }),
    headers: {
      Authorization: "Token 69e4abc9-fee8-437d-9cb9-a8f6ce55a31b",
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
};
