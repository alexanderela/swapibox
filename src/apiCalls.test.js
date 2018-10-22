import React from 'react';
import * as API from './apiCalls';

describe('fetchData function', () => {
  it('calls fetch with the correct parameters', async () => {
      //Setup
      const expected = "someUrl.com"
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve()
      }))
      //Execution
      await API.fetchData(expected)
      //Expectation
      expect(window.fetch).toHaveBeenCalledWith(expected)
    })

    it('throws an error if fetch fails', async () => {
      //Setup & Execution
      const mockUrl = "someUrl.com"
      const expected = Error('Fetch has failed')
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500,
        json: () => Promise.resolve()
      }))
      //Expectation
      await expect(API.fetchData(mockUrl)).rejects.toEqual(expected)
    })
}) 