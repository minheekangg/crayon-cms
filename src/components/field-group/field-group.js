import React from 'react';
import PropTypes from 'prop-types';

import { Form, Label } from 'semantic-ui-react';

import FieldSingle from 'components/field-single';
import FieldMulti from 'components/field-multi';

export default class FieldGroup extends React.PureComponent {
    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        helpText: PropTypes.string,
        validationErrors: PropTypes.array,
        actions: PropTypes.shape({
            showMediaPicker: PropTypes.func.isRequired
        }).isRequired
    };

    getField() {
        const { many, type, name, actions: { showMediaPicker } } = this.props;
        const fieldProps = {...this.props};

        if (type === 'photo') {
            fieldProps.showMediaPicker = () => {
                showMediaPicker(name);
            };
        }

        return many ? <FieldMulti {...fieldProps} /> : <FieldSingle {...fieldProps} />;
    }

    render() {
        const { label, type, helpText: help, validationErrors } = this.props;

        let field = this.getField();

        if (type === 'checkbox') {
            return field;
        }

        let errorText = '';
        if (validationErrors.length) {
            const errorTextP = validationErrors.map((e, i) => <p key={`errormsg-${e.itemName}-${i}`}>{e.msg}</p>);

            errorText = <Label basic pointing color="red">{errorTextP}</Label>;
        }

        const helpText = help ? <p><small><em>{help}</em></small></p> : null;

        return (
            <Form.Field error={validationErrors.length > 0}>
                <label>{label}</label>
                {field}
                {helpText}
                {errorText}
            </Form.Field>
        );
    }
}