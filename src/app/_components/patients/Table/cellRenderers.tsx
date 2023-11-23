'use client'
import { Checkbox, DatePicker, DatePickerProps, Form, InputNumber } from "@/lib/antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useRef } from "react";
import { Item } from "./Table";


export function cellRenderer<TRecord>(render: (record: TRecord) => ReactNode) {
  return (_: unknown, record: TRecord) => render(record)
}


const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  // api action
  console.log(date, dateString);
};

type KeyOfItem = keyof Omit<Item, 'id' | 'key'>
type InputTypeTable = Record<KeyOfItem, JSX.Element>

const inputTypeTable: InputTypeTable = {
  date: <DatePicker onChange={onChange} allowClear={false} locale={locale} />,
  // TODO: change it to TimePicker
  time: <InputNumber />,
  duration: <InputNumber />,
  cost: <InputNumber />,
  isPaid: <Checkbox />,
  isPresent: <Checkbox />
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: KeyOfItem;
  title: any;
  record: Item;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {

  const ref = useRef<HTMLElement>();
  const isDate = dataIndex === 'date'
  const getValueProps = isDate ? (i: Date) => ({ value: dayjs(i) }) : undefined
  const inputNode = inputTypeTable[dataIndex]
  const element = inputNode ? React.cloneElement(inputNode, {
    ref
  }) : undefined

  useEffect(() => {
    if (ref.current) {
      const x = ref.current.className === 'ant-picker-cell-inner'
      if (x) {
        ref.current.focus();
      }
    }
  }, []);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
          getValueProps={getValueProps}
          valuePropName={dataIndex === 'isPaid' || dataIndex === 'isPresent' ? 'checked' : undefined}
        >
          {element}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
