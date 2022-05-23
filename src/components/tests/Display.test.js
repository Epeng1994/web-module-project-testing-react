import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import Display from './../Display';
import mockFetchShow from '../../api/fetchShow'

jest.mock('../../api/fetchShow')

const testShow = {
    name: 'Test',
    summary: 'this is summary',
    seasons: [
        {
            id:0, 
            name: "Season 1", 
            episodes: [1,2,3]
        },
        {
            id:1, 
            name: "Season 2", 
            episodes: [1,2,3]
        }
    ] 
}

test('renders without errors with no props', async () => {
    render(<Display/>)
 });

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display/>)
    //expect(screen.queryByTestId(/show-container/i)).not.toBeInTheDocument()
    const button = screen.queryByText(/Press to Get Show Data/i)
    userEvent.click(button)

    const show = await screen.findByTestId('show-container')
    expect(show).toBeInTheDocument()
 });

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow)

    render(<Display/>)
    //expect(screen.queryByTestId(/show-container/i)).not.toBeInTheDocument()
    const button = screen.queryByText(/Press to Get Show Data/i)
    userEvent.click(button)

    await waitFor(()=>{
        const show = screen.queryAllByTestId('season-option')
        expect(show).toHaveLength(2)
    })
 });

 test('displayFunc is called when fetch button is pressed', async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow)
    const displayFunc = jest.fn()

    render(<Display displayFunc = {displayFunc}/>)
    const button = screen.getByRole('button')
    userEvent.click(button)

    await waitFor(()=>{
        expect(displayFunc).toHaveBeenCalled() 
    })
 })