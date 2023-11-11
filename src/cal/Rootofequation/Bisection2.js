import React, { Component } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
import { evaluate } from 'mathjs';
import Plot from "react-plotly.js";

class Sample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      valueIter: [],
      valueXl: [],
      valueXm: [],
      valueXr: [],
      graphx: [],
      html: null,
      Equation: '(x^4)-13',
      X: 0,
      XL: 0,
      XR: 0,
    };
  }

  error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

  Calbisection = (xl, xr) => {
    const { Equation, data, setX, graphx } = this.state;
    let xm, fXm, fXr, ea, scope, xold = 0;
    let iter = 0;
    const MAX = 50;
    const e = 0.00001;
    let obj = {};

    do {
      xm = (xl + xr) / 2.0;

      scope = {
        x: xr,
      };
      fXr = evaluate(Equation, scope);

      scope = {
        x: xm,
      };
      fXm = evaluate(Equation, scope);

      iter++;

      if (fXm * fXr > 0) {
        ea = this.error(xr, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          Xold: xold,
        };
        data.push(obj);
        xr = xm;
      } else if (fXm * fXr < 0) {
        ea = this.error(xl, xm);
        obj = {
          iteration: iter,
          Xl: xl,
          Xm: xm,
          Xr: xr,
          Xold: xold,
        };
        data.push(obj);
        xl = xm;
      }
      graphx.push({ xm: xm, xold: xold });
      xold = xm;
    } while (ea > e && iter < MAX);

    this.setState({ X: xm });
  };

  inputEquation = (event) => {
    this.setState({ Equation: event.target.value });
  };

  inputXL = (event) => {
    this.setState({ XL: event.target.value });
  };

  inputXR = (event) => {
    this.setState({ XR: event.target.value });
  };

  calculateRoot = () => {
    const { XL, XR } = this.state;
    const xlnum = parseFloat(XL);
    const xrnum = parseFloat(XR);
    this.Calbisection(xlnum, xrnum);
    this.setState({ html: this.print() });
  };

  print = () => {
    const { data } = this.state;
    return (
      <Container>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th width="10%">Iteration</th>
              <th width="30%">XL</th>
              <th width="30%">XM</th>
              <th width="30%">XR</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.iteration}</td>
                  <td>{element.Xl}</td>
                  <td>{element.Xm}</td>
                  <td>{element.Xr}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    );
  };

  render() {
    const { Equation, XL, XR, X, html, graphx } = this.state;

    return (
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Input f(x)</Form.Label>
            <input
              type="text"
              id="equation"
              value={Equation}
              onChange={this.inputEquation}
              style={{ width: '20%', margin: '0 auto' }}
              className="form-control"
            />
            <Form.Label>Input XL</Form.Label>
            <input
              type="number"
              id="XL"
              onChange={this.inputXL}
              style={{ width: '20%', margin: '0 auto' }}
              className="form-control"
            />
            <Form.Label>Input XR</Form.Label>
            <input
              type="number"
              id="XR"
              onChange={this.inputXR}
              style={{ width: '20%', margin: '0 auto' }}
              className="form-control"
            />
          </Form.Group>
          <Button variant="dark" onClick={this.calculateRoot}>
            Calculate
          </Button>
        </Form>
        <br />
        <h5>Answer = {X.toPrecision(7)}</h5>
        {html}
        <Plot
          data={[
            {
              x: graphx.map((row) => row.xm),
              y: graphx.map((row) => row.xold),
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{ width: 1000, height: 800, title: 'Bisection Plot' }}
        />
      </Container>
    );
  }
}

export default Sample;
