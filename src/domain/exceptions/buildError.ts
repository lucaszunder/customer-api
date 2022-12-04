interface ILambdaResponse {
  statusCode: number;
  body: string;
}

export function buildError(stack: string | Error, status: number): ILambdaResponse {
  return {
    statusCode: status,
    body: JSON.stringify(stack),
  };
}
