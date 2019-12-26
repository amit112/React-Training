import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
    state = {
        data: { username: '', password: '' },
        errors: {}
    }
    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data };
        const errors = { ...this.state.errors };
        data[input.name] = input.value;
        const error = this.validateInput(input);
        if (error) {
            errors[input.name] = error;
        }
        else {
            delete errors[input.name];
        }

        this.setState({ data, errors });
    }
    validateInput = ({ name, value }) => {
        const data = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const validationResult = Joi.validate(data, schema);
        return validationResult.error ? validationResult.error.details[0].message : null;
    }
    validate = () => {
        const data = this.state.data;
        let errors = {};
        const validationResult = Joi.validate(data, this.schema, { abortEarly: false });
        errors = validationResult.error ? validationResult.error.details.map(r => ({ [r.path[0]]: r.message })).reduce((a, b) => Object.assign(a, b), {}) : {};
        return Object.keys(errors).length > 0 ? errors : null;

    }
    handleSubmit = e => {
        e.preventDefault();
        const errors = this.validate();
        if (errors) return;
        this.setState({ errors: errors || {} });
        this.doSubmit();
    }

    renderButton = (label) => {
        return <button type="submit" className="btn btn-primary"  disabled={this.validate()}>{label}</button>
    }
    renderInput = (name, label, type = 'text') => {
        const { data, errors } = this.state;
        return <Input name={name} label={label} type={type} value={data[name]} error={errors[name]} onChange={this.handleChange}></Input>

    }
    renderSelect = (name, label, options) => {
        const { data, errors  } = this.state;
     
    return (
        <Select
          name={name}
          value={data[name]}
          label={label}
          options={options}
          onChange={this.handleChange}
          error={errors[name]}
        ></Select>
      );
    }
}

export default Form;