import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import {SortOrder} from "antd/lib/table/interface";
import {
  addInterfaceInfoUsingPOST,
  deleteInterfaceInfoUsingPOST,
  listInterfaceInfoByPageUsingGET,
  offlineInterfaceInfoUsingPOST,
  onlineInterfaceInfoUsingPOST,
  updateInterfaceInfoUsingPOST
} from "@/services/goat-api-backend/interfaceInfoController";
import CreateModal from "@/pages/Admin/InterfaceInfo/components/CreateModal";
import UpdateModal from "@/pages/Admin/InterfaceInfo/components/UpdateModal";







/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
  const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);


  /**
   * @en-US Add node
   * @zh-CN 添加节点
   * @param fields
   */
  const handleAdd = async (fields: API.InterfaceInfo) => {
    const hide = message.loading('正在添加');
    try {
      await addInterfaceInfoUsingPOST({ ...fields });
      hide();
      message.success('创建成功');
      handleModalOpen(false)
      return true;
    } catch (error) {
      hide();
      // @ts-ignore
      message.error('创建失败. ' + error.message);
      return false;
    }
  };

  /**
   * @en-US Update node
   * @zh-CN 更新节点
   *
   * @param fields
   */
  const handleUpdate = async (fields: API.InterfaceInfoUpdateRequest) => {
    if (!currentRow) {
      return;
    }
    const hide = message.loading('修改中');
    try {
      await updateInterfaceInfoUsingPOST({
        ...fields,
        id: currentRow?.id
      });
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      // @ts-ignore
      message.error('操作失败.' + error.message);
      return false;
    }
  };

  /**
   * @en-US delete node
   * @zh-CN 删除节点
   *
   * @param fields
   */
  const handleRemove = async (record: API.InterfaceInfo) => {
    const hide = message.loading('正在删除');
    if (!record) return true;
    try {
      await deleteInterfaceInfoUsingPOST({
        id: record?.id
      });
      hide();
      message.success('删除成功');
      actionRef.current?.reload()
      return true;
    } catch (error) {
      hide();
      // @ts-ignore
      message.error('删除失败.' + error.message);
      return false;
    }
  };

  /**
   * @en-US delete node
   * @zh-CN 发布
   * @param fields
   */
  const handleOnline = async (record: API.IdRequest) => {
    const hide = message.loading('发布中');
    if (!record) return true;
    try {
      await onlineInterfaceInfoUsingPOST({
        id: record?.id
      });
      hide();
      message.success('发布成功');
      actionRef.current?.reload()
      return true;
    } catch (error) {
      hide();
      // @ts-ignore
      message.error('发布失败.' + error.message);
      return false;
    }
  };

  /**
   * @en-US delete node
   * @zh-CN 下线
   * @param fields
   */
  const handleOffline = async (record: API.IdRequest) => {
    const hide = message.loading('下线中');
    if (!record) return true;
    try {
      await offlineInterfaceInfoUsingPOST({
        id: record?.id
      });
      hide();
      message.success('下线成功');
      actionRef.current?.reload()
      return true;
    } catch (error) {
      hide();
      // @ts-ignore
      message.error('下线失败.' + error.message);
      return false;
    }
  };

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */

  const columns: ProColumns<API.InterfaceInfo>[] = [
    {
      title: '接口名称',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [{
          required: true,
          message: '接口名称不得为空'
        }]
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      valueType: 'textarea',
      formItemProps: {
        rules: [{
          required: true,
          message: '描述不得为空'
        }]
      }
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      // valueType: 'text',
      valueEnum: { 'GET': 'GET' , 'POST' : 'POST'},
      formItemProps: {
        rules: [{
          required: true,
          message: '请求方法不得为空'
        }]
      }
    },
    {
      title: '请求路径',
      dataIndex: 'url',
      valueType: 'text',
      tooltip: '例: http://locahost:8123/api/common',
      formItemProps: {
        rules: [{
          required: true,
          message: '请求路径不得为空'
        }]
      }
    },
    {
      title: '请求Url',
      dataIndex: 'path',
      hideInTable: true,
      tooltip: '例: /api/common',
      formItemProps: {
        rules: [{
          required: true,
          message: '请求Url不得为空'
        }]
      }
    },
    {
      title: '请求参数',
      dataIndex: 'requestParams',
      valueType: 'jsonCode',
      tooltip: '例: {\nnum: number, \nname: string \n}',
    },
    {
      title: '请求头',
      valueEnum: { 'application/json': 'application/json',  'application/x-www-form-urlencoded': 'application/x-www-form-urlencoded', 'multipart/form-data': 'multipart/form-data'},
      dataIndex: 'requestHeader',
      // valueType: 'jsonCode',
    },
    {
      title: '响应头',
      valueEnum: { 'application/json': 'application/json',  'application/x-www-form-urlencoded': 'application/x-www-form-urlencoded', 'multipart/form-data': 'multipart/form-data'},
      dataIndex: 'responseHeader',
      // valueType: 'jsonCode',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="操作" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="update"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        record.status === 0 ?
          <a
            key="up"
            onClick={() => {
              handleOnline(record);
            }}
          >
            发布
          </a> : null,
        record.status === 1 ?
        <Button
          key="down"
          type={"text"}
          danger
          onClick={() => {
            handleOffline(record);
          }}
        >
          下线
        </Button> : null,
        <Button
          key={"delete"}
          type={"text"}
          danger
          onClick={() => {
            handleRemove(record);
          }}
        >
          删除
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle='Interface'
        actionRef={actionRef}
        rowKey={record => {
          return record?.id
        }}
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> {'新建'}
          </Button>,
        ]}
        request={async (params , sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
          const res: any = await listInterfaceInfoByPageUsingGET({
            ...params
          })
          console.log(res)
          if (res?.data) {
            return {
              data: res.data.records || [],
              success: true,
              total: res.data?.total || 0
            }
          } else {
            return {
              data: [],
              success: false,
              total: 0
            }
          }
        }
        }
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      <CreateModal columns={columns} onCancel={() => {handleModalOpen(false)}} onSubmit={ (values) => { handleAdd(values)} } visible={createModalOpen}>

      </CreateModal>
      <UpdateModal
        columns={columns}
        onCancel={() => {
          handleUpdateModalOpen(false)
          if (!showDetail) {
            setCurrentRow(undefined)
          }
        }}
        onSubmit={ async (values) => {
          console.log(values)
          const res = await handleUpdate(values)
          if (res) {
            // 关闭模态框
            handleUpdateModalOpen(false)
            setCurrentRow(undefined)
            if (actionRef.current) {
              actionRef.current?.reload()
            }
          }
        }
       }
        visible={updateModalOpen} values={currentRow || {}}
      />
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
