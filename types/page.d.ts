import { NextPage } from "next";

export type NextPageWithAuth<Props = {}> = NextPage<Props> & {
  auth: boolean;
}