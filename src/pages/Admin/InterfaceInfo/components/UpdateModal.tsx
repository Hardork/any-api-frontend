import {
  ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, {useEffect, useRef} from 'react';


export type Props = {
  columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (values: API.InterfaceInfo) => Promise<void>;
  visible: boolean,
  values: API.InterfaceInfo
};

const UpdateModal: React.FC<Props> = (props) => {
  const { columns ,visible, onCancel, onSubmit, values} = props;

  const formRef = useRef<any>()

  // 监听values
  useEffect(() => {
    if (formRef) {
      formRef.current?.setFieldsValue(values)
    }
  }, [values])

  return <Modal open={visible} onCancel={() => {onCancel?.()}} footer={null}>
    <ProTable type="form" columns={columns}  formRef={formRef} onSubmit={async (value) => {
      onSubmit?.(value)
    }}
    />
  </Modal>

};

export default UpdateModal;
