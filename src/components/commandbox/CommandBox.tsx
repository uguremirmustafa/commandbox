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
  onItemClick: (item: Item) => void;
}

function CommandBox(props: IProps) {
  const { title, id, items, onItemClick } = props;

  const ref = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const items =
      listRef.current?.querySelectorAll<HTMLElement>('li[tabindex]');
    if (!items || items.length === 0) return;

    const activeIndex = Array.from(items).findIndex(
      (el) => el === document.activeElement
    );

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = items[(activeIndex + 1) % items.length];
      next.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = items[(activeIndex - 1 + items.length) % items.length];
      prev.focus();
    }
  };

  function clickItemAndClose(item: Item) {
    ref.current?.close();
    onItemClick(item);
  }

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
        />
        <ul ref={listRef} onKeyDown={handleKeyDown}>
          {filteredItems.map((x) => {
            return (
              <li
                tabIndex={0}
                key={x.id}
                onClick={() => clickItemAndClose(x)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    clickItemAndClose(x);
                  }
                }}
              >
                {x.content}
              </li>
            );
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
