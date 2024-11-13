import { Config } from "@netlify/edge-functions";
import agents from "../../agents.json";

/* eslint-disable import/no-anonymous-default-export */

export default async (request: Request) => {
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  
  // Check if the User-Agent is in the allowed list
  const isAllowed = agents.allowed.some(agent => userAgent.includes(agent.toLowerCase()));

  // Check if the User-Agent is in the disallowed list
  const isDisallowed = agents.disallowed.some(agent => userAgent.includes(agent.toLowerCase()));

  // If the User-Agent is explicitly disallowed, block it
  if (isDisallowed) {
    return new Response(null, { status: 401 });
  }

  // If the User-Agent is allowed, or if it does not match any disallowed agent, allow access
  if (isAllowed || !isDisallowed) {
    return; // Allow access
  }

  // Block any User-Agent not in the allowed list
  return new Response(null, { status: 401 });
};

export const config: Config = {
  path: "*" as `/${string}`,
};