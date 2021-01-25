import './App.css';
import PeopleTable from './containers/PeopleTable';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <div>
          <h1>Header</h1>
        </div>
        <div>
          <PeopleTable />
        </div>
        <div>
          <h1>Footer</h1>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
