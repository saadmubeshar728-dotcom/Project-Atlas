import { createServer, type Server, type IncomingMessage, type ServerResponse } from "node:http";
import type { RawLeadInput } from "@atlas/domain";

/**
 * docs/04-Architecture-Specification.md, section 8: "Browser Extension -> Desktop"
 * communication is "Local IPC" carrying JSON. A Chrome extension cannot open a
 * raw OS-level IPC channel or Electron IPC directly, so in practice this means
 * a small HTTP server bound to localhost only, which the extension calls via
 * fetch(). This keeps the contract identical to the doc's example payload
 * while being achievable from a Manifest V3 extension.
 *
 * Security: binds to 127.0.0.1 only (never 0.0.0.0), so it is not reachable
 * from the network - only from processes on the same machine.
 */
export interface LocalServerOptions {
  port: number;
  onLeadsReceived: (leads: RawLeadInput[]) => Promise<{ accepted: number; rejected: number }>;
}

export function createLocalServer(options: LocalServerOptions): Server {
  const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    // Only the extension's own origin should be able to call this in practice;
    // CORS is restricted to the extension's origin at the Electron app layer.
    res.setHeader("Access-Control-Allow-Origin", "chrome-extension://*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.writeHead(204).end();
      return;
    }

    if (req.method !== "POST" || req.url !== "/leads/import") {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    try {
      const body = await readJsonBody(req);
      const leads = Array.isArray(body) ? body : [body];
      const result = await options.onLeadsReceived(leads as RawLeadInput[]);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: (err as Error).message }));
    }
  });

  server.listen(options.port, "127.0.0.1");
  return server;
}

function readJsonBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(JSON.parse(data || "{}"));
      } catch {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}
