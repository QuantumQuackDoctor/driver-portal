import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DisplayOrdersPage from "./DisplayOrdersPage"


describe("register page component", () => {
    it("creates", () => {
        render(<DisplayOrdersPage />);
    });
});