import { GuestbookEntry } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Delete, Disable, Enable } from './icons';

const GuestbookEntry = (props: { entry: GuestbookEntry; reload: () => void }) => {
  const [published, setPublished] = useState<boolean>(props.entry.published);
  const { entry, reload } = props;

  const togglePublished = async () => {
    setPublished(!published);
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({ ...entry, published: !published })
    };

    await fetch('api/guestbook-admin', requestOptions);
  };

  const deleteEntry = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: JSON.stringify({ entry })
    };

    fetch('api/guestbook-admin', requestOptions).then(() => reload());
  };

  const createdAt = new Date(entry.createdAt).toLocaleDateString('de-CH', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  return (
    <>
      <div className={`w-full text-white rounded-t-md flex px-4 py-2 ${published ? 'bg-pgl-blue' : 'bg-slate-600'}`}>
        <span>
          <b>{entry.name}</b> ({entry.email}) schrieb am {createdAt}
        </span>
        <div className="flex-grow"></div>
        {published ? (
          <button className="flex duration-300 hover:scale-110" onClick={togglePublished}>
            <Disable /> Sperren
          </button>
        ) : (
          <button className="flex duration-300 hover:scale-110" onClick={togglePublished}>
            <Enable /> Ver&ouml;ffentlichen
          </button>
        )}
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: entry.message.replace('\n', '<br />') }}
        className="w-full bg-slate-100 px-4 py-2 mb-6"
      ></div>
    </>
  );
};

export const Guestbook = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);

  async function getEntries() {
    const response = await fetch('api/guestbook-admin');
    const guestbookEntries = await response.json();
    setEntries(guestbookEntries);
  }

  useEffect(() => {
    getEntries();
  }, []);

  return (
    <div className="container">
      <article>
        <h1>G&auml;stebuch</h1>
        {entries.map((e: any) => (
          <GuestbookEntry entry={e} key={e.id} reload={getEntries} />
        ))}
      </article>
    </div>
  );
};
