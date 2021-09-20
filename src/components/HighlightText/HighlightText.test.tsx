import React from "react";
import {cleanup, render} from '@testing-library/react';
import {HighlightText} from "./index";


afterEach(cleanup);

it('With-prop wraps text item in the children',  () => {
  const expected = [
    { 'nodeName': '#text', 'textContent': 'foo'},
    { 'nodeName': '#text', 'textContent': ' '},
    { 'nodeName': 'SPAN', 'textContent': 'bar'},
    { 'nodeName': '#text', 'textContent': ' '},
    { 'nodeName': '#text', 'textContent': 'baz'},
  ];

  const {container} = render(<HighlightText with="span" text={['bar']}>foo bar baz</HighlightText>);

  for (let [index, item] of container.childNodes.entries()) {
    expect(item.nodeName).toMatch(expected[index].nodeName);
    expect(item.textContent).toMatch(expected[index].textContent);
  }
});