import FrontPage from "../FrontPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { screen, render } from "@testing-library/react";
import { AuthContextProvider } from "../../context/AuthContext";

describe("FrontPage", () => {
  test("should link", async () => {
    render(
      <AuthContextProvider>
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<FrontPage />} />
          </Routes>
        </MemoryRouter>
      </AuthContextProvider>
    );
    const booking = await screen.findByText("Varaa uusi aika");
    const manage = await screen.findByText("Hallinnoi ajanvarauksia");

    expect(booking.href).toContain("booking");
    expect(manage.href).toContain("manage-booking");
  });
});
