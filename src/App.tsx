import './App.css';
import CommandBox from './components/commandbox/CommandBox';

function App() {
  return (
    <>
      <CommandBox
        title="App Navigation"
        id="commandBox"
        items={[
          {
            id: 'test',
            content: 'Test',
          },
          {
            id: 'ugur',
            content: 'Ugur emirmustafa',
          },
        ]}
      />
      <button
        onClick={() => {
          const dialog = document.getElementById('commandBox');
          if (dialog) {
            (dialog as HTMLDialogElement).showModal();
          }
        }}
      >
        open
      </button>
    </>
  );
}

export default App;
