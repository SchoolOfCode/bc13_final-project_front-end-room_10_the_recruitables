import React from "react";
import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {BrowserRouter, MemoryRouter, useLocation} from 'react-router-dom'

import Login from "./LoginPage";

describe('<LoginPage/> rendering and navigataing', () => {
    
    it("successfully renders the component, matches snapshot", () => {
        const { asFragment } = render(<Login />, {wrapper: BrowserRouter});
        expect(asFragment()).toMatchSnapshot();
      });

     
    it("verifies page content for default route", async () => {
        render(<Login />, {wrapper: BrowserRouter})              
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
        // expect(screen.getByRole('button', {name: /login/i})).toBeInTheDocument()   
        // expect(screen.getByTestId('loginButton').textContent).toBe("50 + 20 =");
    })

})

