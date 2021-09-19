import './App.css';

import { useState } from "react";

function App() {
  const [checkboxData, setcheckboxData] = useState([
    {
      id: 1,
      value: false,
      textToDisplay: "Select all"
    },
    {
      id: 2,
      value: false,
      textToDisplay: "item 1"
    },
    {
      id: 3,
      value: false,
      textToDisplay: "item 2"
    },
    {
      id: 4,
      value: false,
      textToDisplay: "item 3"
    },
    {
      id: 5,
      value: false,
      textToDisplay: "item 4"
    }
  ]);

  /**
   * FUnction used to handle the press in check box
   * @param {interger} key
   * @param {boolean} nextValue
   */
  const handlePressCheckBox = (key, nextValue) => {
    // check if values sended are valid
    if (!key || nextValue === undefined || nextValue === null) {
      return null;
    }
    // save copie of actual data in state
    const prevData = checkboxData;
    // array that will contain result of the traitement
    const result = [];
    // case user has selected check box with id 1
    if (key === 1) {
      const nextResult = prevData.map((element) => {
        // update all elements values depending to to the next value( if user request to select all or unselelct all)
        if (nextValue === true) {
          return { ...element, value: true };
        }
        return { ...element, value: false };
      });
      // save data in result array
      result.push(...nextResult);
      // case  user has beafore select box "select all" and user select check box with id !== 1
    } else if (prevData[0].value === true && key !== 1) {
      const nextResult = prevData.map((element) => {
        // update only element selected value to true
        // other, elements value are sended to false
        if (element.id === key) {
          return { ...element, value: true };
        }
        return { ...element, value: false };
      });
      // save data in  result array
      result.push(...nextResult);
    } else {
      // case user has not selected box with id = 1
      // and select check the same or other check box thant beafore

      // modify value of the check box in question
      prevData[key - 1].value = nextValue;
      // save new structure of data contain in array "prevData" in contante called "next"
      const next = prevData;
      // check if all elements has been checked ( there is not check box that contain his value to true)
      const checkIfAllElementHasNotBeenSelected = next.some(
        (element) => element.id !== 1 && element.value === false
      );

      if (checkIfAllElementHasNotBeenSelected === false) {
        // if all elements has been check, we will update all elements value to true
        const nextResult = prevData.map((element) => {
          return { ...element, value: true };
        });
        // save all modifications in  result array
        result.push(...nextResult);
      } else {
        // if all elements has not been check, we will save all modifications in result array
        result.push(...next);
      }
    }
    // update check box data contain in state with array result data
    setcheckboxData(result);
  };

  /**
   * Cunstom check box
   * @param {string} label
   * @param {boolean} value
   * @param {function} onChange
   * @param {interger} id
   */
  const Checkbox = ({ label, value, onChange, id }) => {
    return (
      <label key={id}>
        <input
          type="checkbox"
          checked={value}
          onChange={() => onChange(id, !value)}
        />
        {label}
      </label>
    );
  };

  /**
   * Private children
   */
  const RenderList = () => {
    return (
      <div>
        <ul className="containerChildrenCheckBox">
          {checkboxData.map((box) => {
            return (
              <li key={box.id}>
                {" "}
                <Checkbox
                  label={box.textToDisplay}
                  value={box.value}
                  onChange={(key, nextValue) =>
                    handlePressCheckBox(key, nextValue)
                  }
                  id={box.id}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
  return (
    <div className="App">
      <h1>Inextenso digital</h1>
      <h2>Front-end exercise 1</h2>
      <RenderList />
    </div>
  );
}

export default App;
