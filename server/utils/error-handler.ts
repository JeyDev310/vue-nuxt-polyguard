import util from 'util'
import { consola } from 'consola'
import { ClientError } from 'graphql-request'
import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export function logError(functionName: string, error: unknown): void {
  if (error instanceof ClientError) {
    handleGraphqlRequestError(functionName, error)
  } else if (error instanceof AxiosError) {
    handleAxiosError(functionName, error)
  } else if (error instanceof ZodError) {
    handleZodError(functionName, error)
  } else if (error instanceof Error) {
    handleError(functionName, error)
  } else {
    handleUnknown(functionName, error)
  }
}

function handleAxiosError(functionName: string, error: AxiosError): void {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    consola.log(`${functionName}`, error.response.data)
    consola.log(`${functionName}`, error.response.status)
    consola.log(`${functionName}`, error.response.headers)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    consola.log(`${functionName}`, error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    consola.log(`${functionName}`, 'Error', error.message)
  }
  consola.log(`${functionName}`, error.config)
}

function handleGraphqlRequestError(
  functionName: string,
  error: ClientError,
): void {
  // format the error message so that it's easier to read
  const errors = error?.response?.errors
  if (import.meta.server) {
    consola.error(`${functionName}`, util.inspect(errors, false, null, true))
  } else {
    console.error(`${functionName}`, errors)
  }
}

function handleZodError(functionName: string, error: ZodError): void {
  const { errors } = error
  if (import.meta.server) {
    consola.error(`${functionName}`, util.inspect(errors, false, null, true))
  } else {
    console.error(`${functionName}`, errors)
  }
}

function handleError(functionName: string, error: Error): void {
  if (import.meta.server) {
    consola.error(`${functionName}`, util.inspect(error, false, null, true))
  } else {
    console.error(`${functionName}`, error)
  }
}

function handleUnknown(functionName: string, error: unknown): void {
  if (import.meta.server) {
    consola.error(`${functionName}`, util.inspect(error, false, null, true))
  } else {
    console.error(`${functionName}`, error)
  }
}
