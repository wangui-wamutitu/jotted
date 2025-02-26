import { ActionFunctionArgs, LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { prisma } from "~/.server/db";
import {
  destroySession,
  getSession,
  getUserSession,
} from "~/common/session.server";
import Wrapper from "~/components/atoms/Wrapper";
import { useUserStore } from "~/stores/userDetailsStore";

export const action = async ({ request }: ActionFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};


export default function Logout() {
  const username = useUserStore((state) => state.username);

  return (
    <Wrapper username={username ?? ''}>
      <div
        className={"w-full h-full flex flex-col items-center justify-center"}
      >
        <p className={"text-lg border-b border-b-dark_pink mb-5"}>Are you sure you want to log out?</p>
          <Form method="post">
            <button className={'w-[120px] border border-dark_pink rounded-md text-center py-1 cursor-pointer my-4'}>Logout</button>
          </Form>
          <Link to="/" className={'italic hover:border-b hover:border-b-dark_pink'}>Gurrrllll, I was just messin' with you. Take me home abeg!!!</Link>
      </div>
    </Wrapper>
  );
}
