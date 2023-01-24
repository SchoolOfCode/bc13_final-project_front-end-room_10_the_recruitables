import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'
import App from './App';
import {BrowserRouter, MemoryRouter, useLocation} from 'react-router-dom'


describe('<App/> rendering and navigataing', () => {
    
    it("successfully renders the component, matches snapshot", () => {
        const { asFragment } = render(<App />, {wrapper: BrowserRouter});
        expect(asFragment()).toMatchSnapshot();
      });

    it("verifies page content for default route", async () => {
        render(<App />, {wrapper: BrowserRouter})              
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', {name: /login/i})).toBeInTheDocument()    
    
    })

    it('verifies page content for expected route after navigating- from home page to register page', async () => {
        render(<App />, {wrapper: BrowserRouter})   
        await userEvent.click(screen.getByRole('button', {name: /register/i}))
        expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    })
})
