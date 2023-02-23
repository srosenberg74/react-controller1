import React, { useState, useRef, useEffect } from "react";
import "../App.css";

function Ball() {
  const [controllerClass, setControllerClass] = useState("down");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const ballRef = useRef();
  let commands = [];
  const movementSpeed = 30;
  const jumpDistance = 180;

  const handleKeyDown = (event) => {
    const interval = setInterval(() => {
      commands = [];
    }, 200);
    commands.push(event.code);
    const checkForValue = (value1, value2 = null) => {
      if (value2) {
        if (
          commands.find((input) => input === value1) &&
          commands.find((input) => input === value2)
        ) {
          return true;
        }
      } else {
        if (commands.find((input) => input === value1)) {
          return true;
        }
      }
    };
    console.log("key pressed was: ", commands);
    if (commands.length > 1) {
      if (checkForValue("ArrowRight", "ArrowUp")) {
        setControllerClass("right");
        ballRef.current.style.transform = `translateX(${
          position.x + movementSpeed
        }px) translateY(${position.y - movementSpeed}px)`;
        setPosition({
          x: position.x + movementSpeed,
          y: position.y - movementSpeed,
        });
      }
      if (checkForValue("ArrowRight", "ArrowDown")) {
        setControllerClass("right");
        ballRef.current.style.transform = `translateX(${
          position.x + movementSpeed
        }px) translateY(${position.y + movementSpeed}px)`;
        setPosition({
          x: position.x + movementSpeed,
          y: position.y + movementSpeed,
        });
      }
      if (checkForValue("ArrowLeft", "ArrowUp")) {
        setControllerClass("left");
        ballRef.current.style.transform = `translateX(${
          position.x - movementSpeed
        }px) translateY(${position.y - movementSpeed}px)`;
        setPosition({
          x: position.x - movementSpeed,
          y: position.y - movementSpeed,
        });
      }
      if (checkForValue("ArrowLeft", "ArrowDown")) {
        setControllerClass("left");
        ballRef.current.style.transform = `translateX(${
          position.x - movementSpeed
        }px) translateY(${position.y + movementSpeed}px)`;
        setPosition({
          x: position.x - movementSpeed,
          y: position.y + movementSpeed,
        });
      }
      if (checkForValue("ArrowRight", "Space")) {
        setControllerClass("jump-right right");
        ballRef.current.style.transform = `translateX(${
          position.x + jumpDistance
        }px) translateY(${position.y}px)`;
        setTimeout(() => {
          setPosition({
            x: position.x + jumpDistance,
            y: position.y,
          });
        }, 800);
      }
    } else {
      if (checkForValue("ArrowRight")) {
        setControllerClass("right");
        ballRef.current.style.transform = `translateX(${
          position.x + movementSpeed
        }px) translateY(${position.y}px)`;
        setPosition({ ...position, x: position.x + movementSpeed });
      }
      if (checkForValue("ArrowLeft")) {
        setControllerClass("left");
        ballRef.current.style.transform = `translateX(${
          position.x - movementSpeed
        }px) translateY(${position.y}px)`;
        setPosition({ ...position, x: position.x - movementSpeed });
      }
      if (checkForValue("ArrowUp")) {
        setControllerClass("up");
        ballRef.current.style.transform = `translateY(${
          position.y - movementSpeed
        }px) translateX(${position.x}px)`;
        setPosition({ ...position, y: position.y - movementSpeed });
      }
      if (checkForValue("ArrowDown")) {
        setControllerClass("down");
        ballRef.current.style.transform = `translateY(${
          position.y + movementSpeed
        }px) translateX(${position.x}px)`;
        setPosition({ ...position, y: position.y + movementSpeed });
      }
    }
  };

  useEffect(() => {
    const myInterval = setInterval(() => {
      window.addEventListener("keydown", handleKeyDown);
    }, 50);

    return () => clearInterval(myInterval);
  }, [position]);

  return <div ref={ballRef} className={`ball ${controllerClass}`}></div>;
}

export default Ball;
