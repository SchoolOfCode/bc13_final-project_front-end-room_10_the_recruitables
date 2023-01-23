import { render, screen} from '@testing-library/react';
import {BrowserRouter, Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import { useNavigate } from 'react-router-dom';
import App from './App';


describe('<App/>', () => {
    test('should show logo, email, password', () => {
        render(<App/>)
        const logo = screeen.getByRole('img')
        expect(logo).toBeInTheDocument()    
      
    });


    // test('should redirect and update history', () => {
    //     const history = createMemoryHistory();
    
    //     render(<Router history={history}><App/></Router>);
    
    //     userEvent.click(screen.getByText(/About/));
    
    //     expect(history.location.pathname).toEqual('/about');
    // });
    
    // test('should redirect and update dom', () => {
    //     render(<BrowserRouter><App/></BrowserRouter>);
    
    //     userEvent.click(screen.getByText(/About/));
    
    //     expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    // });


})


// test('should redirect and update history', () => {
//     const history = createMemoryHistory();

//     render(<Router history={history}><App/></Router>);

//     userEvent.click(screen.getByText(/About/));

//     expect(history.location.pathname).toEqual('/about');
// });

// test('should redirect and update dom', () => {
//     render(<BrowserRouter><App/></BrowserRouter>);

//     userEvent.click(screen.getByText(/About/));

//     expect(screen.getByText(/About Us/i)).toBeInTheDocument();
// });

