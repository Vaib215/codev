import { getSession } from "next-auth/react";
import { Octokit } from "octokit";
const getOkClient = async () => {
  const res = await getSession();
  return new Octokit({ auth: res?.user?.accessToken });
};

export const createAndSaveGist = async (
  filename: string,
  language: string,
  content: string
) => {
  const response = await (
    await octokit
  ).rest.gists.create({
    public: true,
    files: {
      [filename + "." + language]: {
        content,
      },
    },
  });
  return response.data.id;
};

export const octokit = getOkClient();
