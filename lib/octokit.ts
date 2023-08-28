import { getSession } from "next-auth/react";
import { Octokit } from "octokit";
const getData = () => {
  return getSession().then(
    (res) => new Octokit({ auth: res?.user.accessToken })
  );
};

export const octokit = getData();
