import axios from 'axios';

const api = 'http://localhost:8008';

export const getInventories = async () => {
    const response = await axios.get(api);
    return response.data;
  };
  
  export const createInventory = async (inventory) => {
    await axios.post(api, inventory);
  };
  
  export const editInventory = async (inventory) => {
    await axios.put(api + `/${inventory.id_inventario}`, inventory);
  };
  
  export const deleteInventory = async (id_inventario) => {
    await axios.delete(api + `/${id_inventario}`);
  };
  
  export const getInventoryDetail = async (id_inventario) => {
    const response = await axios.get(api + `/${id_inventario}`);
    return response.data;
  };