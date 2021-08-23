import React from 'react'
//react
export type TypeSetState<T> = React.Dispatch<React.SetStateAction<T>>
export type TypeReactChild = React.ReactNode

//on submit, onclick using mouse (button)
export type TypeClickEvent = React.MouseEvent<HTMLElement, MouseEvent> | React.FormEvent<HTMLElement>
export type TypeClickEventHandler = React.MouseEventHandler<HTMLElement> | React.FormEventHandler<HTMLElement>


//on change
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type TypeOnChangeHandler = React.ChangeEventHandler<FormControlElement>
export type TypeOnChange = React.ChangeEvent<FormControlElement>//not for file



