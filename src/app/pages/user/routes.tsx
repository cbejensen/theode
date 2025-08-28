import { route } from "rwsdk/router";
import { Login } from "./Login";
import { sessions } from "@/session/store";
import { Profile } from "./Profile";

export const userRoutes = [
  route("/login", ({ ctx }) => {
    if (ctx.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/user/profile" },
      });
    }
    return <Login />;
  }),
  route("/logout", async function ({ request }) {
    const headers = new Headers();
    await sessions.remove(request, headers);
    headers.set("Location", "/");

    return new Response(null, {
      status: 302,
      headers,
    });
  }),
  route("/profile", [Profile]),
];
