global.___loader = {
  enqueue: jest.fn(),
};

global.__PATH_PREFIX__ = "";

window.matchMedia =
  window.matchMedia ||
  function matchMedia() {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

jest.mock("gatsby");

jest.mock("react-helmet", () => {
  return {
    Helmet: () => null,
  };
});
