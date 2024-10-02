import logo from './logo.svg';
import './App.css';
import TaskBoard from './Components/TaskBoard';
import DisplayDropdown from './Components/DropDownDisplay';
import { OrderProvider } from './ContextProviderStates/OrderingContext';
import { GroupProvider } from './ContextProviderStates/GroupContext';
function App() {
  return (

    <OrderProvider >
      <GroupProvider>
        <div className="App">
          <DisplayDropdown />
          <TaskBoard />
        </div>
      </ GroupProvider >
    </ OrderProvider >
  );
}

export default App;
