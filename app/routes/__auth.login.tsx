import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { Link, useLoaderData } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { compare } from "bcrypt-ts";
import { ValidatedForm, validationError } from "remix-validated-form";
import { prisma } from "~/.server/db";
import { commitSession, getSession } from "~/common/session.server";
import { loginSchema } from "~/common/zod";
import { SubmitButton } from "~/components/atoms/SubmitBtn";
import { FormInput } from "~/components/atoms/ValidatedInput";
import Wrapper from "~/components/atoms/Wrapper";

const validator = withZod(loginSchema);

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();
  const data = Object.fromEntries(form);
  const results = await validator.validate(data);

  if (results?.error) {
    return validationError(results?.error);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: results.data.email },
    select: { id: true, name: true, email: true, password: true, role:true },
  });

  const userWithPassword = await prisma.$queryRaw<
    { password: string }[]
  >`SELECT password FROM "User" WHERE email = ${results.data.email}`;

  if (!existingUser) {
    return validationError({
      fieldErrors: { email: "This email does not exist. Fix it or register first" },
    });
  }

  const storedPassword = userWithPassword[0].password;
  if (!(await compare(results.data.password, storedPassword))) {
    return validationError({
      fieldErrors: { password: "Invalid password. Try again." },
    });
  }

  //create session for the new user to automatically be logged in
  session?.set("userId", existingUser.id);
  existingUser.email !== "admin@email.com"
    ? session?.set("role", "USER")
    : session?.set("role", "WRITER");

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Login() {
  return (
    <Wrapper>
      <div
        className={"w-full h-full flex flex-col items-center justify-center"}
      >
        <p className={"text-lg border-b border-b-dark_pink mb-5"}>Sign up</p>
        <ValidatedForm validator={validator} method="post">
          <FormInput name="email" label="Email" inputType="email" />
          <FormInput name="password" label="Password" inputType="password" />
          <div className={"w-full flex justify-center items-center mb-3"}>
            <SubmitButton />
          </div>
        </ValidatedForm>
        <span>
          Don't have an account?{" "}
          <Link to="/register" className={"text-dark_pink"}>
            Register{" "}
          </Link>
        </span>
      </div>
    </Wrapper>
  );
}
