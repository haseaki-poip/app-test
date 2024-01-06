import { rest } from "msw";
import { setupServer } from "msw/node";

// モックサーバーのセットアップ
const server = setupServer(
  rest.get("https://api.example.com/data", (req, res, ctx) => {
    return res(ctx.json({ key: "value" }));
  })
);

// テストスイート全体でモックサーバーを起動
beforeAll(() => server.listen());
// 各テストの前にリクエストの履歴をリセット
beforeEach(() => server.resetHandlers());
// テストスイート全体でモックサーバーをシャットダウン
afterAll(() => server.close());

// jestのテスト内でfetch()を使うにはjest.setup.tsで
// import "whatwg-fetch";を記述する必要がある
test("fetch data from API", async () => {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  expect(data).toEqual({ key: "value" });
});
