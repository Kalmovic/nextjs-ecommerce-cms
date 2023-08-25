import { auth } from "@clerk/nextjs";

type UserInfo =
  | {
      kind: "logged";
      userId: string;
    }
  | {
      kind: "not-logged";
      userId: null;
    };

export const userInfo = (): UserInfo => {
  const { userId } = auth();
  return !!userId
    ? { kind: "logged", userId }
    : { kind: "not-logged", userId: null };
};
