import unfetch from 'isomorphic-unfetch'
import { stringify } from 'query-string'
import {
  FetchError,
  formatNetworkError,
  formatFetchError
} from '~/utils/fetchErrorFormatter'

type QueryParams = Record<string, any>

type FetchOptions = RequestInit & {
  params?: QueryParams
}

type FetchRequest = {
  queryParams: Record<string, any> | null
  requestOptions?: RequestInit
}

type FetchResponse = {
  data: Record<string, any> | null
  err: FetchError | null
}

const createFetchRequestData = (options?: FetchOptions): FetchRequest => {
  if (!options) {
    return {
      queryParams: null,
      requestOptions: options
    }
  }

  const { method, params } = options

  if ('params' in options) {
    delete options.params
  }

  const queryParams: QueryParams | null = params || null

  const requestOptions: RequestInit =
    !method ?? method === 'get'
      ? options
      : { ...options, body: JSON.stringify(params) }

  return { queryParams, requestOptions }
}

const createFetchUrl = (
  endPoint: string,
  params: Record<string, any>
): string => {
  const query = stringify(params)
  return `${endPoint}?${query}`
}

export const fetch = async (
  endPoint: string,
  options?: FetchOptions
): Promise<FetchResponse> => {
  const { queryParams, requestOptions } = createFetchRequestData(options)
  const url = queryParams ? createFetchUrl(endPoint, queryParams) : endPoint

  const { res, err } = await unfetch(url, requestOptions)
    .then((res: any) => {
      return { res, err: formatFetchError(res) }
    })
    .catch((err: any) => {
      return { res: null, err: formatNetworkError(err) }
    })

  if (err) {
    return { data: null, err }
  }

  const data = await res.json()

  return { data, err: null }
}

export const fetchApi = (
  endPoint: string,
  options?: FetchOptions
): Promise<FetchResponse> => {
  return fetch(process.env.API_BASE_URL + endPoint, options)
}
