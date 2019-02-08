import React from 'react';
// Our Dependencies
import { expect } from './utils/chai';
import renderer from "react-test-renderer";

// Our Component
import Container from './Container';

describe('Container', () => {

  it("renders correctly", () => {
     const output = renderer.create(
         <Container />
   ).toJSON();
     expect(output).to.matchSnapshot();
  });
})
