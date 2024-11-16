import React from 'react';
import {
  Error,
  Helper,
  InputBody,
  InputContainer,
  InputWrapper,
  Label,
} from './styled';

export const Input = ({
  type = 'text',
  min,
  value,
  onChange,
  label,
  helper,
  border,
  disabled = false,
  error = null,
  placeholder = '',
}) => (
  <InputContainer>
    <Label>{label}</Label>
    <Helper>{helper}</Helper>
    <InputWrapper isValid={!error}>
      <InputBody
        disabled={disabled}
        type={type}
        min={min}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        border={border}
      />
    </InputWrapper>
    <Error>{error}</Error>
  </InputContainer>
);
