import './App.css';
import CommandBox from './components/commandbox/CommandBox';

function App() {
  return (
    <>
      <CommandBox
        title="App Navigation"
        id="commandBox"
        onItemClick={(item) => {
          console.log(JSON.stringify(item, null, 2));
        }}
        items={[
          {
            id: 'test',
            content: 'Test',
          },
          {
            id: 'ugur',
            content: 'Ugur emirmustafa',
          },
          {
            id: 'item3',
            content: 'Item 3',
          },
          {
            id: 'item4',
            content: 'Item 4',
          },
          {
            id: 'item5',
            content: 'Item 5',
          },
          {
            id: 'item6',
            content: 'Item 6',
          },
          {
            id: 'item7',
            content: 'Item 7',
          },
          {
            id: 'item8',
            content: 'Item 8',
          },
          {
            id: 'item9',
            content: 'Item 9',
          },
          {
            id: 'item10',
            content: 'Item 10',
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
