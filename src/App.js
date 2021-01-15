import './App.css';
import PeopleTable from './containers/PeopleTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <PeopleTable />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
