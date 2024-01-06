import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { RequestHandler } from "msw";
import { setupServer } from "msw/node";

// 共通のセットアップ関数として定義しておく
export function setupMockServer(...handlers: RequestHandler[]) {
  // 可変長数で引数に値を渡す
  // 複数のレクエストに対するモックサーバーを一度に作成できる。例えば異なるURLなど
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  // テストごとにサーバーを初期化する
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}

export function selectImageFile(
  inputTestId = "file",
  fileName = "hello.png",
  content = "hello"
) {
  const user = userEvent.setup();
  const filePath = [`C:\\fakepath\\${fileName}`];
  const file = new File([content], fileName, { type: "image/png" });
  const fileInput = screen.getByTestId(inputTestId);
  const selectImage = () => user.upload(fileInput, file);
  return { fileInput, filePath, selectImage };
}

const original = window.location;

export function mockWindowLocationReload() {
  Object.defineProperty(window, "location", {
    writable: true,
    value: { reload: jest.fn() },
  });
  const cleanup = () => {
    Object.defineProperty(window, "location", {
      writable: true,
      value: original,
    });
  };
  return cleanup;
}
