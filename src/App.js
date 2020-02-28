import React from "react";
import "./styles.css";
const randomcolor = require("randomcolor");

const MasonryLayout = props => {
  console.log({ props });
  const columnWrapper = {};
  const result = [];

  const columnsCalculated = React.useMemo(() => {
    const calculate = columns => {
      const totalGaps = props.gap * (columns - 1);
      const calculatedWidth = (props.itemsWidth + totalGaps) * columns;

      console.log({ calculatedWidth });
      if (calculatedWidth >= props.maxWidth) return calculate(columns - 1);
      else {
        console.log({ columns });
        return columns;
      }
    };

    return calculate(props.columns);
  }, [props.columns, props.itemsWidth, props.maxWidth, props.gap]);

  console.log(columnsCalculated);

  // create columns
  for (let i = 0; i < columnsCalculated; i++) {
    columnWrapper[`column${i}`] = [];
  }

  // divide children into columns
  for (let i = 0; i < props.children.length; i++) {
    const columnIndex = i % columnsCalculated;
    columnWrapper[`column${columnIndex}`].push(
      <div
        key={i}
        style={{
          marginBottom: `${props.gap}px`,
          backgroundColor: `${randomcolor()}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {props.children[i]}
      </div>
    );
  }

  // wrap children in each column with a div
  for (let i = 0; i < columnsCalculated; i++) {
    result.push(
      <div
        key={i}
        style={{
          marginLeft: `${i > 0 ? props.gap : 0}px`,
          maxWidth: `${props.itemsWidth}px`
        }}
      >
        {columnWrapper[`column${i}`]}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", maxWidth: `${props.maxWidth}px` }}>
      {result}
    </div>
  );
};

MasonryLayout.defaultProps = {
  columns: 2,
  gap: 10
};

export default function App() {
  // useEffect(()=> {
  //   return
  // });

  const itemsWidth = 300;

  return (
    <div className="App">
      <MasonryLayout
        columns={4}
        gap={10}
        maxWidth={1400}
        itemsWidth={itemsWidth}
      >
        {[...Array(8).keys()].map(key => {
          const height = 200 + Math.ceil(Math.random() * 300);

          return (
            <div
              key={key}
              style={{ height: `${height}px`, width: `${itemsWidth}px` }}
            />
          );
        })}
      </MasonryLayout>
    </div>
  );
}
