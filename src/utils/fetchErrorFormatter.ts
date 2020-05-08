type FetchErrorDetail = {
  code?: number
  message?: string
}

export type FetchError = {
  status?: number
  statusText: string
  error?: FetchErrorDetail
}

export const formatNetworkError = (err: any): FetchError => {
  return {
    statusText: err.error,
    error: {
      code: err.code,
      message: err.message
    }
  }
}

export const formatFetchError = (
  res: Record<string, any>
): FetchError | null => {
  if (res && res?.status) {
    const { status } = res

    // when fetch success
    if (status === 200) {
      return null
    }

    // when fetch failed
    const { statusText, error } = res
    return { status, statusText, error }
  }

  // unknown error
  return {
    statusText: 'Unknown Error'
  }
}
