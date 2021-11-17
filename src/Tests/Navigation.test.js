import React from 'react'
import ReactDOM from 'react-router-dom'
import Navigation from '../Components/Navigation'
import { itTSAnyKeyword } from '@babel/types'
import { render, screen } from '@testing-library/react';
import List from '../Components/Navigation'
import { BrowserRouter as Router } from 'react-router-dom'

// Test run - renders Navigation 

it("renders Navigation", () => {
    const div = document.createElement("div");
    render(
        <Navigation></Navigation>,
        div)
})