import axios from "axios";

export type Lang = {
  language: string;
  info: string;
};

export const getLanguages = async (): Promise<Lang[]> => {
  const response = await axios.get("https://codex-4o85.onrender.com/list");
  return response.data.supportedLanguages.map((item: Lang) => item);
};

export type Code = {
  code: string | undefined;
  language: string | undefined;
  input: string | undefined;
};

export type CodeResponse = {
  timeStamp: number;
  status: number;
  output?: string;
  error?: string;
  language: string;
  info: string;
};

export const runCode = async ({
  code,
  language,
  input,
}: Code): Promise<CodeResponse> => {
  const response = await axios.post(
    "https://codex-4o85.onrender.com/",
    {
      code,
      language,
      input,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response.data;
};
