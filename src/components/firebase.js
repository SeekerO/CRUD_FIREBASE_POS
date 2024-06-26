import { database } from "../database/config";
import {
  ref,
  set,
  get,
  push,
  onChildAdded,
  onValue,
  remove,
  update,
} from "firebase/database";
import { NotifyError, NotifySuccess } from "./Notify";

// FETCHERS
export async function readData() {
  const dbRef = ref(database, "shop_item");
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function readCategory() {
  const dbRef = ref(database, "category");
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    throw error;
  }
}

export async function readDataOrders() {
  const dbRef = ref(database, "orders");
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    throw error;
  }
}
// FETCHERS END

// SETTERS
export function writeNewItem(formData, uuid, setFormData, sizePrices) {
  const dbRef = ref(database, "shop_item/" + uuid);
  set(dbRef, {
    id: uuid,
    item_name: formData.item_name,
    item_price: formData.item_price,
    item_quantity: formData.item_quantity,
    item_category: formData.item_category,
    item_sizes: sizePrices,
  })
    .then(() => {
      setFormData({
        item_name: "",
        item_price: "",
        item_quantity: "",
        item_category: "",
      });
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

export function writeDataCategory(isCatergories, uuid) {
  const dbRef = ref(database, "category/" + uuid);
  set(dbRef, {
    category: isCatergories,
  })
    .then(() => {
      const succes = "New Category Added Succesfuly!";
      NotifySuccess(succes);
    })
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}
export async function handlePaid(items) {
  try {
    for (const cartItem of items) {
      const itemRef = ref(database, `shop_item/${cartItem.id}`);
      const itemSnapshot = await get(itemRef);

      if (itemSnapshot.exists()) {
        const itemData = itemSnapshot.val();

        if (itemData.item_sizes) {
          const updatedSizes = itemData.item_sizes.map((size) => {
            if (size.size === cartItem.size) {
              const newStock = size.stock - cartItem.quantity;
              if (newStock < 0) {
                throw new Error(
                  `Not enough stock for ${itemData.item_name} size ${size.size}`
                );
              }
              return {
                ...size,
                stock: newStock,
              };
            }
            return size;
          });

          await update(itemRef, { item_sizes: updatedSizes });
        } else {
          // Handle item-level quantities
          const newQuantity = itemData.item_quantity - cartItem.quantity;
          if (newQuantity < 0) {
            throw new Error(`Not enough stock for ${itemData.item_name}`);
          }

          await update(itemRef, { item_quantity: newQuantity });
        }
      }
    }
  } catch (error) {
    console.error("Error updating stock quantities: ", error);
  }
}
// SETTERS END

// LISTENERS

export function listenForNewItems(callback) {
  const itemsRef = ref(database, "shop_item");

  onChildAdded(
    itemsRef,
    (data) => {
      callback(data.val());
    },
    (error) => {
      console.error("Failed to listen for new items:", error);
    }
  );
}

export function listenForOrdersonChildAdded(callback) {
  const itemsRef = ref(database, "orders");

  onChildAdded(
    itemsRef,
    (data) => {
      callback(data.val());
    },
    (error) => {
      console.error("Failed to listen for new items:", error);
    }
  );
}

export function listenForNewItemsCategory(callback) {
  const itemsRef = ref(database, "category");

  onChildAdded(
    itemsRef,
    (data) => {
      callback(data.val());
    },
    (error) => {
      console.error("Failed to listen for new items:", error);
    }
  );
}

export function listenForItemUpdates(callback) {
  const dbRef = ref(database, "shop_item");
  onValue(dbRef, (snapshot) => {
    const data = snapshot?.val() ? Object.values(snapshot.val()) : [];
    callback(data);
  });
}

export function listenForItemCategory(callback) {
  const dbRef = ref(database, "category");
  onValue(dbRef, (snapshot) => {
    const data = snapshot?.val() ? Object.values(snapshot.val()) : [];
    callback(data);
  });
}

export function listenForShop(callback) {
  const dbRef = ref(database, "shop");
  onValue(dbRef, (snapshot) => {
    const data = snapshot?.val() ? Object.values(snapshot.val()) : [];
    callback(data);
  });
}

export function listenForOrdersOnValue(callback) {
  const dbRef = ref(database, "orders");
  onValue(dbRef, (snapshot) => {
    const data = snapshot?.val() ? Object.values(snapshot.val()) : [];
    callback(data);
  });
}
// LISTENERS END

// UPDATE
export async function UpdateCategory_Database(new_Category) {
  const dbRef = ref(database, "category");
  const notifsuccess = "Category updated successfully";
  try {
    await set(dbRef, new_Category);
    NotifySuccess(notifsuccess);
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export async function updateItem(uuid, formData) {
  const dbRef = ref(database, "shop_item/" + uuid);
  const notifsuccess = "Item updated successfully";
  try {
    await set(dbRef, formData);
    NotifySuccess(notifsuccess);
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export async function handleOrderStore(order_list) {
  try {
    const dbRef = ref(database, "orders/" + order_list.id);
    const notifyMess = "Payment successful and stock updated.";

    set(dbRef, {
      order_id: order_list.id,
      order_items: order_list.items,
      order_total: order_list.total,
      order_date: order_list.date,
    });

    NotifySuccess(notifyMess);
    return true;
  } catch (error) {
    const notifyMessError = "Unable to Store";
    NotifyError(notifyMessError);
    return false;
  }
}

// UPDATE END

// DELETE
export async function deleteItem(itemId) {
  if (itemId === 0) return;
  else {
    const itemRef = ref(database, `shop_item/${itemId}`);
    try {
      await remove(itemRef);

      const Item_deleted = `Item ${itemId} deleted successfully`;
      NotifyError(Item_deleted);
      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
}
