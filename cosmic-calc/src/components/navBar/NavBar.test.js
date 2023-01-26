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

    it('renders 4 links on the screen', () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        
        );
       
        const links = screen.getAllByRole('link')
        expect(links.length).toBe(4)
    })

    it('renders all 3 link texts on the screen', () => {
        const {getAllByText} = render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        
        );

   
    expect(getAllByText('Profile')[0]).toBeInTheDocument();
    expect(getAllByText('Progress')[0]).toBeInTheDocument();
    expect(getAllByText('Game')[0]).toBeInTheDocument();
    
    })

})