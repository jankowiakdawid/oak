import { assert, test } from "https://deno.land/x/std/testing/mod.ts";
import { Context } from "./context.ts";

import { Status } from "./deps.ts";
import { Router } from "./router.ts";
import { Request } from "./request.ts";
import { Response } from "./response.ts";

function createMockContext<S extends object = { [key: string]: any }>() {
  return {
    request: {
      headers: new Headers(),
      method: "GET",
      path: "/",
      search: undefined,
      searchParams: new URLSearchParams(),
      url: "/"
    } as Request,
    response: {
      status: Status.OK,
      body: undefined,
      headers: new Headers()
    } as Response
  } as Context<S>;
}

function createMockNext() {
  return async function next() {};
}

test(async function basicRouter() {
  const router = new Router();
  const context = createMockContext();
  const next = createMockNext();
  const mw = router.routes();
  assert.equal(await mw(context, next), undefined);
});
