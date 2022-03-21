/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Main } from '../components/main';

describe("<Main />", () => {
  let main = render(<Main />).container
  test("Input labels nonempty", async () => {
    main
      .querySelectorAll("label")
      .forEach(label => {
        expect(label).toHaveTextContent(/\w+/i)
      })
  });
  test("All inputs blank", async () => {
    main
      .querySelectorAll("input")
      .forEach(input => {
        expect(input.value === "" || input.value === null).toBeTruthy()
      })
  });
});