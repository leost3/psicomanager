import { Form } from "antd";
import { useState } from "react";
import { ID } from "~/types";

interface Item {
  id: ID;
  key: string;
  name: string;
  age: number;
  address: string;
}
const originData: Item[] = [];
for (let i = 0; i < 11; i++) {
  originData.push({
    id: i.toString(),
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

export function useFormActions() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const [count, setCount] = useState(data.length);

  const isEditingRecord = (record: Item) => record.key === editingKey;
  const isEditing = editingKey.length > 0
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record });
    setEditingKey(record.key);
  };

  const onDelete = (key: React.Key) => {
    const newData = [...data].filter(d => d.key !== key);
    setData(newData)
  }

  function cancelEditing() {
    setEditingKey('');
  }

  const cancelRowEditing = (record: Item) => {
    if (record.id === '<temp_id>') {
      onDelete(record.key)
    }
    cancelEditing();
  };


  const handleAdd = () => {
    const newData: Item = {
      id: '<temp_id>',
      key: count.toString(),
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    edit(newData)
    setData([newData, ...data]);
    setCount(count => count + 1);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  return {
    save,
    handleAdd,
    cancelRowEditing,
    onDelete,
    form,
    isEditingRecord,
    editingKey,
    data,
    edit,
    isEditing,
    cancelEditing
  }
}