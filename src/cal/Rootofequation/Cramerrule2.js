import React, { Component } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import './Matrix.css';

class CramerRule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      n: 0,
      matrix: [],
      X: [],
      B: [],
      html: null,
      data: [],
    };
  }

  inputN = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      const n = value > 10 ? 10 : value;
      const emptyMatrix = Array.from({ length: n }, () => Array(n).fill(''));
      const emptyX = Array(n).fill(0);
      const emptyB = Array(n).fill(0);

      this.setState({
        n,
        matrix: emptyMatrix,
        X: emptyX,
        B: emptyB,
        html: null,
      });
    } else {
      this.setState({ n: 0 });
    }
  };

  inputMatrixValue = (row, col, e) => {
    const updatedMatrix = [...this.state.matrix];
    updatedMatrix[row][col] = e.target.value;
    this.setState({ matrix: updatedMatrix });
  };

  inputBValue = (col, e) => {
    const updatedB = [...this.state.B];
    updatedB[col] = e.target.value;
    this.setState({ B: updatedB });
  };

  print = () => {
    return (
      <Container>
        <h3>Det</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            {this.state.data.length > 0 && (
              <tr>
                <th width="20%">Deta :</th>
                <th>{this.state.data[0].detA}</th>
              </tr>
            )}
          </thead>
          <tbody>
            {this.state.data.map((element, index) => {
              if (index > 0) {
                return (
                  <tr key={index}>
                    <td>{`detx${element.count} `}</td>
                    <td>{element.detA}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </Container>
    );
  };

  calculateRoot = () => {
    const a = [...this.state.matrix.map((row) => [...row])];
    const b = [...this.state.B];
    const n = a.length;
    const x = new Array(n);
    const obj = [];
    const detA = this.determinant(a);
    obj.push({ detA: detA, count: 0 });

    for (let i = 0; i < n; i++) {
      const subMatrix = a.map((row, rowIndex) =>
        row.map((col, colIndex) => (colIndex === i ? b[rowIndex] : col))
      );

      const subDet = this.determinant(subMatrix);
      obj.push({ detA: subDet, count: i + 1 });

      x[i] = subDet / detA;
    }

    this.setState({ X: x, html: this.print(), data: obj });
  };

  determinant = (matrix) => {
    const n = matrix.length;
    if (n === 1) {
      return matrix[0][0];
    }
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    let det = 0;
    for (let j = 0; j < n; j++) {
      const subMatrix = [];
      for (let i = 1; i < n; i++) {
        subMatrix.push(matrix[i].slice(0, j).concat(matrix[i].slice(j + 1));
      }
      det += matrix[0][j] * this.determinant(subMatrix) * (j % 2 === 0 ? 1 : -1);
    }
    return det;
  };

  render() {
    const { n, matrix, X, html } = this.state;

    return (
      <div>
        <Container>
          <h3>CramerRule</h3>
          <Form.Group className="mb-3">
            <Form.Label>Input N</Form.Label>
            <input
              type="number"
              id="n"
              value={n}
              onChange={this.inputN}
              className="form-control"
            ></input>
          </Form.Group>

          {n > 0 && (
            <Table bordered striped>
              <thead>
                <tr>
                  {Array.from({ length: n }, (_, index) => (
                    <th>Column {index + 1}</th>
                  )}
                  <th>Matrix B</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((col, colIndex) => (
                      <td key={colIndex}>
                        <input
                          type="number"
                          value={matrix[rowIndex][colIndex]}
                          onChange={(e) =>
                            this.inputMatrixValue(rowIndex, colIndex, e)
                          }
                          className="form-control"
                          step="any"
                        ></input>
                      </td>
                    ))}
                    <td>
                      <input
                        type="number"
                        value={this.state.B[rowIndex]}
                        onChange={(e) => this.inputBValue(row, e)}
                        className="form-control"
                        step="any"
                      ></input>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}

          <Button variant="dark" onClick={this.calculateRoot}>
            Calculate
          </Button>

          {n > 0 && (
            <div>
              <h3>Matrix X</h3>
              <Table bordered striped className="custom-table">
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {X.map((value, index) => (
                    <tr key={index}>
                      <td>{`X${index + 1}`}</td>
                      <td>{value}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
              {html}
            </div>
          )}
        </Container>
      </div>
    );
  }
}

export default CramerRule;
