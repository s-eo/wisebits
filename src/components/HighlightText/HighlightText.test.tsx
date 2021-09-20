import React, {FunctionComponent} from "react";
import {cleanup, render} from '@testing-library/react';
import {HighlightText} from "./index";


afterEach(cleanup);

describe('Returns children as is', () => {
  it('when with-prop is empty',  () => {
    const {container} = render(<HighlightText with="" text={['bar']}>foo bar baz</HighlightText>);

    expect(container?.firstChild?.nodeName).toMatch('#text');
    expect(container?.firstChild?.textContent).toMatch( 'foo bar baz');
  });

  it('when text-array is empty',  () => {
    const {container} = render(<HighlightText with="span" text={[]}>foo bar baz</HighlightText>);

    expect(container?.firstChild?.nodeName).toMatch('#text');
    expect(container?.firstChild?.textContent).toMatch( 'foo bar baz');
  });

  it('when they are not a string',  () => {
    const Cat = () => <div>Cat</div>;
    const {container} = render(<HighlightText with="span" text={['Cat']}>
      <Cat/>
      <Cat/>
    </HighlightText>);

    expect(container.firstChild?.textContent).toBe('Cat');
    expect(container.lastChild?.textContent).toBe('Cat');
  });
});

it('Doesn\'t fail on empty children',  () => {
  const {container} = render(<HighlightText with="span" text={['bar']} />);

  expect(container.firstChild).toBe(null);
});

describe('With-prop wraps', () => {
  it('text item in the children',  () => {
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

  it('multiple text items in the children',  () => {
    const expected = [
      { 'nodeName': '#text', 'textContent': 'foo'},
      { 'nodeName': '#text', 'textContent': ' '},
      { 'nodeName': 'B', 'textContent': 'bar'},
      { 'nodeName': '#text', 'textContent': ' '},
      { 'nodeName': 'B', 'textContent': 'baz'},
      { 'nodeName': '#text', 'textContent': ' '},
      { 'nodeName': 'B', 'textContent': 'bar'},
    ];

    const {container} = render(<HighlightText with="b" text={['bar', 'baz']}>foo bar baz bar</HighlightText>);

    for (let [index, item] of container.childNodes.entries()) {
      expect(item.nodeName).toMatch(expected[index].nodeName);
      expect(item.textContent).toMatch(expected[index].textContent);
    }
  });

  it('with non-string component',  () => {
    interface CoatProps {
      children?: React.ReactNode;
    }
    const Coat: FunctionComponent<CoatProps> = (props: CoatProps) => <>{props.children} in a warm coat</>;
    const expected = [
      { 'nodeName': '#text', 'textContent': 'foo'},
      { 'nodeName': '#text', 'textContent': ' '},
      { 'nodeName': '#text', 'textContent': 'bar'},
      { 'nodeName': '#text', 'textContent': 'in a warm coat'},
      { 'nodeName': '#text', 'textContent': ' '},
      { 'nodeName': '#text', 'textContent': 'baz'},
    ];

    const {container} = render(<HighlightText with={Coat} text={['bar']}>foo bar baz</HighlightText>);

    for (let [index, item] of container.childNodes.entries()) {
      expect(item.nodeName).toMatch(expected[index].nodeName);
      expect(item.textContent).toMatch(expected[index].textContent);
    }
  });
});