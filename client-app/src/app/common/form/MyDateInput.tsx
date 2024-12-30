import { useField } from "formik";
import DatePicker from "react-datepicker";
import { Form, Label} from "semantic-ui-react";

interface Props {
    placeholderText: string;
    name: string;
    showTimeSelect: boolean
    timeCaption: string
    dateFormat: string
}

export default function MyDateInput({placeholderText, name, showTimeSelect, timeCaption, dateFormat}: Props) {
    const [field, meta, helpers] = useField(name);
    return(
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                    {...field}
                    placeholderText={placeholderText}
                    name={name}
                    showTimeSelect={showTimeSelect}
                    timeCaption={timeCaption}
                    dateFormat={dateFormat}
                    selected={(field.value && new Date(field.value)) || null}
                    onChange={value => {helpers.setValue(value)}}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ): null}
        </Form.Field>
    )

}