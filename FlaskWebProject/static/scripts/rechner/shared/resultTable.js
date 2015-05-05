define(function () {

  function buildResultTable(numRows, numCols, cellFunc, rowHeadingFunc, colHeadingFunc) {
    var table,
      row,
      rowHeadings,
      colHeadings,
      rowIndex,
      colIndex,
      rowHeading,
      colHeading;

    table = [];
    rowHeadings = [];
    colHeadings = [];

    for (rowIndex = 0; rowIndex < numRows; rowIndex += 1) {
      row = [];
      table.push(row);

      rowHeading = rowHeadingFunc(rowIndex);
      rowHeadings.push(rowHeading);
      for (colIndex = 0; colIndex < numCols; colIndex += 1) {
        if (rowIndex === 0) {
          colHeading = colHeadingFunc(colIndex);
          colHeadings.push(colHeading);
        }
        else {
          colHeading = colHeadings[colIndex];
        }
        row.push(cellFunc(rowIndex, colIndex, rowHeading, colHeading));
      }
    }

    return combineTable(table, rowHeadings, colHeadings);
  }

  function combineTable(_table, _rowHeadings, _colHeadings) {
    var table = _table.slice(),
      rowHeadings = _rowHeadings.slice(),
      colHeadings = _colHeadings.slice(),
      rowIndex;

    for (rowIndex = 0; rowIndex < table.length; rowIndex += 1) {
      table[rowIndex].unshift(rowHeadings.shift());
    }
    colHeadings.unshift('');
    table.unshift(colHeadings);

    return table;
  }

  function makeSequencerFunc(start, step) {
    step = step || 1;
    return function (index) {
      return start + index * step;
    };
  }

  return {
    build: buildResultTable,
    makeSequencerFunc: makeSequencerFunc
  };

});
