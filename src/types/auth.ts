export interface ValidationError {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: Array<{ validation: string; message: string }>;
    stack?: string;
  };
}
