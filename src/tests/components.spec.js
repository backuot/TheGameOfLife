import React from 'react';
import { shallow } from 'enzyme';
import StateField from '../components/StateField';
import GameControl from '../components/GameControl';
import GameField from '../components/GameField';

describe('Test: Component StateField', function () {
  const wrapper = shallow(<StateField disable={'0'} enable={'1'} />);

  it('Should render as a <div>', function () {
    expect(wrapper.is('div')).to.equal(true);
  });

  it('Should render as elements', function () {
    expect(wrapper.contains(<div className='cont disable'>0</div>)).to.equal(true);
    expect(wrapper.contains(<div className='cont enable'>1</div>)).to.equal(true);
  });

  const wrapNoProps = shallow(<StateField />);

  it('Should render as elements without props', function () {
    expect(wrapNoProps.contains(<div className='cont disable'></div>)).to.equal(true);
    expect(wrapNoProps.contains(<div className='cont enable'></div>)).to.equal(true);
  });
});

describe('Test: Component GameControl', function () {
  const wrapper = shallow(<GameControl stateGameText={'Старт'} setStateGame={function setStateGame() {}} createField={function createField() {}} changeStructureField={function changeStructureField() {}} />);

  it('Should render as a <div>', function () {
    expect(wrapper.is('div')).to.equal(true);
  });

  const wrapNoProps = shallow(<GameControl />);

  it('Should render as buttons without props', function () {
    expect(wrapNoProps.find('button').filterWhere(a => a.hasClass('button button1')).text() === 'Новая игра').to.equal(true);
    expect(wrapNoProps.find('button').filterWhere(a => a.hasClass('button button2')).text() === '').to.equal(true);
  });
});

describe('Test: Component GameField', function () {
  function createMatrix(rows = 33, columns = 37) {
    let data = [];

    for (let row = 0; row < rows; row++) {
      data[row] = [];
      for (let column = 0; column < columns; column++) {
        data[row][column] = 0;
      }
    }

    return data;
  }

  let data = createMatrix();

  data[0][0] = 1;
  data[0][1] = 1;
  data[0][2] = 1;
  data[0][3] = 1;
  data[0][4] = 1;

  const enableCell = sinon.spy();

  const wrapper = shallow(<GameField field={data} enableCell={enableCell} />);
  it('Should render as a <div>', function () {
    expect(wrapper.is('div')).to.equal(true);
  });


  it('Should click to cell is activate', function () {
    wrapper.find('.cells').at(10).simulate('click');
    expect(enableCell).to.have.property('callCount', 1);
  });

  it('Should render as cells', function () {
    expect(wrapper.find('div').filterWhere(a => a.hasClass('cells disable'))).to.have.length(1216);
    expect(wrapper.find('div').filterWhere(a => a.hasClass('cells enable'))).to.have.length(5);
  });

  const wrapNoProps = shallow(<GameField />);

  it('Should render as cells without props', function () {
    expect(wrapNoProps.find('div').filterWhere(a => a.hasClass('cells'))).to.have.length(0);
  });
});

describe('Test: Component GameControl functions', function () {
  it('should call the calledOnce StateGame', function () {
    const setStateGame = sinon.spy();
    const wrapper = shallow(<GameControl text={'Старт'} setStateGame={setStateGame} createField={function createField() {}} changeStructureField={function changeStructureField() {}} />);

    wrapper.find('button').filterWhere(a => a.hasClass('button button2')).simulate('click');
    expect(setStateGame).to.have.property('callCount', 1);
  });

  it('should call the calledOnce createNewGame', function () {
    const createField = sinon.spy();
    const setStateGame = sinon.spy();
    const wrapper = shallow(<GameControl stateGameText={'Старт'} setStateGame={setStateGame} createField={createField} changeStructureField={function changeStructureField() {}} />);

    wrapper.find('button').filterWhere(a => a.hasClass('button button1')).simulate('click');
    expect(createField).to.have.property('callCount', 2);
    expect(setStateGame).to.have.property('callCount', 0);
    expect(wrapper.find('button').filterWhere(a => a.hasClass('button button2')).text() === 'Старт').to.equal(true);
    expect(wrapper.find('div').filterWhere(a => a.hasClass('cells enable'))).to.have.length(0);
  });
});
