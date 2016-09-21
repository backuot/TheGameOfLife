import { initialData,
        statusData,
        enableCell,
        scoreNeighbors,
        process,
} from '../reducers/Within';
import { setState } from '../reducers/Outside';

describe('Test: Reducer Within', function () {
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

  it('initialData returns matrix ', function () {
    expect(initialData()).to.eql(createMatrix());
  });

  it('enableCell activate cell', function () {
    this.data = createMatrix();
    this.data[0][0] = 1;
    expect(enableCell(createMatrix(), 0, 0)).to.eql(this.data);
  });

  it('statusData information ', function () {
    this.data = createMatrix();
    this.data[0][0] = 1;
    expect(statusData(this.data)).to.eql({ enable: 1, disable: 1220 });
  });

  it('scoreNeighbors count neighbors ', function () {
    this.data = createMatrix();
    this.data[0][1] = 1;
    this.data[1][0] = 1;
    this.data[1][1] = 1;
    expect(scoreNeighbors(this.data, 0, 0)).to.eql(3);
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
});

describe('Test: Reducer Outside', function () {
  it('setState changed state', function () {
    expect(setState(1)).to.eql('Пауза');
  });
});
