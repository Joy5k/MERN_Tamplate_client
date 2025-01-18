import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

export type TFromConfig = {
  defaultValues?: Record<string, any>
  resolver?:any
}

type TForProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
}& TFromConfig;

const PHForm = ({ onSubmit, children, defaultValues,resolver }: TForProps) => {
  const formConfig: TFromConfig = {}
  
    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues
  }
  if (resolver) {
    formConfig["resolver"] = resolver
  }
  
  const methods = useForm(formConfig);
  const submit:SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    methods.reset()
  }
  return (
    <FormProvider  {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}> {children} </Form>
    </FormProvider>
  );
};

export default PHForm;
