import React, { useState, useEffect } from "react";
import shuffle from "shuffle-array";
import { MDBContainer } from "mdbreact";

import ContentItem from '../ContentItem/ContentItem'
import bingoList from './BingoList'
import "./styles.css";
import { start } from "./Confetti";

function Confetti() {
  useEffect(() => {
    start();
  });
  return <canvas id="canvas" />;
}

const data: { [key: string]: string | number; } = shuffle(bingoList).reduce(
  (data, value, index) => ({ ...data, [index]: value }),
  {}
);

interface IState {
  checked: {[key: string]:number|string},
  won?: Boolean
}

function StartingPageContent() {
  const [state, setState] = useState<IState>({ checked: {} });
  const isWon = (checked: any) => {
    const range = [0, 1, 2, 3, 4];
    return (
      undefined !==
      range.find((row) =>
        range.every((column) => checked[row * 5 + column])
      ) ||
      undefined !==
      range.find((column) =>
        range.every((row) => checked[row * 5 + column])
      ) ||
      range.every((index) => checked[index * 5 + index]) ||
      range.every((index) => checked[index * 5 + 4 - index])
    );
  };
  const toggle = (id: any) =>
    setState((state: IState) => {
     
      const checked = { ...state.checked, [id]: !state.checked[id] };
      const won = isWon(checked);
      return {
        ...state,
        checked,
        won
      };
    });

  return (
    <MDBContainer>
      <h1>Bingo</h1>
      <div className="wrapper">
        {Object.keys(data).map((id) => {

          return (<ContentItem
            key={id}
            id={id}
            isSet={!!state.checked[id]}
            onToggle={() => toggle(id)}
          >
            {data[id]}
          </ContentItem>)
        }
        )}
      </div>
      {state.won ? <Confetti /> : null}
    </MDBContainer>
  );
}

export default StartingPageContent; 