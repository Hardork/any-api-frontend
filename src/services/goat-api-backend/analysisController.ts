// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** listTopInvokeInterface GET /api/analysis/top/interface/invoke */
export async function listTopInvokeInterfaceUsingGET(options?: { [key: string]: any }) {
  return request<API.BaseResponseListInterfaceInfoVO_>('/api/analysis/top/interface/invoke', {
    method: 'GET',
    ...(options || {}),
  });
}
