import React, { useState } from 'react';
import './Keyboard.css';
import { FaDeleteLeft } from "react-icons/fa6";

interface KeyProps {
  keyvalue: string;
  onClick: (key: string) => void;
}

const Key: React.FC<KeyProps> = ({ keyvalue, onClick }) => {
  const handleClick = () => {
    onClick(keyvalue);
  };

  const renderContent = () => {
    if (keyvalue.includes('_')) {
      return keyvalue.split('_').map((part, index) => <span key={index}>{part}</span>);
    } else if (keyvalue.includes('.')) {
      return keyvalue.split('.').map((part, index) => <span key={index}>{part}</span>);
    } else if (keyvalue === '<FaDeleteLeft />') {
      return <FaDeleteLeft />;
    } else {
      return <span>{keyvalue}</span>;
    }
  };

  return (
    <div className="key" onClick={handleClick}>
      {renderContent()}
    </div>
  );
};


export default function Keyboard() {
  const [inputText, setInputText] = useState('');
  const [isCaps, setIsCaps] = useState(false);
  const [isShift, setIsShift] = useState(false);

  const handleKeyClick = (key: string) => {
    switch (key) {
      case 'Enter':
        handleEnterKey();
        break;
      case 'Ctrl':
      case 'Alt':
      case '<':
      case '>':
        break;
      case ' ':
        handleSpaceKey();
        break;
      case 'Caps Lock':
        handleCapsLock();
        break;
      case '<FaDeleteLeft />':
        handleDeleteKey();
        break;
      case 'Shift':
        handleShiftKey();
        break;
      case 'Tab':
        handleTabKey();
        break;
      default:
        handleRegularKey(key);
    }
  };

  const handleSpaceKey = () => {
    setInputText(inputText + '\u00A0');
  };

  const handleEnterKey = () => {
    setInputText(inputText + '\n');
  };

  const handleCapsLock = () => {
    setIsCaps(!isCaps);
    updateKeyLabels();
  };

  const handleTabKey = () => {
    setInputText(inputText + '    ');
  };

  const handleDeleteKey = () => {
    if (inputText.length > 0) {
      setInputText(inputText.slice(0, -1));
    }
  };

  const handleShiftKey = () => {
    setIsShift(!isShift);
    updateKeyLabels();
  };

  const handleRegularKey = (key: string) => {
    const keys = key.split(/[._]/);
    let newContent: string;
    if (keys.length > 1) {
      if (isShift) {
        newContent = keys.length === 3 && keys[0] === '>' ? inputText + '>' : inputText + keys[0];
      } else {
        newContent = keys.length === 3 && keys[0] === '>' ? inputText + '.' : inputText + keys[1];
      }
    } else {
      const character = (isShift === isCaps) ? key.toLowerCase() : key.toUpperCase();
      newContent = inputText + character;
    }
    setInputText(newContent);
  };

  const updateKeyLabels = () => {
    const keys = document.querySelectorAll('.key');
    keys.forEach((key) => {
      const firstSpanElement = key.querySelector('span:first-child');
      if (firstSpanElement) {
        const keyText = firstSpanElement.innerText.toLowerCase();
        const shouldUpper = (isShift === isCaps);
        if (
          !['shift', 'alt', 'ctrl', 'enter', 'caps lock', 'tab'].includes(keyText)
        ) {
          firstSpanElement.innerText = shouldUpper ? keyText.toUpperCase() : keyText.toLowerCase();
        }
        if (keyText === 'caps lock') {
          key.style.backgroundColor = isCaps ? 'blue' : '#445760';
        }
        if (keyText === 'shift') {
          key.style.backgroundColor = isShift ? 'blue' : '#445760';
        }
      }
    });
  };



  const keyRows = [
    ['~.`', '!.1', '@.2', '#.3', '$.4', '%.5', '^.6', '&.7', '*.8', '(.9', ').0', '_.-', '+.=', '<FaDeleteLeft />'],
    ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{_[', '}_]', '|_\\'],
    ['Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':;', '\'', 'Enter'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<_,', '>_.', '?_/', 'Shift'],
    ['Ctrl', 'Alt', ' ', 'Ctrl', 'Alt', '<', '>'],
  ];

  return (
    <div className="keyboard">
      <div className="textcontainer">
        <pre>{inputText}</pre>
      </div>
      <div className="keyboardcontainer">
        <div className="container">
          {keyRows.map((row, rowIndex) => (
            <div className="row" key={rowIndex}>
              {row.map((keyvalue) => (
                <Key key={keyvalue} keyvalue={keyvalue} onClick={handleKeyClick} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}