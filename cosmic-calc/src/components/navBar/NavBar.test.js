import React from "react";
import "@testing-library/jest-dom";
import {screen, render } from "@testing-library/react";
import {BrowserRouter, Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";

import NavBar from "./NavBar";

describe("<NavBar/>", () => {
    it("successfully renders the component, matches snapshot", () => {
        const { asFragment } = render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        
        );
        expect(asFragment()).toMatchSnapshot();
      });

    it('there are 4 links on the screen', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        
        );
        screen.debug()
        const links = screen.getAllByRole('link')
        expect(links.length).toBe(4)
    })

    it('renders all expected link texts to the screen', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        
        );
        const linkTexts = ['Profile', 'Progress', 'Game']

        screen.debug()
        const linkTexts = screen.getAllByText()
        const matchedItems= linkTexts.every(item => [...links].includes(item))
       console.log(matchedItems)
    })

})