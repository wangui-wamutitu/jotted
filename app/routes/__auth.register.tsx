import type { ActionFunctionArgs } from "@remix-run/node"; // or cloudflare/deno
import { redirect } from "@remix-run/node"; // or cloudflare/deno
import { Link } from "@remix-run/react";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";
import { commitSession, getSession } from "~/common/session.server";
import { FormInput } from "~/components/atoms/ValidatedInput";
import { SubmitButton } from "~/components/atoms/SubmitBtn";
import { prisma } from "~/.server/db";
import { registerSchema } from "~/common/zod";
import { genSalt, hash } from "bcrypt-ts";
import Wrapper from "~/components/atoms/Wrapper";

const validator = withZod(registerSchema);

export async function action({ request }: ActionFunctionArgs) {
  const form = await request.formData();
  const data = Object.fromEntries(form);
  const validatedResults = await validator.validate(data);

  if (validatedResults?.error) {
    return validationError(validatedResults?.error);
  }

  const { username, email, password } = validatedResults?.data;

  //check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return validationError({
      fieldErrors: { email: "User already exists. Try login instead" },
    });
  }

  //hash the password
  const saltRounds = await genSalt(10);
  const hashedPassword = await hash(password, saltRounds);

  //create user
  const user = await prisma.user.create({
    data: {
      name: username,
      email,
      password: hashedPassword,
    },
  });

  //create session for the new user to automatically be logged in
  const session = await getSession(request.headers.get("Cookie"));
  session?.set("userId", user.id);
  user.email === "admin@email.com" ? session?.set("role", "WRITER") : session?.set("role", "USER");

  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function Register() {
  return (
    <Wrapper>
      <div
        className={"w-full h-full flex flex-col items-center justify-center"}
      >
        <p className={"text-lg border-b border-b-dark_pink mb-5"}>Sign up</p>
        <ValidatedForm validator={validator} method="post">
          <FormInput name="username" label="Username" inputType="text" />
          <FormInput name="email" label="Email" inputType="email" />
          <FormInput name="password" label="Password" inputType="password" />
          <div className={"w-full flex justify-center items-center mb-3"}>
            <SubmitButton />
          </div>
        </ValidatedForm>
        <span>
          Already have an account?{" "}
          <Link to="/login" className={"text-dark_pink"}>
            Login{" "}
          </Link>
        </span>
      </div>
    </Wrapper>
  );
}
