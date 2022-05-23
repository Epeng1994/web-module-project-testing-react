import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event'
import Show from './../Show';


/*
    name: data.name, text
    image: data.image, text
    summary: stripTags(data.summary), text 
    seasons: formatSeasons(data._embedded.episodes) arr 

*/ 




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


test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={'none'}/>)
 });

test('renders Loading component when prop show is null', () => {
    const showList = render(<Show show={false} selectedSeason={'none'}/>)
    expect(showList.getByText(/Fetching data.../i)).toBeInTheDocument()
 });

test('renders same number of options seasons are passed in', () => {
    const showList = render(<Show show={testShow} selectedSeason={'none'}/>)
    const seasonList = showList.getAllByTestId(/season-option/i)
    expect(seasonList).toHaveLength(2)
    expect(seasonList).toBeTruthy()
 });

test('handleSelect is called when an season is selected', async () => {
    const handleSelect = jest.fn()
    render(<Show show={testShow} selectedSeason={'none'} handleSelect = {handleSelect}/>)
    const select = screen.getByLabelText(/select a season/i)
    userEvent.selectOptions(select, ['1'])

    await waitFor(()=>{
        expect(handleSelect).toHaveBeenCalled() 
    })
 });
//come back
test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const {rerender} = render(<Show show={testShow} selectedSeason={'none'}/>)
    expect(screen.queryByTestId('episodes-container')).not.toBeInTheDocument()
    rerender(<Show show={testShow} selectedSeason={'1'}/>)
    expect(screen.queryByTestId('episodes-container')).toBeInTheDocument()

 });
