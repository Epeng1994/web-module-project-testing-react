import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';


const testEpisode = {
    id:1, 
    image:'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg', 
    name: '', 
    season: 1, 
    number: 1, 
    summary: 'This is summary', 
    runtime:1
}

const testEpisodeTwo = {
    id:1, 
    image:null, 
    name: '', 
    season: 1, 
    number: 1, 
    summary: 'What summary', 
    runtime:1
}




test("renders without error", () => {
    const {rerender} = render(<Episode episode={testEpisode} />)
 });

test("renders the summary test passed as prop", () => {
    const {rerender} = render(<Episode episode={testEpisode} />)
    const sumText = screen.queryByText(/this is summary/i)
    expect(sumText).toBeInTheDocument()
    expect(sumText).toHaveTextContent(/this is summary/i)
    rerender(<Episode episode={testEpisodeTwo} />)
    expect(screen.getByText(/what summary/i)).toBeInTheDocument()
 });

test("renders default image when image is not defined", () => {
    const {rerender} = render(<Episode episode={testEpisodeTwo} />)
    expect(screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')).toBeInTheDocument()
    expect(screen.getByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')).toHaveClass('episode-image')
    rerender(<Episode episode = {testEpisode}/>)
    expect(screen.getByAltText('http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg')).toBeInTheDocument()
 });
