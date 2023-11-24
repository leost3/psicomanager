'use client'
import { Checkbox, DatePicker, Form, InputNumber, TimePicker } from "@/lib/antd";
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import React, { ReactNode, useEffect, useRef } from "react";
import { Appointment } from "./Table";


export function cellRenderer<TRecord>(render: (record: TRecord) => ReactNode) {
  return (_: unknown, record: TRecord) => render(record)
}

type KeyOfItem = keyof Omit<Appointment, 'id' | 'key'>
type InputTypeTable = Record<KeyOfItem, JSX.Element>

const inputTypeTable: InputTypeTable = {
  date: <DatePicker allowClear={false} locale={locale} />,
  time: <TimePicker allowClear={false} locale={locale} />,
  duration: <InputNumber min={1} />,
  cost: <InputNumber min={1} />,
  isPaid: <Checkbox />,
  isPresent: <Checkbox />
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: KeyOfItem;
  title: string;
  record: Appointment;
  index: number;
  children: React.ReactNode;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  children,
  ...restProps
}) => {

  const ref = useRef<HTMLElement>();
  const isDateTime = dataIndex === 'date' || dataIndex === 'time'
  const isBoolean = dataIndex === 'isPaid' || dataIndex === 'isPresent'

  const getValueProps = isDateTime ? (i: number) => ({ value: dayjs(i) }) : undefined
  const valuePropName = isBoolean ? 'checked' : undefined
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
          getValueProps={getValueProps}
          valuePropName={valuePropName}
        >
          {element}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
