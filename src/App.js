import Map from "./components/Map";
import Header from "./common/Header";
import Wrapper from "./components/Wrapper";

import "./App.css";

function App() {

  return (
    <div className="App">
      <Header />
      <Wrapper>
        <Map />
      </Wrapper>
    </div>
  );
}

export default App;
