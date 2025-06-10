import * as Reblend from 'reblendjs';

// TODO
interface FormContextType {
  controlId?: any;
}

const FormContext = Reblend.createContext<FormContextType>({});

export default FormContext;
