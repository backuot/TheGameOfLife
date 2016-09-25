import React from 'react';
import { shallow } from 'enzyme';
import Conclusions from '../components/conclusions';
import Outside from '../components/outside';
import Within from '../components/within';

describe('Test: Component Conclusions', function () {
  const wrapper = shallow(<Conclusions disable={'0'} enable={'1'} />);

  it('Should render as a <div>', function () {
    expect(wrapper.is('div')).to.equal(true);
  });

  it('Should render as elements', function () {
    expect(wrapper.contains(<div className='cont disable'>0</div>)).to.equal(true);
    expect(wrapper.contains(<div className='cont enable'>1</div>)).to.equal(true);
  });

  const wrapper1 = shallow(<Conclusions />);

  it('Should render as elements without props', function () {
    expect(wrapper1.contains(<div className='cont disable'></div>)).to.equal(true);
    expect(wrapper1.contains(<div className='cont enable'></div>)).to.equal(true);
  });
});

describe('Test: Component Outside', function () {
  const wrapper = shallow(<Outside text={'Старт'} stateGame={function stateGame() {}} addField={function addField() {}} gameProcess={function gameProcess() {}} />);
  let button,
      button1;

  it('Should render as a <div>', function () {
    expect(wrapper.is('div')).to.equal(true);
  });

  beforeEach(() => {
    button = wrapper.find('button').filterWhere(a => a.text() === 'Новая игра');
    button1 = wrapper.find('button').filterWhere(a => a.text() === 'Старт');
  });

  const wrapper1 = shallow(<Outside />);

  it('Should render as buttons without props', function () {
    expect(wrapper1.find('button').filterWhere(a => a.hasClass('button button1')).text() === 'Новая игра').to.equal(true);
    expect(wrapper1.find('button').filterWhere(a => a.hasClass('button button2')).text() === '').to.equal(true);
  });
});

describe('Test: Component Within', function () {
  function createMatrix(n = 33, m = 37) {
    var data = [];

    for (var i = 0; i < n; i++) {
      data[i] = [];
      for (var j = 0; j < m; j++) {
        data[i][j] = 0;
      }
    }

    return data;
  }
  var data = createMatrix();

  data[0][0] = 1;
  data[0][1] = 1;
  data[0][2] = 1;
  data[0][3] = 1;
  data[0][4] = 1;

  const wrapper = shallow(<Within field={data} enableCell={function enableCell() {}} />);

  it('Should render as a <div>', function () {
    expect(wrapper.is('div')).to.equal(true);
  });

  it('Should render as cells', function () {
    expect(wrapper.find('div').filterWhere(a => a.hasClass('cells disable'))).to.have.length(1216);
    expect(wrapper.find('div').filterWhere(a => a.hasClass('cells enable'))).to.have.length(5);
  });

  const wrapper1 = shallow(<Within />);

  it('Should render as cells without props', function () {
    expect(wrapper1.find('div').filterWhere(a => a.hasClass('cells'))).to.have.length(0);
  });
});

describe('Test: Component Outside functions', function () {
  it('should call the calledOnce stateGame', function () {
    const stateGame = sinon.spy();
    const wrapper = shallow(<Outside text={'Старт'} stateGame={stateGame} addField={function addField() {}} gameProcess={function gameProcess() {}} />);
    wrapper.find('button').filterWhere(a => a.hasClass('button button2')).simulate('click');
    expect(stateGame).to.have.property('callCount', 1);
  });

  it('should call the calledOnce newGame', function () {
    const addField = sinon.spy(),
          stateGame = sinon.spy(),
          wrapper = shallow(<Outside text={'Старт'} stateGame={stateGame} addField={addField} gameProcess={function gameProcess() {}} />);
    wrapper.find('button').filterWhere(a => a.hasClass('button button1')).simulate('click');
    expect(addField).to.have.property('callCount', 2);
    expect(stateGame).to.have.property('callCount', 0);
    expect(wrapper.find('button').filterWhere(a => a.hasClass('button button2')).text() === 'Старт').to.equal(true);
    expect(wrapper.find('div').filterWhere(a => a.hasClass('cells enable'))).to.have.length(0);
  });
});