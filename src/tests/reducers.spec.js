import {
  initialData,
  statusData,
  enableCell,
  scoreNeighbors,
  process,
} from '../reducers/within';
import { setState } from '../reducers/outside';

describe('Test: Reducer within', function () {
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

  it('initialData size matrix 5x5', function () {
    var copy = initialData(5,5);
    expect(copy.length).to.eql(5);
    expect(copy[0].length).to.eql(5);
  });

  it('initialData matrix one agument', function () {
    var copy = initialData(5);
    expect(copy.length).to.eql(5);
    expect(copy[1].length).to.eql(37);
  });

  it('initialData returns matrix ', function () {
    expect(initialData()).to.eql(createMatrix());
  });

  it('initialData size is larger than allowed  ', function () {
    expect(initialData(50,50)).to.eql(createMatrix());
  });

  it('initialData a one-dimensional array of banned', function () {
    expect(initialData(12,0)).to.eql(createMatrix(12,37));
    expect(initialData(0,6)).to.eql(createMatrix(33,6));
  });

  it('enableCell activate cell', function () {
    this.data = createMatrix();
    this.data[0][0] = 1;
    expect(enableCell(createMatrix(), 0, 0)).to.eql(this.data);
  });

  it('enableCell activate cell arguments no index', function () {
    this.data = createMatrix();
    expect(enableCell(this.data)).to.eql(this.data);
  });

  it('enableCell activate cell arguments no data', function () {
    this.data = createMatrix();
    expect(enableCell(undefined,0,0)).to.eql(0);
  });

  it('enableCell activate cell arguments empty', function () {
    this.data = createMatrix();
    expect(enableCell()).to.eql(0);
  });

  it('statusData information ', function () {
    this.data = createMatrix();
    this.data[0][0] = 1;
    expect(statusData(this.data)).to.eql({ enable: 1, disable: 1220 });
  });

  it('statusData information arguments empty', function () {
    expect(statusData()).to.eql({ enable: 0, disable: 0 });
  });

  it('scoreNeighbors count neighbors ', function () {
    this.data = createMatrix();
    this.data[0][1] = 1;
    this.data[1][0] = 1;
    this.data[1][1] = 1;
    expect(scoreNeighbors(this.data, 0, 0)).to.eql(3);
  });

  it('scoreNeighbors count neighbors arguments no index', function () {
    this.data = createMatrix();
    expect(scoreNeighbors(this.data)).to.eql(0);
  });

  it('scoreNeighbors count neighbors arguments no data', function () {
    this.data = createMatrix();
    expect(scoreNeighbors(undefined,0,0)).to.eql(0);
  });

  it('scoreNeighbors count neighbors arguments empty', function () {
    this.data = createMatrix();
    expect(scoreNeighbors()).to.eql(0);
  });

  it('process edit field', function () {
    this.data = createMatrix();

    this.data[0][1] = 1;
    this.data[1][0] = 1;
    this.data[1][1] = 1;

    this.copy = createMatrix();

    this.copy[0][0] = 1;
    this.copy[0][1] = 1;
    this.copy[1][0] = 1;
    this.copy[1][1] = 1;

    expect(process(this.data)).to.eql(this.copy);
  });

  it('process edited no arguments', function () {
    expect(process()).to.eql(0);
  });
});

describe('Test: Reducer outside', function () {
  it('setState changed state', function () {
    expect(setState(1)).to.eql('Пауза');
  });
});
