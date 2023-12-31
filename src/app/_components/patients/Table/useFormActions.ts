import { Form } from "antd";
import { useEffect, useState } from "react";
import { Appointment } from "./Table";



export function useFormActions(appointments: Appointment[]) {
  const [form] = Form.useForm();
  const [data, setData] = useState<Appointment[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setData(appointments)
    setCount(appointments.length)
  }, [appointments])

  const [editingKey, setEditingKey] = useState('');
  const isEditingRecord = (record: Appointment) => record.key === editingKey;
  const isEditing = editingKey.length > 0
  const edit = (record: Partial<Appointment> & { key: React.Key }) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const onDelete = (key: React.Key) => {
    const newData = [...data].filter(d => d.key !== key);
    setCount(count => count - 1)
    setData(newData)
  }

  function cancelEditing() {
    setEditingKey('');
  }
  const cancelRowEditing = (record: Appointment) => {
    if (record.id === `<temp_id-${count}>`) {
      onDelete(record.key)
    }
    cancelEditing();
  };

  const handleAdd = () => {
    if (!isEditing) {
      const newData: Appointment = {
        id: `<temp_id-${count + 1}>`,
        key: (count + 1).toString(),
        date: new Date(),
        time: 1332,
        duration: 60,
        isPaid: false,
        isPresent: true,
        cost: 100
      };
      edit(newData)
      setData([newData, ...data]);
      setCount(count => count + 1);
    }
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields());

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