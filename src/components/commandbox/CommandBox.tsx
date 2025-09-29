import { useMemo, useRef, useState, type ReactNode } from 'react';
import './CommandBox.css';

type Item = {
  id: string;
  content: ReactNode;
};

interface IProps {
  id: string;
  title: string;
  items: Item[];
}

function CommandBox(props: IProps) {
  const { title, id, items } = props;

  const ref = useRef<HTMLDialogElement>(null);

  const [search, setSearch] = useState('');

  const filteredItems = useMemo(
    () =>
      search
        ? items.filter((x) =>
            x.content
              ?.toString()
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase())
          )
        : items,
    [search, items]
  );

  return (
    <dialog ref={ref} className="commandBox" id={id}>
      <div className="header">
        <h2 className="title">{title}</h2>
      </div>
      <div className="body">
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />
        <ul>
          {filteredItems.map((x) => {
            return <li key={x.id}>{x.content}</li>;
          })}
        </ul>
      </div>
      <div className="footer">
        <button onClick={() => ref.current?.close()}>Close</button>
      </div>
    </dialog>
  );
}

export default CommandBox;
