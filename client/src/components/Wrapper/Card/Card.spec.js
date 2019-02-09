// External Depedencies
import React from 'react';
import { shallow, mount} from 'enzyme';
// Our Dependencies
import { expect } from '../../utils/chai';
import renderer from "react-test-renderer";
import sinon from 'sinon'
// Our Component
import Card from './Card';

const getSelection = jest.fn()
Object.defineProperty(window, 'getSelection', getSelection);

console.log(typeof getSelection);

describe('Card', () => {
  let app;
  const spyfetchFunc = sinon.spy(Card.prototype, 'fetchQuotes'),
  mockSetTooltipFunc = jest.fn(),
  mockSetCardFunc = jest.fn(),
  mockDisableFunc = jest.fn(),
  mockChangeQuoteFunc = jest.fn(),
  mockPushQuotesFunc = jest.fn();

  beforeEach(() => {
    const props = {
      cardVisibility: "show",
      tooltipVisibility: "hide",
      disabled: false,
      currentQuote: 'mockQuote',
      currentAuthor: 'mockAuthor',
      quotesData: [{'quote': 'sample1', 'author': 'author1'}, {'quote': 'sample2', 'author': 'author2'}],
      setTooltipVisibility: mockSetTooltipFunc,
      setCardVisibility: mockSetCardFunc,
      disableButton: mockDisableFunc,
      changeQuote: mockChangeQuoteFunc,
      pushQuotes: mockPushQuotesFunc
    };
    app = mount(
      <Card {...props}/>
    );
  })

  afterEach(() => {
    app.unmount();
    mockSetTooltipFunc.mockClear();
    mockSetCardFunc.mockClear();
    mockDisableFunc.mockClear();
    mockChangeQuoteFunc.mockClear();
    spyfetchFunc.restore();
  })

  it('should have expected initial state', () => {
      expect(app.props().cardVisibility).to.equal('show');
      expect(app.props().tooltipVisibility).to.equal('hide');
      expect(app.props().disabled).to.equal(false);
      expect(app.props().currentQuote).to.equal('mockQuote');
      expect(app.props().currentAuthor).to.equal('mockAuthor');
  })

  it('should initialize with right attributes', () => {
    expect(app).to.have.className('show');
    expect(app.find('span')).to.have.className('hide');
    expect(app.find('#text')).to.have.text('mockQuote');
    expect(app.find('#author')).to.have.text('mockAuthor');
    expect(app.find('button')).to.have.prop('disabled', false);
  })

  it('should call spyfetchFunc once after did mount', () => {
    expect(spyfetchFunc.calledOnce).to.be.true;
  })

  describe('when new quote button is clicked', () => {
    jest.useFakeTimers();
    beforeEach(() => {
      const icon = app.find('#new-quote').first();
      icon.simulate('click');
    })
    afterEach(() => {
      mockSetTooltipFunc.mockClear();
      mockSetCardFunc.mockClear();
      mockDisableFunc.mockClear();
      mockChangeQuoteFunc.mockClear();
    })
    it('should show hide card and disable button', () => {
        expect(mockSetCardFunc.mock.calls.length).to.equal(1);
        expect(mockSetCardFunc.mock.calls[0][0]).to.equal('hide');
        expect(mockDisableFunc.mock.calls.length).to.equal(1);
        expect(mockDisableFunc.mock.calls[0][0]).to.equal(true);
        jest.advanceTimersByTime(2000);
        expect(mockSetCardFunc.mock.calls.length).to.equal(2);
        expect(mockSetCardFunc.mock.calls[1][0]).to.equal('show');
        expect(mockChangeQuoteFunc.mock.calls.length).to.equal(1);
        jest.advanceTimersByTime(3000);
        expect(mockDisableFunc.mock.calls.length).to.equal(2);
        expect(mockDisableFunc.mock.calls[1][0]).to.equal(false);
    })
  })




})
