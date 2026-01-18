import { AuthConfig } from "convex/server";

export default {
  providers: [
    {
      domain: "https://free-frog-52.clerk.accounts.dev", 
      applicationID: "convex",
    },
  ]
} satisfies AuthConfig;