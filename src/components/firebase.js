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
    .then(() => {})
    .catch((error) => {
      console.error("Error writing data:", error);
    });
}

export async function updateItem(uuid, formData) {
  const dbRef = ref(database, "shop_item/" + uuid);
  try {
    await set(dbRef, formData);
    alert("Item updated successfully");
  } catch (error) {
    console.error("Error updating item:", error);
  }
}

export function listenForItemUpdates(callback) {
  const dbRef = ref(database, "shop_item");
  onValue(dbRef, (snapshot) => {
    const data = snapshot?.val() ? Object.values(snapshot.val()) : [];
    callback(data);
  });
}

export async function deleteItem(itemId) {
  if (itemId === 0) return;
  else {
    const itemRef = ref(database, `shop_item/${itemId}`);
    try {
      await remove(itemRef);
      alert(`Item ${itemId} deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting item:", error);
      throw error;
    }
  }
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

    console.log("Stock quantities updated successfully.");
  } catch (error) {
    console.error("Error updating stock quantities: ", error);
  }
}

export async function handleOrderStore(order_list) {
  const dbRef = ref(database, "orders/" + order_list.id);
  set(dbRef, {
    order_id: order_list.id,
    order_items: order_list.items,
    order_total: order_list.total,
    order_date: order_list.date,
  });
}
