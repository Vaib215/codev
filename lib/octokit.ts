import { getSession } from "next-auth/react";
import { Octokit } from "octokit";
const getOkClient = async () => {
  const res = await getSession();
  return new Octokit({ auth: res?.user?.accessToken });
};

export const octokit = getOkClient();
