import { model } from '../reducers/Within'

describe('src.tests.init.spec.js', function() {
    var mas [
        [1,1],
        [1,0],
        [0,0],
        [2,2],
        [2,1],
        [2,0],
        [1,0],
        [1,2],
        [0,2],
    ];
    for(var i=0; i < mas.length; i++){
        model.editModel(mas[0],mas[1]);    
    }
    
  it('Return number', function() {
    expect(model.scoreNeighbors(1,1)).to.be.an(8);
  });
});