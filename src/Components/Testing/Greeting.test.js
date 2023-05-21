import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test(`render Greeting testing as a text`, () => {
  //arrange
  render(<Greeting />);
  //act
  //....nothing
  //Assert
  const gteetingText = screen.getByText("Greeting", { exact: false });
  expect(gteetingText).toBeInTheDocument();
});

//comment the app.test.js
//create the gteeting.js and greeting.test.ja
//this geerting.js component import in app.js
//this greeting.test.js testing the greeting.js component
//now you can get the error so delete the applyMiddleware.test.js

//3 files needed- greeting.js, hgreeting.test.js, app.js
//and remove app.test.js
