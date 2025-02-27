import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, Link, useNavigation } from "@remix-run/react";
import { useEffect } from "react";
import {
  destroySession,
  getSession,
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
  const resetUser = useUserStore((state) => state.resetUser);

  const navigation = useNavigation();

  useEffect(() => {
    // When navigation state changes to "idle", it means redirect happened
    if (navigation.state === "submitting") {
      resetUser();
    }
  }, [navigation.state, resetUser]);


  return (
    <Wrapper>
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
