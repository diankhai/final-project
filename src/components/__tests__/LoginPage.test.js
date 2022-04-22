import React from 'react';
import ReactTestUtils from 'react-dom/test-utils'; 
import LoginPage from '../LoginPage';
import {render, screen} from '@testing-library/react'

// npm test -- --verbose

describe('ProductHeader Component', () => {
 
    it('success load img', () => {
        const component = render(<LoginPage/>);    
        var h2 = ReactTestUtils.findRenderedDOMComponentWithTag(
         component, 'img'
       );
    });
   
    it('button is showing', () => {
        render(<LoginPage />);
        const tracksComp = screen.findAllByText('Authorization');
        expect(tracksComp).toBeInTheDocument();
    })
  })