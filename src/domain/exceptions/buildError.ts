interface ILambdaResponse {
  statusCode: number;
  body: string;
}

export function buildError(message: string, status: number): ILambdaResponse {
  return {
    statusCode: status,
    body: JSON.stringify({ message }),
  };
}
