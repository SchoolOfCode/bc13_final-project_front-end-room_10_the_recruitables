import React from "react";
import "@testing-library/jest-dom";
import {screen, render } from "@testing-library/react";
import {BrowserRouter, Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";

import NavBarLogin from "./NavBarLogin";

describe("<NavBarLogin/>", () => {
    it("successfully renders the component, matches snapshot", () => {
        const { asFragment } = render(
            <BrowserRouter>
                <NavBarLogin />
            </BrowserRouter>
        );
        expect(asFragment()).toMatchSnapshot();
      });

    it('renders all 2 links on the screen', () => {
        render(
            <BrowserRouter>
                <NavBarLogin />
            </BrowserRouter>
        );
       
        const links = screen.getAllByRole('link')
        expect(links.length).toBe(2)
    })


    it('renders all 2 link texts on the screen', () => {
        const {getAllByText} = render(
            <BrowserRouter>
                <NavBarLogin />
            </BrowserRouter>
        );
        expect(getAllByText(/login/i)[0]).toBeInTheDocument();
        expect(getAllByText(/register/i)[0]).toBeInTheDocument();
    })
   
    
})