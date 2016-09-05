import React from 'react'
import { shallow } from 'enzyme'
import Conclusions from '../components/Conclusions'
import Outside from '../components/Outside'
import Within from '../components/Within'

describe('Test: Component Conclusions', function() {
    const wrapper = shallow(<Conclusions disable={'0'} enable={'1'} />);
    
    it('Should render as a <div>', function() {
        expect(wrapper.is('div')).to.equal(true)
    });
    
    it('Should render as elements', function() {
        expect(wrapper.contains(<div className="cont disable">0</div>)).to.equal(true)
        expect(wrapper.contains(<div className="cont enable">1</div>)).to.equal(true)
    });
});

describe('Test: Component Outside', function() {
    const wrapper = shallow(<Outside text={'Старт'} stateGame={function stateGame(){}} addField={function addField(){}} gameProcess={function gameProcess(){}} />);
    let button, button1
    
    it('Should render as a <div>', function() {
        expect(wrapper.is('div')).to.equal(true)
    });
    
    beforeEach(() => {
      button = wrapper.find('button').filterWhere(a => a.text() === 'Новая игра')
      button1 = wrapper.find('button').filterWhere(a => a.text() === 'Старт')
    })
    
    it('Should render as buttons', function() {
        expect(button.hasClass('button button1')).to.be.true
        expect(button1.hasClass('button button2')).to.be.true
    });
});

describe('Test: Component Within', function() {
    function createMatrix(n = 33, m = 37) {
        var data = [];

        for (var i = 0; i < n; i++){
            data[i] = [];
            for (var j = 0; j < m; j++){
                data[i][j] = 0;
            }
        }   

        return data
    }
    var data = createMatrix();
    
    const wrapper = shallow(<Within field={data} enableCell={function enableCell(){}} />);
     
    it('Should render as a <div>', function() {
        expect(wrapper.is('div')).to.equal(true)
    });
    
    it('Should render as cells', function() {
        expect(wrapper.find('div').filterWhere(a => a.hasClass('cells'))).to.have.length(1221)
    });
});