import { getDatabase, ref, set, onValue, push, update, remove } from "firebase/database";

const tableName = "items";

export function addItem(content) {
  const db = getDatabase();
  const now = Date.now();
  const id = push(ref(db, tableName)).key;

  set(ref(db, `${tableName}/${id}`), {
    id: id,
    content: content,
    checked: false,
    dateCreated: now,
  });
}

export function updateItemCheck(id, checked) {
  const db = getDatabase();

  update(ref(db, `${tableName}/${id}`), {
    checked: checked,
  });
}

export function deleteItem(itemId) {
  const db = getDatabase();
  remove(ref(db, `${tableName}/${itemId}`));
}

export function streamItems(callback) {
  const db = getDatabase();

  onValue(ref(db, tableName), (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const items = Object.values(data).map((item) => ({
        id: item.id,
        content: item.content,
        checked: item.checked,
        dateCreated: item.dateCreated,
      }));

      callback(items);
    } else {
      callback([]);
    }
  });
}
