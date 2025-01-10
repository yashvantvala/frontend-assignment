import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import Table from "../../src/components/Table";
import App from "../../src/App";

const mockData = [
  {
    "s.no": 0,
    "percentage.funded": 15823,
    "amt.pledged": 186,
  },
];

global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("displays loading state", () => {
    render(<App />);
    expect(screen.getByText(/fetching/i)).toBeInTheDocument();
  });

  test("after data has loaded", async () => {
    render(<Table data={mockData} />);
    const firstRow = await screen.findByText("S.No.");
    expect(firstRow).toBeInTheDocument();
    expect(screen.getByText("15823")).toBeInTheDocument();
  });

  test("navigates to the next and previous pages", async () => {
    render(<Table data={mockData} />);

    await screen.findByText("15823");

    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);
    expect(await screen.findByText("S.No.")).toBeInTheDocument();
    expect(screen.queryByText("2065")).not.toBeInTheDocument();

    const prevButton = screen.getByLabelText("Previous");
    fireEvent.click(prevButton);

    expect(await screen.findByText("15823")).toBeInTheDocument();
  });

  test("disables Previous button on the first page", async () => {
    render(<Table data={mockData} />);

    await screen.findByText("15823");
    const prevButton = screen.getByLabelText("Previous");

    expect(prevButton).toBeDisabled();
  });

  test("disables Next button on the last page", async () => {
    render(<Table data={mockData} />);

    await screen.findByText("15823");
    const nextButton = screen.getByLabelText("Next");

    for (let i = 0; i < 21; i++) {
      fireEvent.click(nextButton);
    }

    expect(nextButton).toBeDisabled();
  });
});
