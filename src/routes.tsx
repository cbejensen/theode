import { route, RouteMiddleware } from "rwsdk/router";
import { Login } from "./app/pages/Login";
import { sessions } from "./session/store";
import { Settings } from "./app/pages/Settings";
import { Home } from "./app/pages/Home";
import { User } from "./app/pages/User";
import { db } from "./db";

const isAuthenticated: RouteMiddleware = ({ ctx }) => {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
};

export const routes = [
  route("/", Home),
  route("/login", ({ ctx }) => {
    if (ctx.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: `/users/${ctx.user.id}` },
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
  route("/settings", [isAuthenticated, () => <Settings />]),
  route("/users/:userId", [
    isAuthenticated,
    async function ({ params }) {
      const userId = params.userId;
      if (!userId) {
        return new Response(null, { status: 404 });
      }
      const user = await db.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return new Response(null, { status: 404 });
      }
      return <User user={user} />;
    },
  ]),
];
