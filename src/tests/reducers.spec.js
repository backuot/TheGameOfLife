import {
  initialField,
  getStatusField,
  enableCell,
  scoreNeighborsCell,
  changeStructureField
} from '../reducers/gameFieldState';
import { setStateText } from '../reducers/gameControlState';

describe('Test: Reducer gameFieldState', function () {
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

  it('initialField size matrix 5x5', function () {
    let copy = initialField(5,5);
    expect(copy.length).to.eql(5);
    expect(copy[0].length).to.eql(5);
  });

  it('initialField matrix one agument', function () {
    let copy = initialField(5);
    expect(copy.length).to.eql(5);
    expect(copy[1].length).to.eql(37);
  });

  it('initialField returns matrix ', function () {
    expect(initialField()).to.eql(createMatrix());
  });

  it('initialField size is larger than allowed  ', function () {
    expect(initialField(50,50)).to.eql(createMatrix());
  });

  it('initialField a one-dimensional array of banned', function () {
    expect(initialField(12,0)).to.eql(createMatrix(12,37));
    expect(initialField(0,6)).to.eql(createMatrix(33,6));
  });

  it('enableCell activate cell', function () {
    this.data = createMatrix();
    this.data[0][0] = 1;
    expect(enableCell(createMatrix(), 0, 0)).to.eql(this.data);
  });

  it('enableCell activate cell arguments no index', function () {
    this.data = createMatrix();
    expect(enableCell(this.data)).to.eql(0);
  });

  it('enableCell activate cell arguments no data', function () {
    this.data = createMatrix();
    expect(enableCell(undefined,0,0)).to.eql(0);
  });

  it('enableCell activate cell arguments empty', function () {
    this.data = createMatrix();
    expect(enableCell()).to.eql(0);
  });

  it('getStatusField information ', function () {
    this.data = createMatrix();
    this.data[0][0] = 1;
    expect(getStatusField(this.data)).to.eql({ enable: 1, disable: 1220 });
  });

  it('getStatusField information arguments empty', function () {
    expect(getStatusField()).to.eql({ enable: 0, disable: 0 });
  });

  it('scoreNeighborsCell count neighbors ', function () {
    this.data = createMatrix();
    this.data[0][1] = 1;
    this.data[1][0] = 1;
    this.data[1][1] = 1;
    expect(scoreNeighborsCell(this.data, 0, 0)).to.eql(3);
  });

  it('scoreNeighborsCell count neighbors arguments no index', function () {
    this.data = createMatrix();
    expect(scoreNeighborsCell(this.data)).to.eql(0);
  });

  it('scoreNeighborsCell count neighbors arguments no data', function () {
    this.data = createMatrix();
    expect(scoreNeighborsCell(undefined,0,0)).to.eql(0);
  });

  it('scoreNeighborsCell count neighbors arguments empty', function () {
    this.data = createMatrix();
    expect(scoreNeighborsCell()).to.eql(0);
  });

  it('changeStructureField edit field', function () {
    this.data = createMatrix();

    this.data[0][1] = 1;
    this.data[1][0] = 1;
    this.data[1][1] = 1;

    this.copy = createMatrix();

    this.copy[0][0] = 1;
    this.copy[0][1] = 1;
    this.copy[1][0] = 1;
    this.copy[1][1] = 1;

    expect(changeStructureField(this.data)).to.eql(this.copy);
  });

  it('changeStructureField edited no arguments', function () {
    expect(changeStructureField()).to.eql(0);
  });
});

describe('Test: Reducer gameControl', function () {
  it('setState changed state', function () {
    expect(setStateText(1)).to.eql('Пауза');
  });
});
